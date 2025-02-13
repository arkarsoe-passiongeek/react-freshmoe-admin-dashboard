import { nanoid } from 'nanoid';
import { toast } from 'sonner';
import { create } from 'zustand';

export type Notification = {
   id: string;
   type: 'info' | 'warning' | 'success' | 'error';
   title: string;
   message?: string;
};

type NotificationsStore = {
   notifications: Notification[];
   addNotification: (notification: Omit<Notification, 'id'>) => void;
   dismissNotification: (id: string) => void;
};

export const useNotifications = create<NotificationsStore>(set => ({
   notifications: [],
   addNotification: notification => {
      toast?.[notification.type ?? 'success'](notification.title);
      return set(state => ({
         notifications: [
            ...state.notifications,
            { id: nanoid(), ...notification },
         ],
      }));
   },
   dismissNotification: id =>
      set(state => ({
         notifications: state.notifications.filter(
            notification => notification.id !== id,
         ),
      })),
}));
