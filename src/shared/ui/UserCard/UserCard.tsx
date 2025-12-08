import type { UserCardProps } from './type.ts';
import { memo } from 'react';
import styles from './UserCard.module.css';
import clsx from 'clsx';
import { Avatar, Tag, ButtonIcon, LinkButton } from '../index.ts'; // импорт нужных атомарных компонентов
import type { TagCategory } from '../Tag/type.ts';
import { calculateAge } from '../../lib/calculateAge.ts'; // функция для вычисления возраста по дате рождения
import { getAgeEndingWord } from '../../lib/getAgeEndingWord.ts'; // функция для правильного окончания слова "год/года/лет"

// 🟡 Моки пользователя
const usersMock = [
  {
    id: '1',
    name: 'Мария',
    avatarUrl: 'https://i.pravatar.cc/100?img=5',
    cityId: 'saint_petersburg',
    gender: 'female',
    birthday: '1996-12-01',
    skillsTeach: ['1'],
    skillsLearn: ['2', '3'],
    likes: 0,
    createdAt: '2025-12-07'
  }
];

// 🟡 Моки городов
const citiesMock = [{ id: 'saint_petersburg', location: 'Санкт-Петербург' }];

// 🟡 Моки навыков
const skillsMock = [
  { id: '1', name: 'Уборка и организация', categoryId: 'home' },
  { id: '2', name: 'Английский', categoryId: 'language' },
  { id: '3', name: 'Метод SPIN в продажах', categoryId: 'business' }
];

// 🟢 Компонент
export const UserCard = memo(function UserCard({
  user,
  avatar,
  className,
  showLinkButton,
  onLike,
  onMore
}: UserCardProps) {
  // Используем пропсы, если они есть, иначе заглушки
  const currentUser = user ?? usersMock[0];
  const currentAvatar = avatar ?? {
    size: 'medium',
    avatarUrl: currentUser.avatarUrl,
    alt: currentUser.name
  };

  const age = calculateAge(currentUser.birthday); // вычисляем возраст
  const cityName =
    citiesMock.find((city) => city.id === currentUser.cityId)?.location ||
    'Город не найден'; // получаем город пользователя

  // Получаев два вида навыков
  const teachSkills: NonNullable<(typeof skillsMock)[number]>[] =
    currentUser.skillsTeach
      .map((skillId) => skillsMock.find((skill) => skill.id === skillId))
      .filter((skill): skill is NonNullable<typeof skill> => Boolean(skill));

  const learnSkills: NonNullable<(typeof skillsMock)[number]>[] =
    currentUser.skillsLearn
      .map((skillId) => skillsMock.find((skill) => skill.id === skillId))
      .filter((skill): skill is NonNullable<typeof skill> => Boolean(skill));

  return (
    <li className={clsx(styles.userCard, className)}>
      {' '}
      {/* главный контейнер карточки */}
      <div className={styles.userInfo}>
        {' '}
        {/* блок с аватаркой, именем, городом, возрастом пользователя и кнопкой лайка */}
        <Avatar {...currentAvatar} />{' '}
        {/* компонент аватарки пользователя, to be: <Avatar {...avatar} avatarUrl={user.avatarUrl} /> */}
        {/* блок с именем, городом, возрастом пользователя и кнопкой лайка */}
        <div
          className={clsx(
            styles.userInfoDetails,
            !showLinkButton && styles.userInfoDetails_center
          )}
        >
          {/* условный компонент кнопки лайка */}
          {showLinkButton && (
            <ButtonIcon
              name='like'
              iconName='like'
              onClick={() => onLike?.(currentUser.id)}
            />
          )}
          <div className={styles.userDataWrapper}>
            {' '}
            {/* контейнер для имени, города и возраста пользователя */}
            <p className={styles.userName}>{currentUser.name}</p>{' '}
            {/* to be: {user.name} */}
            <p className={styles.userData}>
              {cityName}, {age} {getAgeEndingWord(age)}
            </p>
          </div>
        </div>
      </div>
      {/* условный блок с коротким БИО пользователя */}
      {!showLinkButton && (
        <div className={styles.userCardBio}>
          <p>
            Привет! Люблю ритм, кофе по утрам и людей, которые не боятся
            пробовать новое
          </p>
        </div>
      )}
      <div className={styles.userSkillsWrapper}>
        {' '}
        {/* обёртка для блока "Может научить" */}
        <p className={styles.userSkillsHeader}>Может научить:</p>{' '}
        {/* заголовок "Может научить" */}
        <div className={styles.userSkills}>
          {' '}
          {/* контейнер для тегов с навыками */}
          {/* компонент Tag */}
          {teachSkills.map((skill) => (
            <Tag key={skill.id} category={skill.categoryId as TagCategory}>
              {skill.name}
            </Tag>
          ))}
        </div>
      </div>
      <div className={styles.userSkillsWrapper}>
        {' '}
        {/* обёртка для блока "Хочет научиться" */}
        <p className={styles.userSkillsHeader}>Хочет научиться:</p>{' '}
        {/* заголовок "Хочет научиться" */}
        <div className={styles.userSkills}>
          {' '}
          {/* контейнер для тегов с навыками */}
          {/* компонент Tag */}
          <div className={styles.userSkills}>
            {learnSkills.slice(0, 2).map((skill) => (
              <Tag key={skill.id} category={skill.categoryId as TagCategory}>
                {skill.name}
              </Tag>
            ))}
            {learnSkills.length > 2 && (
              <Tag category='default'>{`+${learnSkills.length - 2}`}</Tag>
            )}
          </div>
        </div>
      </div>
      {/* условный компонент кнопки LinkButton - пока с заглушкой */}
      {showLinkButton && (
        <LinkButton
          size='xl'
          style='primary'
          to='#'
          onClick={() => onMore?.(currentUser.id)}
        >
          Подробнее
        </LinkButton>
      )}
    </li>
  );
});
