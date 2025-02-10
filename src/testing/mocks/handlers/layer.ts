import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import { networkDelay, requireAdmin } from '../utils';

type LayerBody = {
   title: string;
};

export const layersHandlers = [
   http.get(`${env.API_URL}/layers`, async ({ cookies, request }) => {
      console.log('here');
      await networkDelay();
      try {
         // const { user, error } = requireAuth(cookies);
         // if (error) {
         //   return HttpResponse.json({ message: error }, { status: 401 });
         // }

         console.log(db);

         const url = new URL(request.url);

         const page = Number(url.searchParams.get('page') || 1);

         const total = db.layer?.count?.() ?? 0;

         const totalPages = Math.ceil(total / 10);

         const result = db.layer.findMany({
            take: 10,
            skip: 10 * (page - 1),
         });
         return HttpResponse.json({
            data: result,
            meta: {
               page,
               total,
               totalPages,
            },
         });
      } catch (error: any) {
         return HttpResponse.json(
            { message: error?.message || 'Server Error' },
            { status: 500 },
         );
      }
   }),

   http.get(`${env.API_URL}/layers/:layerId`, async ({ params, cookies }) => {
      await networkDelay();

      try {
         // const { error } = requireAuth(cookies);
         // if (error) {
         //   return HttpResponse.json({ message: error }, { status: 401 });
         // }
         const layerId = params.layerId as string;
         const layer = db.layer.findFirst({
            where: {
               id: {
                  equals: layerId,
               },
            },
         });

         if (!layer) {
            return HttpResponse.json(
               { message: 'Layer not found' },
               { status: 404 },
            );
         }

         const result = {
            ...layer,
         };

         return HttpResponse.json({ data: result });
      } catch (error: any) {
         return HttpResponse.json(
            { message: error?.message || 'Server Error' },
            { status: 500 },
         );
      }
   }),

   http.post(`${env.API_URL}/layers`, async ({ request, cookies }) => {
      await networkDelay();

      try {
         // const { error } = requireAuth(cookies);
         // if (error) {
         //   return HttpResponse.json({ message: error }, { status: 401 });
         // }
         const data = (await request.json()) as LayerBody;

         const result = db.layer.create(data);
         await persistDb('layer');
         return HttpResponse.json(result);
      } catch (error: any) {
         return HttpResponse.json(
            { message: error?.message || 'Server Error' },
            { status: 500 },
         );
      }
   }),

   http.post(
      `${env.API_URL}/layers/:layerId`,
      async ({ request, params, cookies }) => {
         await networkDelay();

         try {
            // const { user, error } = requireAuth(cookies);
            // if (error) {
            //   return HttpResponse.json({ message: error }, { status: 401 });
            // }
            const data = (await request.json()) as LayerBody;
            const layerId = params.layerId as string;
            requireAdmin(user);
            const result = db.layer.update({
               where: {
                  id: {
                     equals: layerId,
                  },
               },
               data,
            });
            await persistDb('layer');
            return HttpResponse.json(result);
         } catch (error: any) {
            return HttpResponse.json(
               { message: error?.message || 'Server Error' },
               { status: 500 },
            );
         }
      },
   ),

   http.delete(
      `${env.API_URL}/layers/:layerId`,
      async ({ cookies, params }) => {
         await networkDelay();

         try {
            // const { user, error } = requireAuth(cookies);
            // if (error) {
            //   return HttpResponse.json({ message: error }, { status: 401 });
            // }
            const layerId = params.layerId as string;
            requireAdmin(user);
            const result = db.layer.delete({
               where: {
                  id: {
                     equals: layerId,
                  },
               },
            });
            await persistDb('layer');
            return HttpResponse.json(result);
         } catch (error: any) {
            return HttpResponse.json(
               { message: error?.message || 'Server Error' },
               { status: 500 },
            );
         }
      },
   ),
];
