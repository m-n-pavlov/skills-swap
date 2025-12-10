import { memo } from 'react';
import { icons } from './icons';
import type { IconProps } from './type';

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
