import type { HeaderProps } from './type';
import styles from './Header.module.css';
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
import { UserButtonUI } from '../../shared/ui/UserButton';
import { SkillsPopover } from '../SkillsPopover';

export const Header: React.FC<HeaderProps> = ({
  isAuth = false,
  user,
  categories,
  searchQuery,
  onChangeInput,
  hrefAbout,
  hrefRegistration,
  hrefLogin,
  hrefFaivaritsLink,
  hrefProfile,
  handleLogOut
}) => {
  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.menu}>
        <MenuLink label='О проекте' href={hrefAbout} className={styles.about} />
        <SkillsPopover categories={categories} />
      </div>
      <SearchInput
        value={searchQuery}
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
          <UserButtonUI
            size='small'
            avatarUrl={user?.avatarUrl}
            name={user?.name}
            hrefProfile={hrefProfile}
            handleLogOut={handleLogOut}
          />
        </div>
      )}
    </div>
  );
};
