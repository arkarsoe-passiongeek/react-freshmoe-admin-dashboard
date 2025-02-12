import { act, renderHook } from '@testing-library/react';

import { vi } from 'vitest';
import { Notification, useNotifications } from '../notifications-store';

vi.mock('zustand');

// Mock nanoid to return a consistent ID for testing
vi.mock('nanoid', () => ({
  nanoid: () => 'mocked-id',
}));

// Mock the Zustand store
vi.mock('../notifications-store', () => {
  const notifications: Notification[] = [];

  return {
    useNotifications: vi.fn(() => ({
      notifications,
      addNotification: vi.fn((notification) => {
        notifications.push({ id: 'mocked-id', ...notification });
      }),
      dismissNotification: vi.fn((id) => {
        const index = notifications.findIndex((n) => n.id === id);
        if (index !== -1) {
          notifications.splice(index, 1);
        }
      }),
    })),
  };
});


test('should add and remove notifications', () => {
  console.log(useNotifications)
  const { result } = renderHook(() => useNotifications());

  expect(result.current.notifications.length).toBe(0);

  const notification: Notification = {
    id: '123',
    title: 'Hello World',
    type: 'info',
    message: 'This is a notification',
  };

  act(() => {
    result.current.addNotification(notification);
  });

  expect(result.current.notifications).toContainEqual(notification);

  act(() => {
    result.current.dismissNotification(notification.id);
  });

  expect(result.current.notifications).not.toContainEqual(notification);
});
