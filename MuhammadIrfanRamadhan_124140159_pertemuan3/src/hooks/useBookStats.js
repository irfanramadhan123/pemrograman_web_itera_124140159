import { useMemo } from 'react';

export const STATUS_LABELS = {
  milik: 'Dimiliki',
  baca: 'Sedang Dibaca',
  beli: 'Ingin Dibeli',
};

// Custom hook: menghitung statistik dari daftar buku
function useBookStats(books) {
  return useMemo(() => {
    const byStatus = { milik: 0, baca: 0, beli: 0 };
    const authorCount = {};

    books.forEach((book) => {
      if (byStatus[book.status] !== undefined) byStatus[book.status] += 1;
      authorCount[book.author] = (authorCount[book.author] || 0) + 1;
    });

    // Penulis dengan jumlah buku terbanyak
    const topAuthor = Object.entries(authorCount).sort((a, b) => b[1] - a[1])[0];

    return {
      total: books.length,
      byStatus,
      topAuthor: topAuthor ? topAuthor[0] : '-',
      percent: (status) =>
        books.length > 0 ? Math.round((byStatus[status] / books.length) * 100) : 0,
    };
  }, [books]);
}

export default useBookStats;
