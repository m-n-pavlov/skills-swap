import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { PersonForm } from '../../features/PersonForm/ui/PersonForm';
import { usePersonForm } from '../../features/PersonForm/lib/usePersonForm';

import { UserMenu } from '../../widgets/UserMenu';
import styles from './Person.module.css';

import { selectAllCities } from '../../app/store/slices/citiesSlice/citiesSelector';

export const Person: FC = () => {
  const cities = useSelector(selectAllCities);
  const cityOptions = cities.map((city: any) => ({
    value: city.location,
    label: city.location
  }));

  const {
    currentUser,
    serverError,

    formValue,
    errors,

    showPasswordInput,
    togglePasswordInput,

    handleFieldChange,
    handleDescriptionChange,
    handleBirthdayChange,
    handleGenderChange,
    handleCityChange,

    avatarBase64,
    avatarError,
    avatarToRemove,
    handleAvatarChange,
    handleRemoveAvatar,

    handleSubmit,
    disabled
  } = usePersonForm();

  const handleInputClick = () => {};

  if (!currentUser) {
    return (
      <section className={styles.wrap}>
        <UserMenu defaultActiveId='personalities' />
        <p>Нужно войти в аккаунт, чтобы редактировать профиль.</p>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <UserMenu defaultActiveId='personalities' />
      <PersonForm
        formValue={formValue}
        errors={errors}
        cityOptions={cityOptions}
        showPasswordInput={showPasswordInput}
        onTogglePassword={togglePasswordInput}
        onFieldChange={handleFieldChange}
        onDescriptionChange={handleDescriptionChange}
        onBirthdayChange={handleBirthdayChange}
        onGenderChange={handleGenderChange}
        onCityChange={handleCityChange}
        avatarBase64={avatarBase64}
        avatarError={avatarError}
        avatarToRemove={avatarToRemove}
        onAvatarChange={handleAvatarChange}
        onRemoveAvatar={handleRemoveAvatar}
        onInputClick={handleInputClick}
        onSubmit={handleSubmit}
        disabled={disabled}
        serverError={serverError}
      />
    </section>
  );
};
