import React, { useEffect, useRef, useState } from 'react';

import { Avatar, Button } from '../../../shared/ui';
import { Input } from '../../../shared/ui/Input';
import { DateInput } from '../../../shared/ui/DateInput';
import { DropdownInput } from '../../../shared/ui/DropdownInput';
import { TextArea } from '../../../shared/ui/TextArea';
import { Icon } from '../../../shared/ui';

import type { Gender, PersonFormProps } from './type';
import { genderOption } from '../../../entities/constans';

import styles from './PersonForm.module.css';

export const PersonForm = ({
  formValue,
  errors,
  cityOptions,

  showPasswordInput,
  onTogglePassword,

  onFieldChange,
  onDescriptionChange,
  onBirthdayChange,
  onGenderChange,
  onCityChange,

  avatarBase64,
  avatarError,
  avatarToRemove,
  onAvatarChange,
  onRemoveAvatar,

  onInputClick,
  onSubmit,

  disabled,
  serverError
}: PersonFormProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setIsMenuOpen(false);
    };
    if (isMenuOpen) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isMenuOpen]);

  const pickFile = () => {
    if (fileRef.current) fileRef.current.value = '';
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAvatarChange(e.target.files);
    setIsMenuOpen(false);
  };

  const showAvatar = avatarBase64 && !avatarToRemove;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <section className={styles.formSection}>
        {!!serverError && <p className={styles.serverError}>{serverError}</p>}

        <div
          className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}
        >
          <Input
            label='Почта'
            name='email'
            iconName='edit'
            placeholder='Введите email'
            required
            type='email'
            value={formValue.email}
            onChange={(value: string) => onFieldChange('email', value)}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        {showPasswordInput && (
          <div
            className={`${styles.field} ${errors.password ? styles.fieldError : ''}`}
          >
            <Input
              infoText='Пароль должен содержать не менее 8 знаков'
              name='password'
              label='Пароль'
              placeholder='Введите пароль'
              type='password'
              value={formValue.password}
              onChange={(value: string) => onFieldChange('password', value)}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}
          </div>
        )}

        <Button
          style='text'
          type='button'
          onClick={onTogglePassword}
          className={styles.togglePassword}
        >
          {showPasswordInput ? 'Отменить' : 'Изменить пароль'}
        </Button>

        <div
          className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}
        >
          <Input
            label='Имя'
            name='name'
            iconName='edit'
            placeholder='Введите ваше имя'
            required
            type='text'
            value={formValue.name}
            onChange={(value: string) => onFieldChange('name', value)}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.wrap}>
          <div
            className={`${styles.field} ${errors.birthday ? styles.fieldError : ''}`}
          >
            <DateInput onChange={onBirthdayChange} value={formValue.birthday} />
            {errors.birthday && (
              <p className={styles.errorText}>{errors.birthday}</p>
            )}
          </div>

          <div
            className={`${styles.field} ${errors.gender ? styles.fieldError : ''}`}
          >
            <DropdownInput
              label='Пол'
              placeholder='Не указан'
              value={formValue.gender}
              size='large'
              options={genderOption}
              onChange={(value) => {
                if (typeof value === 'string') onGenderChange(value as Gender);
              }}
              onClick={onInputClick}
            />
            {errors.gender && (
              <p className={styles.errorText}>{errors.gender}</p>
            )}
          </div>
        </div>

        <div
          className={`${styles.field} ${errors.cityId ? styles.fieldError : ''}`}
        >
          <DropdownInput
            label='Город'
            placeholder='Не указан'
            value={formValue.cityId}
            size='large'
            options={cityOptions}
            onChange={(value) => {
              if (typeof value === 'string') onCityChange(value);
            }}
            onClick={onInputClick}
          />
          {errors.cityId && <p className={styles.errorText}>{errors.cityId}</p>}
        </div>

        <div
          className={`${styles.field} ${errors.description ? styles.fieldError : ''}`}
        >
          <TextArea
            label='О себе'
            name='description'
            iconName='edit'
            placeholder='Коротко опишите, чему можете научить'
            className={styles.description}
            value={formValue.description}
            onChange={onDescriptionChange}
          />
          {errors.description && (
            <p className={styles.errorText}>{errors.description}</p>
          )}
        </div>

        <Button
          type='submit'
          style='primary'
          className={styles.button}
          disabled={disabled}
        >
          Сохранить
        </Button>
      </section>
      <div className={styles.avatarWrap}>
        <div className={styles.avatarBox} ref={wrapRef}>
          <Avatar size='large' />

          {showAvatar && (
            <img
              className={styles.avatarImg}
              src={avatarBase64!}
              alt='avatar'
            />
          )}

          <button
            type='button'
            className={styles.avatarBtn}
            onClick={() => setIsMenuOpen((p) => !p)}
            aria-label='Фото профиля'
          >
            <Icon name='galleryAdd' alt='Фото профиля' />
          </button>

          {isMenuOpen && (
            <div className={styles.menu}>
              <button
                type='button'
                className={styles.menuItem}
                onClick={pickFile}
              >
                Upload a photo…
              </button>

              {avatarBase64 && (
                <button
                  type='button'
                  className={styles.menuItem}
                  onClick={() => {
                    onRemoveAvatar();
                    setIsMenuOpen(false);
                  }}
                >
                  Remove photo
                </button>
              )}
            </div>
          )}

          <input
            ref={fileRef}
            type='file'
            accept='image/*'
            className={styles.hiddenInput}
            onChange={handleFileChange}
          />
        </div>

        {avatarError && <p className={styles.errorText}>{avatarError}</p>}
      </div>
    </form>
  );
};
