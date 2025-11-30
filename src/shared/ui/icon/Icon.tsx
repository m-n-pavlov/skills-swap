import { memo } from 'react';
import { icons, type IconName } from '.';
import type { CSSProperties } from 'react';

interface IconProps {
  name: IconName;
  alt: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const IconComponent = ({ name, alt, className, style, onClick }: IconProps) => {
  const SvgIcon = icons[name];

  return (
    <SvgIcon
      aria-label={alt}
      className={className}
      style={style}
      onClick={onClick}
      role='img'
    />
  );
};

export const Icon = memo(IconComponent);
