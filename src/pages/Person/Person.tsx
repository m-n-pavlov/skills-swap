import type { FC } from 'react';
import { PersonForm } from '../../features/PersonForm/ui/PersonForm';
import style from './Person.module.css';

export const Person: FC = () => {
  return (
    <section className={style.wrap}>
      <PersonForm
        formValue={}
        handleInputChange={}
        handleInputClick={}
        handleSubmit={}
        disabled={}
      />
    </section>
  );
};
