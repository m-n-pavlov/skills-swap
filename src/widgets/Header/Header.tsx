import type { HeaderProps } from './type';
import styles from './header.module.css';
import {
  ButtonToggleTheme,
  Logo,
  MenuLink,
  RegistrationButton,
  SearchInput
} from '../../shared/ui';
import { LoginButton } from '../../shared/ui/LoginButton';
import { NotificationButton } from '../../shared/ui/NotificationButton';
import { FaivaritsLinkUI } from '../../shared/ui/FaivaritsLink';
import { UserLinkUI } from '../../shared/ui/UserLink';
import { SkillsPopover } from '../../shared/ui/SkillsPopover';

export const Header: React.FC<HeaderProps> = ({
  isAuth = false,
  user,
  categories,
  onChangeInput,
  hrefRegistration,
  hrefLogin,
  hrefFaivaritsLink
}) => {
  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.menu}>
        <MenuLink label='О проекте' href='/about' className={styles.about} />
        <SkillsPopover categories={categories} />
      </div>
      <SearchInput
        value=''
        onChange={onChangeInput}
        placeholder='Искать навык'
        name='search'
      />
      {!isAuth && (
        <>
          <ButtonToggleTheme />
          <div className={styles.authButtons}>
            <LoginButton to={hrefLogin} />
            <RegistrationButton to={hrefRegistration} />
          </div>
        </>
      )}
      {isAuth && (
        <div className={styles.actions}>
          <div className={styles.icons}>
            <ButtonToggleTheme />
            <NotificationButton />
            <FaivaritsLinkUI href={hrefFaivaritsLink} iconName='likeEmpty' />
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
