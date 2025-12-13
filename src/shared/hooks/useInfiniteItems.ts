import { useState, useCallback, useMemo, useEffect } from 'react';

/**
 * Универсальный хук для пагинации любого массива
 * @param items - массив любых элементов
 * @param pageSize - количество элементов на страницу (по умолчанию 20)
 */
export function useInfiniteItems<T>(items: T[], pageSize = 20) {
  const [page, setPage] = useState(1);

  const hasMore = page * pageSize < items.length; // чтобы не грузить бесконечно

  // функция для загрузки следующей "порции" элементов
  const loadMore = useCallback(() => {
    setPage((prev) => {
      if (prev * pageSize >= items.length) return prev;
      return prev + 1;
    });
  }, [items.length, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [items]);

  // текущая порция элементов
  const currentItems = useMemo(() => {
    return items.slice(0, page * pageSize);
  }, [items, page, pageSize]);

  return { currentItems, loadMore, hasMore };
}
