import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import {
  networkDelay
} from '../utils';

export const authHandlers = [

  http.get(`${env.API_URL}/profile`, async () => {
    await networkDelay();

    try {
      return HttpResponse.json({
        data: {
          "id": 1,
          "email": "admin@freshmoe.com",
          "name": "admin",
        }
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
