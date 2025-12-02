import { Button } from '../Button/Button';

export const LoginButton = () => {
  return (
    <form>
      <Button
        onClick={() => console.log('Вход')}
        type='submit'
        style='primary'
        className='login-button'
      >
        Войти
      </Button>
    </form>
  );
};
