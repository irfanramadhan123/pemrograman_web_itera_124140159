// js/app.js
// Logika aplikasi: model TaskItem + orkestrasi DashboardApp.
// Tanggung jawab file ini: state, CRUD, pencarian/filter, statistik, rendering, events.

import {
  STORAGE_KEY,
  localSeedTasks,
  loadTasks,
  saveTasks,
  clearTasks,
  fetchSeedTasks,
} from "./modules/data.js";
import {
  createId,
  escapeHTML,
  formatTanggal,
  isOverdue,
} from "./modules/utils.js";

// Konfigurasi terpusat (contoh object literal untuk konfigurasi).
const CONFIG = {
  storageKey: STORAGE_KEY,
  requiredMessage: "wajib diisi",
  confirmDelete: "Hapus tugas ini? Tindakan tidak bisa dibatalkan.",
};

// ============================================================================
// Class TaskItem — merepresentasikan & memvalidasi satu tugas.
// ============================================================================
export class TaskItem {
  constructor({ id, title, course, desc = "", deadline, completed = false, createdAt, updatedAt } = {}) {
    this.id = id ?? createId();
    this.title = String(title ?? "").trim();
    this.course = String(course ?? "").trim();
    this.desc = String(desc ?? "").trim();
    this.deadline = String(deadline ?? "");
    this.completed = Boolean(completed);
    const now = new Date().toISOString();
    this.createdAt = createdAt ?? now;
    this.updatedAt = updatedAt ?? now;
  }

  // Validasi kolom wajib: nama, matkul, tenggat. Return { valid, errors }.
  static validate({ title = "", course = "", deadline = "" } = {}) {
    const errors = {};
    if (!String(title).trim()) errors.title = `Nama tugas ${CONFIG.requiredMessage}.`;
    if (!String(course).trim()) errors.course = `Mata kuliah ${CONFIG.requiredMessage}.`;
    if (!String(deadline).trim()) {
      errors.deadline = `Tenggat waktu ${CONFIG.requiredMessage}.`;
    } else if (Number.isNaN(new Date(`${deadline}T00:00:00`).getTime())) {
      errors.deadline = "Format tenggat tidak valid.";
    }
    return { valid: Object.keys(errors).length === 0, errors };
  }

  // Buat salinan ter-update secara immutable (spread) + refresh updatedAt.
  withUpdates(patch = {}) {
    return new TaskItem({ ...this, ...patch, id: this.id, updatedAt: new Date().toISOString() });
  }

  get overdue() {
    return isOverdue(this.deadline, this.completed);
  }
}

// ============================================================================
// Class DashboardApp — state, localStorage, fetch async, render, events.
// ============================================================================
export class DashboardApp {
  constructor() {
    this.tasks = [];
    this.search = "";
    this.statusFilter = "all"; // all | active | done
    this.deadlineFilter = "all"; // all | overdue | upcoming
    this.editingId = null;

    // Cache elemen DOM (const karena referensinya tidak di-assign ulang).
    this.els = {
      statTotal: document.getElementById("statTotal"),
      statActive: document.getElementById("statActive"),
      statDone: document.getElementById("statDone"),
      statOverdue: document.getElementById("statOverdue"),
      searchInput: document.getElementById("searchInput"),
      statusFilter: document.getElementById("statusFilter"),
      deadlineFilter: document.getElementById("deadlineFilter"),
      resultInfo: document.getElementById("resultInfo"),
      form: document.getElementById("taskForm"),
      formTitle: document.getElementById("formTitle"),
      taskId: document.getElementById("taskId"),
      taskTitle: document.getElementById("taskTitle"),
      taskCourse: document.getElementById("taskCourse"),
      taskDeadline: document.getElementById("taskDeadline"),
      taskDesc: document.getElementById("taskDesc"),
      formMessage: document.getElementById("formMessage"),
      submitBtn: document.getElementById("submitBtn"),
      cancelEditBtn: document.getElementById("cancelEditBtn"),
      resetDataBtn: document.getElementById("resetDataBtn"),
      taskList: document.getElementById("taskList"),
      emptyState: document.getElementById("emptyState"),
    };
  }

  // Entry: pasang listener sekali, lalu inisialisasi data async.
  async init() {
    this.bindEvents();
    await this.bootstrap();
  }

  // Listener dipasang SATU kali di sini (tidak di dalam render / anti duplikasi).
  bindEvents() {
    const { searchInput, statusFilter, deadlineFilter, form, cancelEditBtn, resetDataBtn, taskList } = this.els;

    searchInput.addEventListener("input", (e) => {
      this.search = e.target.value;
      this.render();
    });
    statusFilter.addEventListener("change", (e) => {
      this.statusFilter = e.target.value;
      this.render();
    });
    deadlineFilter.addEventListener("change", (e) => {
      this.deadlineFilter = e.target.value;
      this.render();
    });
    form.addEventListener("submit", (e) => this.handleSubmit(e));
    cancelEditBtn.addEventListener("click", () => this.cancelEdit());
    resetDataBtn.addEventListener("click", () => this.resetToSeed());

    // Event delegation: satu listener untuk semua tombol di daftar.
    taskList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const { action, id } = btn.dataset;
      if (action === "toggle") this.toggleTask(id);
      else if (action === "edit") this.startEdit(id);
      else if (action === "delete") this.deleteTask(id);
    });
  }

  // Alur async: localStorage dulu / fetch API (hanya jika kosong) / fallback seed lokal.
  async bootstrap() {
    const stored = loadTasks();

    if (stored) {
      this.tasks = stored.map((t) => new TaskItem(t));
      this.render();
      return;
    }

    let seed; // let: di-assign ulang sesuai hasil try/catch (sumber data berbeda)
    try {
      seed = await fetchSeedTasks();
    } catch {
      seed = localSeedTasks;
    }
    this.tasks = seed.map((t) => new TaskItem(t));
    saveTasks(this.tasks);
    this.render();
  }

  // Persistensi: setiap mutasi / saveTasks + render (UI & storage selalu konsisten).
  persist() {
    saveTasks(this.tasks);
    this.render();
  }

  // ---- CRUD ----
  handleSubmit(e) {
    e.preventDefault();
    const draft = {
      title: this.els.taskTitle.value,
      course: this.els.taskCourse.value,
      deadline: this.els.taskDeadline.value,
      desc: this.els.taskDesc.value,
    };
    const { valid, errors } = TaskItem.validate(draft);
    this.showErrors(errors);
    if (!valid) {
      this.showMessage("Lengkapi kolom wajib yang ditandai.", "bad");
      return;
    }

    if (this.editingId) {
      const target = this.tasks.find((t) => t.id === this.editingId);
      if (!target) return;
      const updated = target.withUpdates(draft); // spread immutable di dalam withUpdates
      this.tasks = this.tasks.map((t) => (t.id === updated.id ? updated : t));
      this.showMessage(`Tugas "${updated.title}" berhasil diperbarui.`, "ok");
    } else {
      const created = new TaskItem(draft);
      this.tasks = [...this.tasks, created]; // spread: array baru, state lama tak dimutasi
      this.showMessage(`Tugas "${created.title}" berhasil ditambahkan.`, "ok");
    }
    this.resetForm();
    this.persist(); // pesan sukses hanya muncul setelah operasi di atas berhasil
  }

  startEdit(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;
    const { id: tid, title, course, deadline, desc } = task; // destructuring
    this.editingId = tid;
    this.els.taskId.value = tid;
    this.els.taskTitle.value = title;
    this.els.taskCourse.value = course;
    this.els.taskDeadline.value = deadline;
    this.els.taskDesc.value = desc;
    this.els.formTitle.textContent = "Edit Tugas";
    this.els.submitBtn.textContent = "Simpan perubahan";
    this.els.cancelEditBtn.hidden = false;
    this.els.taskTitle.focus();
  }

  cancelEdit() {
    this.resetForm();
    this.showMessage("Edit dibatalkan.", "ok");
  }

  deleteTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;
    if (!window.confirm(`${CONFIG.confirmDelete}\n\n"${task.title}" (${task.course})`)) return;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    if (this.editingId === id) this.resetForm();
    this.showMessage(`Tugas "${task.title}" dihapus.`, "ok");
    this.persist();
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((t) =>
      t.id === id ? t.withUpdates({ completed: !t.completed }) : t
    );
    this.persist();
  }

  resetToSeed() {
    if (!window.confirm("Kembalikan ke data contoh awal? Data saat ini akan diganti.")) return;
    clearTasks();
    this.tasks = localSeedTasks.map((t) => new TaskItem({ ...t, id: createId() }));
    saveTasks(this.tasks);
    this.resetForm();
    this.showMessage("Data dikembalikan ke contoh awal.", "ok");
    this.render();
  }

  // ---- Search & filter (filter + pencarian benar-benar bekerja) ----
  getVisibleTasks() {
    const q = this.search.trim().toLowerCase();
    return this.tasks
      .filter((t) => {
        if (this.statusFilter === "active" && t.completed) return false;
        if (this.statusFilter === "done" && !t.completed) return false;
        return true;
      })
      .filter((t) => {
        if (this.deadlineFilter === "overdue" && !t.overdue) return false;
        if (this.deadlineFilter === "upcoming" && t.overdue) return false;
        return true;
      })
      .filter((t) => {
        if (!q) return true;
        return t.title.toLowerCase().includes(q) || t.course.toLowerCase().includes(q);
      })
      .sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
  }

  // Statistik dihitung dari data nyata via reduce (bukan angka statis).
  calcStats() {
    return this.tasks.reduce(
      (acc, t) => {
        acc.total += 1;
        if (t.completed) acc.done += 1;
        else acc.active += 1;
        if (t.overdue) acc.overdue += 1;
        return acc;
      },
      { total: 0, active: 0, done: 0, overdue: 0 }
    );
  }

  // ---- Render ----
  render() {
    const visible = this.getVisibleTasks();
    const stats = this.calcStats();

    this.els.statTotal.textContent = String(stats.total);
    this.els.statActive.textContent = String(stats.active);
    this.els.statDone.textContent = String(stats.done);
    this.els.statOverdue.textContent = String(stats.overdue);

    this.els.resultInfo.textContent =
      `Menampilkan ${visible.length} dari ${this.tasks.length} tugas.`;

    this.els.emptyState.hidden = visible.length > 0;
    this.els.taskList.innerHTML = visible.map((t) => this.taskCardHTML(t)).join("");
  }

  // Template literals untuk rendering dinamis (dengan escapeHTML agar aman).
  // Tugas terlambat ditandai teks polos (bukan badge) di baris meta.
  taskCardHTML(task) {
    const { id, title, course, desc, deadline, completed, overdue } = task; // destructuring (termasuk getter overdue)
    return `
      <li class="task-card${completed ? " done" : ""}">
        <div class="task-top">
          <h3 class="task-title">${escapeHTML(title)}</h3>
        </div>
        <p class="task-meta">${escapeHTML(course)} &middot; Tenggat ${escapeHTML(formatTanggal(deadline))}${overdue ? ` &middot; <span class="overdue-text">Terlambat</span>` : ""}</p>
        ${desc ? `<p class="task-desc">${escapeHTML(desc)}</p>` : ""}
        <div class="task-actions">
          <button type="button" class="btn" data-action="toggle" data-id="${escapeHTML(id)}">
            ${completed ? "Tandai belum selesai" : "Tandai selesai"}
          </button>
          <button type="button" class="btn" data-action="edit" data-id="${escapeHTML(id)}">Edit</button>
          <button type="button" class="btn btn-danger" data-action="delete" data-id="${escapeHTML(id)}">Hapus</button>
        </div>
      </li>`;
  }

  showErrors(errors = {}) {
    const map = { title: "errTitle", course: "errCourse", deadline: "errDeadline" };
    Object.entries(map).forEach(([key, elId]) => {
      const el = document.getElementById(elId);
      if (!el) return;
      if (errors[key]) {
        el.textContent = errors[key];
        el.hidden = false;
      } else {
        el.textContent = "";
        el.hidden = true;
      }
    });
  }

  showMessage(text, kind = "ok") {
    const el = this.els.formMessage;
    el.textContent = text;
    el.hidden = false;
    el.classList.toggle("ok", kind === "ok");
    el.classList.toggle("bad", kind !== "ok");
  }

  resetForm() {
    this.els.form.reset();
    this.els.taskId.value = "";
    this.editingId = null;
    this.els.formTitle.textContent = "Tambah Tugas";
    this.els.submitBtn.textContent = "Simpan tugas";
    this.els.cancelEditBtn.hidden = true;
    this.showErrors({});
  }
}
