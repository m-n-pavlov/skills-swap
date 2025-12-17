import { Avatar, Button, InputFile } from '../../../shared/ui';
import { Input } from '../../../shared/ui/Input';
import { DateInput } from '../../../shared/ui/DateInput';
import { DropdownInput } from '../../../shared/ui/DropdownInput';
import type { PersonFormProps } from './type';
import { genderOption } from '../../../entities/constans';
import { TextArea } from '../../../shared/ui/TextArea';
import { useState } from 'react';

import styles from './PersonForm.module.css';

const mocksCity = [
  { label: 'Москва', value: 'Москва' },
  { label: 'Питер', value: 'Питер' },
  { label: 'Рязань', value: 'Рязань' }
];

export const PersonForm = ({
  formValue,
  handleInputChange,
  handleInputClick,
  handleSubmit,
  disabled
}: PersonFormProps) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const togglePasswordInput = () => {
    setShowPasswordInput(!showPasswordInput);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.formSection}>
        <Input
          label='Почта'
          name='email'
          iconName='edit'
          onChange={handleInputChange}
          placeholder='Введите email'
          required
          type='email'
          value={formValue.email}
        />
        {showPasswordInput && (
          <Input
            infoText='Пароль должен содержать не менее 8 знаков'
            name='password'
            label='Пароль'
            onChange={handleInputChange}
            placeholder='Введите пароль'
            type='password'
            value={formValue.password}
          />
        )}
        <Button
          style='text'
          children={showPasswordInput ? 'Отменить' : 'Изменить пароль'}
          type='button'
          onClick={togglePasswordInput}
          className={styles.togglePassword}
        />

        <Input
          label='Имя'
          name='name'
          iconName='edit'
          onChange={handleInputChange}
          placeholder='Введите ваше имя'
          required
          type='text'
          value={formValue.name}
        />
        <div className={styles.wrap}>
          <DateInput onChange={handleInputChange} value={formValue.birthday} />
          <DropdownInput
            label='Пол'
            placeholder='Не указан'
            value={formValue.gender}
            options={genderOption}
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
        </div>
        <DropdownInput
          label='Город'
          placeholder='Не указан'
          value={formValue.city}
          size='large'
          options={mocksCity}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        <TextArea
          label='Описание'
          name='description'
          iconName='edit'
          placeholder='Коротко опишите, чему можете научить'
          className={styles.description}
          value={formValue.description}
          onChange={handleInputChange}
        />
        <Button
          type='submit'
          children='Сохранить'
          style='primary'
          className={styles.button}
          disabled={disabled}
        />
      </section>
      <div className={styles.avatarWrap}>
        <Avatar size='large' />
        <InputFile
          onChange={handleInputChange}
          variant='icon-only'
          className={styles.inputFile}
        />
      </div>
    </form>
  );
};
