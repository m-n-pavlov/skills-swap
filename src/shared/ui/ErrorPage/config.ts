type ErrorCode = 404 | 500;

export type ErrorConfig = {
  title: string;
  description: string;
};

export const ERROR_CONFIG: Record<ErrorCode, ErrorConfig> = {
  404: {
    title: 'Страница не найдена',
    description:
      'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже'
  },
  500: {
    title: 'На сервере произошла ошибка',
    description: 'Попробуйте позже или вернитесь на главную страницу'
  }
};
