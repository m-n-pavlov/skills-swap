import type { OfferPreviewData } from '../../widgets/OfferPreviewForSkillPage';
import { type TUserWithDetails, useUsersWithDetails } from '../users';

interface UseSkillPageResult {
  user?: TUserWithDetails;
  skillId?: string;
  offerPreviewData?: OfferPreviewData;
  recommendedUsers: TUserWithDetails[];
  isNotFound: boolean;
}

export const useSkillPage = (userId: string): UseSkillPageResult => {
  const usersWithDetails = useUsersWithDetails();

  const user = usersWithDetails.find((u) => u.id === userId);

  if (!user) {
    return {
      user: undefined,
      skillId: undefined,
      offerPreviewData: undefined,
      recommendedUsers: [],
      isNotFound: true
    };
  }

  const previewSkill = user.skillsTeach[0];
  const skillId = previewSkill?.subcategoryId;

  const offerPreviewData: OfferPreviewData = {
    title: previewSkill?.name || `${user.name} предлагает научить`,
    category: previewSkill?.categoryId || 'Обучение',
    description:
      previewSkill?.description ||
      `${user.name} готов поделиться своими знаниями`,
    images: previewSkill?.images || []
  };

  const recommendedUsers = usersWithDetails
    .filter((u) => {
      if (u.id === userId) return false;
      return u.skillsTeach.some(
        (skill) => skill.subcategoryId === previewSkill?.subcategoryId
      );
    })
    .slice(0, 10);

  return {
    user,
    skillId,
    offerPreviewData,
    recommendedUsers,
    isNotFound: false
  };
};
