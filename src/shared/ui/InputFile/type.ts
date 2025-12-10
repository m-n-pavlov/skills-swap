export type InputFileProps = {
  onChange: (files: FileList) => void;
  accept?: string; // допустимые расширения, например: 'image/*'
};
