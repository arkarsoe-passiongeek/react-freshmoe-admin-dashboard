import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RouterProvider, createMemoryRouter } from 'react-router';

import AppProvider from '@/app/provider';

import {
  createLayer as generateLayer,
  createUser as generateUser
} from './data-generators';
import { db } from './mocks/db';
import { hash } from './mocks/utils';

export const createUser = async (userProperties?: any) => {
  const user = generateUser(userProperties) as any;
  db.user.create({ ...user, password: hash(user.password) });
  return user;
};

export const createLayer = async (layerProperties?: any) => {
  const layer = generateLayer(layerProperties);
  const res = db.layer.create(layer);
  return res;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

export const renderApp = async (
  ui: any,
  { url = '/', path = '/', ...renderOptions }: Record<string, any> = {},
) => {

  const router = createMemoryRouter(
    [
      {
        path: path,
        element: ui,
      },
    ],
    {
      initialEntries: url ? ['/', url] : ['/'],
      initialIndex: url ? 1 : 0,
    },
  );

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: () => {
        return (
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        );
      },
      ...renderOptions,
    }),
  };

  // await waitForLoadingToFinish();

  return returnValue;
};

export * from '@testing-library/react';
export { rtlRender, userEvent };

