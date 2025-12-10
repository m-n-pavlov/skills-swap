import type { StepIllustrationCode, StepIllustrationConfig } from './type';

export const STEPILLUSTRATION_CONFIG: Record<
  StepIllustrationCode,
  StepIllustrationConfig
> = {
  1: {
    title: 'Добро пожаловать в SkillSwap!',
    subtitle:
      'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
  },
  2: {
    title: 'Расскажите немного о себе',
    subtitle:
      'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
  },
  3: {
    title: 'Укажите, чем вы готовы поделиться',
    subtitle:
      'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!'
  }
};
