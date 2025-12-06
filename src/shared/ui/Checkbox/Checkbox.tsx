import { memo, useCallback } from 'react';
import { Icon } from '../Icon';
import styles from './Checkbox.module.css';
import type { CheckboxProps } from './types';
import clsx from 'clsx';

export const Checkbox = memo(
  ({
    skills,
    selectedSkills,
    expandedSkills = [],
    expandableSkills = [],
    isOpen = true,
    onChange,
    onToggleExpand,
    legend
  }: CheckboxProps) => {
    if (!skills || skills.length === 0) {
      return null;
    }

    const isExpandable = useCallback(
      (skill: string) => expandableSkills.includes(skill),
      [expandableSkills]
    );

    const isExpanded = useCallback(
      (skill: string) => expandedSkills.includes(skill),
      [expandedSkills]
    );

    const isChecked = useCallback(
      (skill: string) => selectedSkills.includes(skill),
      [selectedSkills]
    );

    const handleChange = useCallback(
      (skill: string) => onChange(skill),
      [onChange]
    );

    const handleToggleExpand = useCallback(
      (skill: string) => {
        if (onToggleExpand) {
          onToggleExpand(skill);
        }
      },
      [onToggleExpand]
    );

    return (
      <fieldset className={clsx(styles.fieldset, { [styles.hidden]: !isOpen })}>
        {legend && <legend className={styles.legend}>{legend}</legend>}
        <ul className={styles.list}>
          {skills.map((skill, index) => {
            const id = `checkbox-${index}`;
            const checked = isChecked(skill);
            const expandable = isExpandable(skill);
            const expanded = isExpanded(skill);

            let iconName: 'checkboxEmpty' | 'checkboxDone' | 'checkboxRemove' =
              'checkboxEmpty';

            if (checked && expanded) {
              iconName = 'checkboxRemove';
            } else if (checked) {
              iconName = 'checkboxDone';
            }

            return (
              <li key={id} className={styles.item}>
                <input
                  type='checkbox'
                  id={id}
                  name={skill}
                  checked={checked}
                  className={styles.nativeCheckbox}
                  onChange={() => handleChange(skill)}
                />

                <label className={styles.label}>
                  <Icon
                    name={iconName}
                    alt=''
                    aria-hidden='true'
                    className={clsx(styles.icon, {
                      [styles.iconChecked]: checked
                    })}
                    onClick={() => handleChange(skill)}
                  />

                  <span
                    className={styles.text}
                    onClick={() => {
                      if (expandable) {
                        handleToggleExpand(skill);
                      } else {
                        handleChange(skill);
                      }
                    }}
                  >
                    {skill}
                  </span>

                  {expandable && (
                    <Icon
                      name={expanded ? 'chevronUp' : 'chevronDown'}
                      alt=''
                      aria-hidden='true'
                      className={styles.arrow}
                      onClick={() => {
                        handleToggleExpand(skill);
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
  }
);
