import { LinkButton } from '../LinkButton';

export const LoginButton = () => {
  return (
    <form>
      <LinkButton size='xs' to='' style='primary' className='login-button'>
        Войти
      </LinkButton>
    </form>
  );
};
