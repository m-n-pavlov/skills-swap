import { Icon } from '../Icon';
import styles from './RadioButton.module.css';
import type { RadioButtonProps } from './type';

export const RadioButton = <T extends string>({
  legend,
  name,
  items,
  onChange
}: RadioButtonProps<T>) => {
  return (
    <fieldset className={styles.fieldset}>
      {legend && <legend className={styles.legend}>{legend}</legend>}

      <ul className={styles.list}>
        {items.map((item) => {
          const id = `${name}-${item.value}`;
          return (
            <li key={item.value} className={styles.item}>
              <input
                className={styles.input}
                type='radio'
                id={id}
                name={name}
                value={item.value}
                checked={item.checked}
                onChange={() => onChange?.(item.value)}
              />
              <label htmlFor={id} className={styles.label}>
                <Icon
                  name={item.checked ? 'radiobuttonActive' : 'radiobuttonEmpty'}
                  alt={item.label}
                  className={item.checked ? styles.iconChecked : styles.icon}
                />
                {item.label}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};
