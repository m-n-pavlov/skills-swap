import React from 'react';
import { Icon } from '../icon';
import styles from './Checkbox.module.css';
import type { CheckboxProps } from './types';

export const Checkbox: React.FC<CheckboxProps> = ({
  skills,
  selectedSkills,
  expandedSkills = [],
  expandableSkills = [],
  isOpen = true,
  onChange,
  onToggleExpand,
  legend
}) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  const isExpandable = (skill: string) => expandableSkills.includes(skill);
  const isExpanded = (skill: string) => expandedSkills.includes(skill);
  const isChecked = (skill: string) => selectedSkills.includes(skill);

  return (
    <fieldset className={`${styles.fieldset} ${!isOpen ? styles.hidden : ''}`}>
      {legend && <legend className={styles.legend}>{legend}</legend>}
      <ul className={styles.list}>
        {skills.map((skill, index) => {
          const id = `checkbox-${index}`;
          const checked = isChecked(skill);
          const expandable = isExpandable(skill);
          const expanded = isExpanded(skill);

          let iconName: 'checkboxEmpty' | 'checkboxDone' | 'checkboxRemove' =
            'checkboxEmpty'; // состояния иконок

          if (checked && expanded) {
            iconName = 'checkboxRemove'; // раскрытый и выбранный → дефис
          } else if (checked) {
            iconName = 'checkboxDone'; // выбранный, но не раскрытый(не категория) → галочка
          }

          return (
            <li key={id} className={styles.item}>
              <input
                type='checkbox'
                id={id}
                name={skill}
                checked={checked}
                className={styles.nativeCheckbox}
                onChange={() => onChange(skill)}
              />

              <label className={styles.label}>
                <Icon /* Иконка — клик по ней выбирает/убирает галочку */
                  name={iconName}
                  alt={checked ? 'Выбрано' : 'Не выбрано'}
                  className={`${styles.icon} ${
                    checked ? styles.iconChecked : styles.icon
                  }`}
                  onClick={() => onChange(skill)}
                />

                <span
                  className={styles.text}
                  onClick={() => {
                    if (expandable && onToggleExpand) {
                      // Для категории — раскрываем
                      onToggleExpand(skill);
                    } else if (!expandable && onChange) {
                      // Для обычного пункта — выбираем
                      onChange(skill);
                    }
                  }}
                >
                  {skill}
                </span>

                {expandable /* Стрелка — тоже раскрывает список */ && (
                  <Icon
                    name={expanded ? 'chevronUp' : 'chevronDown'}
                    alt={expanded ? 'Свернуть' : 'Раскрыть'}
                    className={styles.arrow}
                    onClick={() => {
                      if (expandable && onToggleExpand) {
                        onToggleExpand(skill);
                      }
                    }}
                  />
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};
