import type { HeaderProps } from './type';
import styles from './header.module.css';
import {
  ButtonToggleTheme,
  Logo,
  MenuButton,
  MenuLink,
  RegistrationButton,
  SearchInput
} from '../../shared/ui';
import { LoginButton } from '../../shared/ui/LoginButton';
import { NotificationButton } from '../../shared/ui/NotificationButton';
import { FaivaritsLinkUI } from '../../shared/ui/FaivaritsLink';
import { UserLinkUI } from '../../shared/ui/UserLink';

export const Header: React.FC<HeaderProps> = ({ isAuth = false, user }) => {
  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.menu}>
        <MenuLink label='О проекте' href='#' className={styles.about} />
        <MenuButton
          label='Все навыки'
          iconName='chevronDown'
          className={styles.all}
        />
      </div>
      <SearchInput
        value=''
        onChange={() => {}}
        placeholder='Искать навык'
        name='search'
      />
      {!isAuth && (
        <>
          <ButtonToggleTheme />
          <div className={styles.authButtons}>
            <LoginButton />
            <RegistrationButton />
          </div>
        </>
      )}
      {isAuth && (
        <div className={styles.actions}>
          <div className={styles.icons}>
            <ButtonToggleTheme />
            <NotificationButton />
            <FaivaritsLinkUI href='/_like_' iconName='likeEmpty' />
          </div>
          <UserLinkUI
            href='#'
            size='small'
            avatarUrl={user?.avatarUrl}
            name={user?.name}
          />
        </div>
      )}
    </div>
  );
};
