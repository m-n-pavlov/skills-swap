import { ArrowToggleButton } from '../../shared/ui/ArrowToggleButton';
import { memo, useEffect, useRef, useState } from 'react';
import styles from './SkillsPopover.module.css';
import { clsx } from 'clsx';
import type { TSkillsPopoverProps } from './type.ts';
import type { TCategory, TSubCategories } from '../../entities/categories.ts';
import { Icon } from '../../shared/ui/Icon';
import type { IconName } from '../../shared/ui/Icon/icons.ts';

const SkillsPopover = memo(
  ({ className, onClick, categories }: TSkillsPopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleClickSkill = (skill: TSubCategories) => {
      onClick?.(skill.id, skill.name);
      setIsOpen(false);
    };

    const IconStyle: Record<TCategory['id'], IconName> = {
      business: 'briefcase',
      language: 'global',
      home: 'home',
      art: 'palette',
      education: 'book',
      health: 'lifestyle'
    };
    return (
      <div className={clsx(styles.container, className)} ref={popoverRef}>
        <ArrowToggleButton
          className={styles.openButton}
          label={'Все навыки'}
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          aria-label='Выбор навыков'
        />
        {isOpen && (
          <div className={clsx(styles.popover)}>
            {categories.map((category) => (
              <div className={clsx(styles.category)} key={category.id}>
                <div className={clsx(styles.categoryHeader)}>
                  <span
                    className={clsx(
                      styles.circle,
                      styles[IconStyle[category.id]]
                    )}
                  >
                    <Icon name={IconStyle[category.id]} alt={category.name} />
                  </span>
                  <h4 className={styles.title}>{category.name}</h4>
                </div>

                <ul className={clsx(styles.items)}>
                  {category.subCategories.map((item) => (
                    <li key={item.id}>
                      <button
                        className={clsx(styles.item)}
                        type={'button'}
                        onClick={() => handleClickSkill(item)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export { SkillsPopover };
