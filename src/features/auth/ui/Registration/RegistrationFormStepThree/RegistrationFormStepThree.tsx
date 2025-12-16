import type { FC, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './RegistrationFormStepThree.module.css';
import type { RegistrFormStepThreeProps } from './type';

import { Input } from '../../../../../shared/ui/Input';
import { DropdownInput } from '../../../../../shared/ui/DropdownInput/DropdownInput';
import { InputFile } from '../../../../../shared/ui/InputFile/InputFile';
import { Button } from '../../../../../shared/ui/Button/Button';
import { TextArea } from '../../../../../shared/ui/TextArea/TextArea';

export const RegistrationFormStepThree: FC<RegistrFormStepThreeProps> = ({
  values,
  onChange,
  onSubmit,
  onBack,
  isLoading,
  isFormValid,
  className,
  categoryOptions,
  subcategoryOptions,
  skillNameErrorText,
  categoryErrorText,
  subcategoryErrorText,
  descriptionErrorText,
  onFilesChange
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit}>
      {/* Название навыка */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor='skillName'>
          Название навыка
        </label>
        <Input
          name='skillName'
          type='text'
          value={values.skillName}
          onChange={(val) => onChange('skillName', val)}
          placeholder='Введите название вашего навыка'
          className={styles.input}
          errorText={skillNameErrorText}
        />
      </div>

      {/* Категория навыка */}
      <div className={styles.field}>
        <DropdownInput
          label='Категория навыка'
          placeholder='Выберите категорию навыка'
          options={categoryOptions}
          value={values.skillCategory}
          onChange={(val) => onChange('skillCategory', val as string)}
          className={styles.input}
          errorText={categoryErrorText}
        />
      </div>

      {/* Подкатегория навыка */}
      <div className={styles.field}>
        <DropdownInput
          label='Подкатегория навыка'
          placeholder='Выберите подкатегорию навыка'
          options={subcategoryOptions}
          value={values.skillSubcategory}
          onChange={(val) => onChange('skillSubcategory', val as string)}
          className={styles.input}
          errorText={subcategoryErrorText}
        />
      </div>

      {/* Описание */}
      <div className={styles.field}>
        <TextArea
          name='description'
          label='Описание'
          placeholder='Коротко опишите, чему можете научить'
          value={values.description}
          onChange={(val) => onChange('description', val)}
          errorText={descriptionErrorText}
        />
      </div>

      {/* Загрузка изображений */}
      <div className={styles.field}>
        <InputFile
          onChange={(files) => {
            onFilesChange?.(files);
          }}
        />
      </div>

      {/* Кнопки */}
      <div className={styles.buttons}>
        <Button
          type='button'
          style='secondary'
          className={styles.buttonBack}
          onClick={onBack}
        >
          Назад
        </Button>

        <Button
          type='submit'
          style='primary'
          className={styles.buttonNext}
          disabled={isLoading || !isFormValid}
        >
          Продолжить
        </Button>
      </div>
    </form>
  );
};

export default RegistrationFormStepThree;
