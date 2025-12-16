import type { FC } from 'react';
import { PersonForm } from '../../features/PersonForm/ui/PersonForm';
import { UserMenu } from '../../widgets/UserMenu';

import styles from './Person.module.css';

const mock = {
  formValue: {
    email: '92613@mail.ru',
    name: 'Anastasia',
    birthday: new Date('1989-09-26'),
    gender: 'female' as const,
    city: 'Москва',
    description: 'dfghjkl;',
    password: 'passowrd'
  }
};

export const Person: FC = () => {
  return (
    <section className={styles.wrap}>
      <UserMenu />
      <PersonForm
        formValue={mock.formValue}
        handleInputChange={() => console.log('cvbnm,')}
        handleInputClick={() => console.log('cvbnm,')}
        handleSubmit={() => console.log('cvbnm,')}
        disabled={false}
      />
    </section>
  );
};
