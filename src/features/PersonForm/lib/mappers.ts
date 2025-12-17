import type { TAuthUser } from '../../../entities/authUser';
import type { TUpdatePayload } from '../../../api/auth/authChangeApi';
import type { PersonFormValue } from '../ui/type';

export const userToPersonForm = (user: TAuthUser): PersonFormValue => {
  const u: any = user;

  return {
    email: u.email ?? '',
    name: u.name ?? '',
    birthday: u.birthday ? new Date(u.birthday) : null,
    gender: (u.gender ?? 'other') as PersonFormValue['gender'],
    cityId: u.cityId ? String(u.cityId) : '',
    description: u.description ?? '',
    password: ''
  };
};

export const personFormToUpdatePayload = (
  form: PersonFormValue,
  user: TAuthUser
): TUpdatePayload => {
  const updates: TUpdatePayload['updates'] = {
    email: form.email.trim(),
    name: form.name.trim(),
    gender: form.gender,
    cityId: form.cityId,
    description: form.description.trim()
  };

  if (form.birthday) {
    updates.birthday = form.birthday.toISOString();
  }

  return {
    user,
    updates
  };
};
