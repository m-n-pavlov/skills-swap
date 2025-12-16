import type { FC, FormEvent } from 'react';
import styles from './RegistrationFormStepTwo.module.css';

import { Input } from '../../../../../shared/ui/Input';
import { DateInput } from '../../../../../shared/ui/DateInput/DateInput';
import { DropdownInput } from '../../../../../shared/ui/DropdownInput/DropdownInput';
import { Button } from '../../../../../shared/ui/Button/Button';
import { AvatarWithAdd } from '../../../../../shared/ui/AvatarWithAdd/AvatarWithAdd';

import type { RegistrFormStepTwoProps } from './type';

export const RegistrationFormStepTwo: FC<RegistrFormStepTwoProps> = ({
  values,
  onChange,
  onAvatarChange,
  genderOptions,
  cityOptions,
  learningCategoryOptions,
  learningSubcategoryOptions,
  isFormValid,
  onBack,
  onNext
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Аватар сверху с плюсиком */}
      <div className={styles.avatarWrapper}>
        <AvatarWithAdd
          size='small'
          avatarUrl={values.avatarUrl}
          onChange={(file) => {
            onAvatarChange?.(file);
          }}
        />
      </div>

      {/* Имя */}
      <Input
        label='Имя'
        name='name'
        type='text'
        placeholder='Введите ваше имя'
        value={values.name}
        onChange={(val) => onChange('name', val)}
        className={styles.field}
      />

      {/* Дата рождения + Пол в одну строку */}
      <div className={styles.row}>
        <DateInput
          value={values.birthday}
          onChange={(date) => onChange('birthday', date)}
        />

        <DropdownInput
          label='Пол'
          placeholder='Не указан'
          options={genderOptions}
          value={values.gender}
          onChange={(val) => onChange('gender', val as string)}
          className={styles.field}
        />
      </div>

      {/* Город */}
      <DropdownInput
        label='Город'
        placeholder='Не указан'
        options={cityOptions}
        value={values.city}
        onChange={(val) => onChange('city', val as string)}
        className={styles.field}
      />

      {/* Категория навыка */}
      <DropdownInput
        label='Категория навыка, которому хотите научиться'
        placeholder='Выберите категорию'
        options={learningCategoryOptions}
        value={values.learningCategory}
        onChange={(val) => onChange('learningCategory', val as string)}
        className={styles.field}
      />

      {/* Подкатегория навыка */}
      <DropdownInput
        label='Подкатегория навыка, которому хотите научиться'
        placeholder='Выберите подкатегорию'
        options={learningSubcategoryOptions}
        value={values.learningSubcategory}
        onChange={(val) => onChange('learningSubcategory', val as string)}
        className={styles.field}
      />

      {/* Кнопки */}
      <div className={styles.buttons}>
        <Button
          type='button'
          style='secondary'
          onClick={onBack}
          className={styles.buttonBack}
        >
          Назад
        </Button>

        <Button
          type='submit'
          style='primary'
          className={styles.buttonNext}
          disabled={!isFormValid}
        >
          Продолжить
        </Button>
      </div>
    </form>
  );
};

export default RegistrationFormStepTwo;
