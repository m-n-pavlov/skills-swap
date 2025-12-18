import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { ButtonIcon } from '../ButtonIcon';
import styles from './NotificationButton.module.css';
import { clsx } from 'clsx';
import { LinkButton } from '../LinkButton';
import type { TNotificationButton } from './type.ts';

const NotificationButton = ({ isHaveNotification }: TNotificationButton) => {
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

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  return (
    <div className={styles.container}>
      <ButtonIcon
        name={'notification'}
        iconName={'notification'}
        className={clsx(styles.buttonIcon)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name={'notification'} alt={'notification'} />
      </ButtonIcon>
      <span
        className={clsx(isHaveNotification && styles.haveNotification)}
      ></span>
      {isOpen && (
        <div ref={popoverRef} className={styles.popover}>
          <div>
            <div className={clsx(styles.header)}>
              <h4 className={clsx(styles.headerTitle)}>Новые уведомления</h4>
              <button className={clsx(styles.buttonReadAll)} onClick={() => {}}>
                Прочитать все
              </button>
            </div>
            <ul className={clsx(styles.list)}>
              <li>
                <div className={clsx(styles.body)}>
                  <div className={clsx(styles.content)}>
                    <Icon
                      name={'idea'}
                      alt={'idea'}
                      className={clsx(styles.icon)}
                    />
                    <div className={clsx(styles.hero)}>
                      <h5 className={clsx(styles.title)}>
                        Николай принял ваш обмен
                      </h5>
                      <p className={clsx(styles.text)}>
                        Перейдите в профиль, чтобы обсудить детали
                      </p>
                    </div>
                  </div>
                  <span className={clsx(styles.day)}>сегодня</span>
                </div>
                <LinkButton
                  size={'xs'}
                  style={'primary'}
                  to={''}
                  className={clsx(styles.linkButton)}
                >
                  Перейти
                </LinkButton>
              </li>
              <li>
                <div className={clsx(styles.body)}>
                  <div className={clsx(styles.content)}>
                    <Icon
                      name={'idea'}
                      alt={'idea'}
                      className={clsx(styles.icon)}
                    />
                    <div className={clsx(styles.hero)}>
                      <h5 className={clsx(styles.title)}>
                        Николай принял ваш обмен
                      </h5>
                      <p className={clsx(styles.text)}>
                        Перейдите в профиль, чтобы обсудить детали
                      </p>
                    </div>
                  </div>
                  <span className={clsx(styles.day)}>сегодня</span>
                </div>
                <LinkButton
                  size={'xs'}
                  style={'primary'}
                  to={''}
                  className={clsx(styles.linkButton)}
                >
                  Перейти
                </LinkButton>
              </li>
            </ul>
          </div>
          <div>
            <div className={clsx(styles.header)}>
              <h4 className={clsx(styles.headerTitle)}>Просмотренные</h4>
              <button className={clsx(styles.buttonReadAll)} onClick={() => {}}>
                Очистить
              </button>
            </div>
            <ul className={clsx(styles.list)}>
              <li>
                <div className={clsx(styles.body)}>
                  <div className={clsx(styles.content)}>
                    <Icon
                      name={'idea'}
                      alt={'idea'}
                      className={clsx(styles.icon)}
                    />
                    <div className={clsx(styles.hero)}>
                      <h5 className={clsx(styles.title)}>
                        Олег предлагает вам обмен
                      </h5>
                      <p className={clsx(styles.text)}>
                        Перейдите в профиль, чтобы обсудить детали
                      </p>
                    </div>
                  </div>
                  <span className={clsx(styles.day)}>вчера</span>
                </div>
              </li>
              <li>
                <div className={clsx(styles.body)}>
                  <div className={clsx(styles.content)}>
                    <Icon
                      name={'idea'}
                      alt={'idea'}
                      className={clsx(styles.icon)}
                    />
                    <div className={clsx(styles.hero)}>
                      <h5 className={clsx(styles.title)}>
                        Николай принял ваш обмен
                      </h5>
                      <p className={clsx(styles.text)}>
                        Перейдите в профиль, чтобы обсудить детали
                      </p>
                    </div>
                  </div>
                  <span className={clsx(styles.day)}>23 мая</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export { NotificationButton };
