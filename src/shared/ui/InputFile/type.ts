export type InputFileProps = {
  onChange: (files: FileList) => void;
  accept?: string;
  variant?: 'default' | 'icon-only';
  className?: string;
};
