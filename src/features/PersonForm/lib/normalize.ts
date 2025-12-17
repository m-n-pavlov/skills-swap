import type { PersonFormValue } from '../ui/type';

export const normalizeForCompare = (v: PersonFormValue) => ({
  email: v.email.trim(),
  name: v.name.trim(),
  birthday: v.birthday ? v.birthday.toISOString().slice(0, 10) : null,
  gender: v.gender,
  cityId: v.cityId,
  description: v.description.trim()
});
