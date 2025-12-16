export type InputFileProps = {
  onChange: (files: FileList) => void;
  accept?: string; // допустимые расширения, например: 'image/*'
  variant?: 'default' | 'icon-only';
  className?: string;
};
