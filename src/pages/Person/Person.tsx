import { Avatar, Button, InputFile } from '../../shared/ui';
import { Input } from '../../shared/ui/Input';
import { DateInput } from '../../shared/ui/DateInput';
import { DropdownInput } from '../../shared/ui/DropdownInput';

import { genderOption } from '../../utils/constans';

import style from './Person.module.css';
import { TextArea } from '../../shared/ui/TextArea';
import type { PersonProps } from './type';
import { useState } from 'react';
import clsx from 'clsx';

const mocksCity = [
  { label: 'Москва', value: 'Москва' },
  { label: 'Питер', value: 'Питер' },
  { label: 'Рязань', value: 'Рязань' }
];

export const Person = ({
  email,
  name,
  handleInputChange,
  birthday,
  gender,
  city,
  handleInputClick,
  description,
  handleSubmit,
  password,
  disabled
}: PersonProps) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const togglePasswordInput = () => {
    setShowPasswordInput(!showPasswordInput);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <section className={style.formSection}>
        <Input
          label='Почта'
          name='email'
          iconName='edit'
          onChange={handleInputChange}
          placeholder='Введите email'
          required
          type='email'
          value={email}
        />
        {showPasswordInput && (
          <Input
            infoText='Пароль должен содержать не менее 8 знаков'
            name='password'
            label='Пароль'
            onChange={handleInputChange}
            placeholder='Введите пароль'
            type='password'
            value={password}
          />
        )}
        <Button
          style='text'
          children={showPasswordInput ? 'Отменить' : 'Изменить пароль'}
          type='button'
          onClick={togglePasswordInput}
          className={style.togglePassword}
        />

        <Input
          label='Имя'
          name='name'
          iconName='edit'
          onChange={handleInputChange}
          placeholder='Введите ваше имя'
          required
          type='text'
          value={name}
        />
        <div className={style.wrap}>
          <DateInput onChange={handleInputChange} value={birthday} />
          <DropdownInput
            label='Пол'
            placeholder='Не указан'
            value={gender}
            options={genderOption}
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
        </div>
        <DropdownInput
          label='Город'
          placeholder='Не указан'
          value={city}
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
          className={style.description}
          value={description}
          onChange={handleInputChange}
        />
        <Button
          type='submit'
          children='Сохранить'
          style='primary'
          className={style.button}
          disabled={disabled}
        />
      </section>
      <div className={style.avatarWrap}>
        <Avatar size='large' />
        <InputFile
          onChange={handleInputChange}
          variant='icon-only'
          className={style.inputFile}
        />
      </div>
    </form>
  );
};

//сделать выезжающий инпут с паролем
