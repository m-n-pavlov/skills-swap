import { useState, useCallback, useMemo, useEffect } from 'react';

export function useInfiniteItems<T>(items: T[], pageSize = 20) {
  const [page, setPage] = useState(1);

  const hasMore = page * pageSize < items.length;

  const loadMore = useCallback(() => {
    setPage((prev) => {
      if (prev * pageSize >= items.length) return prev;
      return prev + 1;
    });
  }, [items.length, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [items]);

  const currentItems = useMemo(() => {
    return items.slice(0, page * pageSize);
  }, [items, page, pageSize]);

  return { currentItems, loadMore, hasMore };
}
