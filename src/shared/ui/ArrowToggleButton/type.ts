import type { CSSProperties } from 'react';

export type ArrowToggleButtonProps = {
  label: string;
  onClick: () => void;
  isOpen: boolean; // дополнительный проп для состояния стрелки (true = вверх)
  className?: string;
  labelStyle?: CSSProperties; // дополнительный проп для inline-стилей (встречается зеленый текст кнопки)
  iconGap?: number | string; // дополнительный проп для gap (встречается разный gap между кнопкой и стрелкой)
};
