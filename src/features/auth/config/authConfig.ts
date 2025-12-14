// Куда перенаправлять пользователя после успешного логина,
// если нет "from" из location.state
export const AUTH_REDIRECT_AFTER_LOGIN = '/profile';

// Куда отправлять после выхода
export const AUTH_REDIRECT_AFTER_LOGOUT = '/login';

// Ключи для localStorage (если храните юзеров и текущего юзера)
export const USERS_STORAGE_KEY = 'skillswap_users';
export const CURRENT_USER_STORAGE_KEY = 'skillswap_current_user';
