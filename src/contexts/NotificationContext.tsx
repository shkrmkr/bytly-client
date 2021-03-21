import { nanoid } from 'nanoid';
import React, { createContext, useContext, useReducer } from 'react';
import type { INotification } from '../types';

const addNotification = (payload: Omit<INotification, 'id'>) => ({
  type: 'ADD' as const,
  payload: { ...payload, id: nanoid() } as INotification,
});

const deleteNotification = (payload: INotification['id']) => ({
  type: 'DELETE' as const,
  payload,
});

type NotificationState = INotification[];

type NotificationAction =
  | ReturnType<typeof addNotification>
  | ReturnType<typeof deleteNotification>;

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE':
      return state.filter((noti) => noti.id !== action.payload);
    default:
      return state;
  }
};

const NotificationContext = createContext<{
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
}>({
  state: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export const NotificationProvider: React.FC = ({ children }) => {
  const notifications: INotification[] = [
    {
      id: nanoid(),
      message: 'hello world',
      title: 'Successfully retrieved all posts!',
      type: 'SUCCESS',
    },
    {
      id: nanoid(),
      message: 'Warning!!!',
      title: 'Successfully retrieved all posts!',
      type: 'WARNING',
    },
  ];

  const [state, dispatch] = useReducer(notificationReducer, notifications);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
