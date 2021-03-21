import React from 'react';
import {
  BsCheck,
  BsExclamationCircle,
  BsExclamationTriangle,
  BsInfoCircle,
  BsX,
} from 'react-icons/bs';
import { useNotificationContext } from '../contexts/NotificationContext';
import type { INotification } from '../types';
import styles from './Toast.module.scss';

const getIcon = (type: INotification['type']) => {
  switch (type) {
    case 'INFO':
      return <BsInfoCircle />;
    case 'WARNING':
      return <BsExclamationTriangle />;
    case 'DANGER':
      return <BsExclamationCircle />;
    case 'SUCCESS':
      return <BsCheck />;
  }
};

interface Props {
  position?: 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft';
  interval?: number;
}

export const Toast: React.FC<Props> = ({
  position = 'bottomLeft',
  interval,
}) => {
  const { state, dispatch } = useNotificationContext();

  const handleDelete = (id: string) => () => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <div className={`${styles.container} ${styles[position]}`}>
      {state.map((noti) => {
        if (interval !== undefined) {
          setInterval(() => {
            dispatch({ type: 'DELETE', payload: noti.id });
          }, interval);
        }

        return (
          <div key={noti.id} className={`${styles.noti} ${styles[noti.type]}`}>
            <button className={styles.closeBtn} onClick={handleDelete(noti.id)}>
              <BsX />
            </button>
            <div className={styles.notiIcon}>{getIcon(noti.type)}</div>
            <div>
              <p className={styles.notiTitle}>{noti.title}</p>
              <p className={styles.notiMessage}>{noti.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
