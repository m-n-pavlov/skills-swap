import { useState, useCallback, useMemo } from 'react';

/**
 * Универсальный хук для пагинации любого массива
 * @param items - массив любых элементов
 * @param pageSize - количество элементов на страницу (по умолчанию 20)
 */
export function useInfiniteItems<T>(items: T[], pageSize: number = 20) {
  const [page, setPage] = useState(1);

  // функция для загрузки следующей "порции" элементов
  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // текущая порция элементов
  const currentItems = useMemo(() => {
    return items.slice(0, page * pageSize);
  }, [items, page, pageSize]);

  return { currentItems, loadMore };
}
