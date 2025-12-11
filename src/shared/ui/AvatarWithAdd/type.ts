export type AvatarWithAddProps = {
  size: 'small' | 'medium' | 'large';
  avatarUrl?: string | null;
  onChange?: (file: File | null, previewUrl: string | null) => void;
  className?: string;
};
