import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';
import useBookStats from './useBookStats';

describe('Custom hooks', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('useLocalStorage menyimpan nilai ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', []));
    act(() => {
      result.current[1](['buku']);
    });
    expect(JSON.parse(window.localStorage.getItem('test_key'))).toEqual(['buku']);
  });

  test('useLocalStorage membaca data yang sudah tersimpan', () => {
    window.localStorage.setItem('test_key', JSON.stringify([1, 2]));
    const { result } = renderHook(() => useLocalStorage('test_key', []));
    expect(result.current[0]).toEqual([1, 2]);
  });

  test('useBookStats menghitung jumlah per status', () => {
    const books = [
      { id: '1', title: 'A', author: 'X', status: 'milik' },
      { id: '2', title: 'B', author: 'X', status: 'baca' },
      { id: '3', title: 'C', author: 'Y', status: 'milik' },
    ];
    const { result } = renderHook(() => useBookStats(books));
    expect(result.current.total).toBe(3);
    expect(result.current.byStatus).toEqual({ milik: 2, baca: 1, beli: 0 });
    expect(result.current.percent('milik')).toBe(67);
    expect(result.current.topAuthor).toBe('X');
  });
});
