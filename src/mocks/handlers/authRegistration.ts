import type { TSkill } from '../../entities/skills.ts';
import { http, HttpResponse } from 'msw';
import type { TAuthUser } from '../../entities/authUser.ts';
import data from '../../../public/db/auth.json';

export const mockAuthUsers = data.users as TAuthUser[];

export const authRegisterHandler = [
  http.post('/api/auth/register', async ({ request }) => {
    const formData = await request.formData();

    const {
      email,
      password,
      name,
      birthday,
      gender,
      cityId,
      description,
      learningCategoryId,
      learningSubCategoryId,
      skillsTeach,
      avatarFile,
      skillsImageFiles
    } = parseFormData<{
      email: string;
      password: string;
      name: string;
      birthday: string;
      gender: string;
      cityId: string;
      description: string;
      learningCategoryId: string;
      learningSubCategoryId: string;
      skillsTeach: TSkill;
      avatarFile: File | null;
      skillsImageFiles: File[];
    }>(formData, ['skillsTeach']);

    const emailExists = mockAuthUsers.some((u) => u.email === email);
    if (emailExists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Пользователь с таким email уже существует'
        }),
        { status: 400 }
      );
    }

    const avatarUrl = avatarFile
      ? URL.createObjectURL(avatarFile)
      : generateFakeFileUrl('avatar');

    const skillImageUrls = skillsImageFiles?.length
      ? skillsImageFiles.map((f) => URL.createObjectURL(f))
      : [generateFakeFileUrl('skill')];

    const finalSkillsTeach: TSkill = {
      ...skillsTeach,
      images: skillImageUrls
    };

    const newUser: TAuthUser = {
      id: getNextId(),
      email,
      password,
      name,
      avatarUrl,
      birthday,
      gender: gender as TAuthUser['gender'],
      cityId,
      description,
      learningCategoryId,
      learningSubCategoryId,
      skillsTeach: finalSkillsTeach,
      likes: [],
      exchangeOffers: [],
      created_at: new Date().toISOString()
    };

    mockAuthUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    return new Response(
      JSON.stringify({
        success: true,
        user: userWithoutPassword,
        message: 'Пользователь успешно зарегистрирован'
      }),
      { status: 200 }
    );
  }),

  http.post('/api/auth/check-email', async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    const exists = mockAuthUsers.some((u) => u.email === email);
    return HttpResponse.json({
      success: true,
      exists
    });
  })
];

const generateFakeFileUrl = (prefix: string, ext = 'png') => {
  return `/uploads/${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
};

const parseFormData = <T>(formData: FormData, jsonFields: string[] = []) => {
  const result: any = {};
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      if (result[key]) {
        if (Array.isArray(result[key])) result[key].push(value);
        else result[key] = [result[key], value];
      } else {
        result[key] = value;
      }
      continue;
    }
    if (jsonFields.includes(key)) {
      try {
        result[key] = JSON.parse(value as string);
      } catch {
        result[key] = null;
      }
      continue;
    }
    result[key] = value;
  }
  return result as T;
};

const getNextId = () => {
  if (mockAuthUsers.length === 0) return '1';
  const lastId = Number(mockAuthUsers[mockAuthUsers.length - 1].id);
  return String(lastId + 1);
};
