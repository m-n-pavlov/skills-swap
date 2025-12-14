import { memo, useCallback } from 'react';
import { Icon } from '../Icon';
import styles from './Checkbox.module.css';
import type { CheckboxProps } from './types';
import clsx from 'clsx';

export const Checkbox = memo(
  ({
    items,
    selectedIds,
    expandedIds = [],
    expandableIds = [],
    isOpen = true,
    onChange,
    onToggleExpand,
    legend
  }: CheckboxProps) => {
    if (!items || items.length === 0) {
      return null;
    }

    const isExpandable = useCallback(
      (id: string) => expandableIds.includes(id),
      [expandableIds]
    );

    const isExpanded = useCallback(
      (id: string) => expandedIds.includes(id),
      [expandedIds]
    );

    const isChecked = useCallback(
      (id: string) => selectedIds.includes(id),
      [selectedIds]
    );

    const handleChange = useCallback((id: string) => onChange(id), [onChange]);

    const handleToggleExpand = useCallback(
      (id: string) => {
        if (onToggleExpand) {
          onToggleExpand(id);
        }
      },
      [onToggleExpand]
    );

    return (
      <fieldset className={clsx(styles.fieldset, { [styles.hidden]: !isOpen })}>
        {legend && <legend className={styles.legend}>{legend}</legend>}
        <ul className={styles.list}>
          {items.map((item, index) => {
            const id = item.id;
            const label = item.label;
            const inputId = `checkbox-${index}`;
            const checked = isChecked(id);
            const expandable = isExpandable(id);
            const expanded = isExpanded(id);

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
                  id={inputId}
                  name={id}
                  checked={checked}
                  className={styles.nativeCheckbox}
                  onChange={() => handleChange(id)}
                />

                <label className={styles.label}>
                  <Icon
                    name={iconName}
                    alt=''
                    aria-hidden='true'
                    className={clsx(styles.icon, {
                      [styles.iconChecked]: checked
                    })}
                    onClick={() => handleChange(id)}
                  />

                  <span
                    className={styles.text}
                    onClick={() => {
                      if (expandable) {
                        handleToggleExpand(id);
                      } else {
                        handleChange(id);
                      }
                    }}
                  >
                    {label}
                  </span>

                  {expandable && (
                    <Icon
                      name={expanded ? 'chevronUp' : 'chevronDown'}
                      alt=''
                      aria-hidden='true'
                      className={styles.arrow}
                      onClick={() => {
                        handleToggleExpand(id);
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
