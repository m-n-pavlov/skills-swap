import './menu-link.css';

export type MenuLinkProps = {
  label: string;
  href?: string;
  isActive?: boolean;
};

export const MenuLink = ({ label, href = '#', isActive }: MenuLinkProps) => {
  return (
    <a
      className={`menu-link ${isActive ? 'menu-link--active' : ''}`}
      href={href}
    >
      {label}
    </a>
  );
};
