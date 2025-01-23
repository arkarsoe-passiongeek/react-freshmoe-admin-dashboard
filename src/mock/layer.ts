import { getSlug } from '@/lib/utils';

export const getLayersArr = (layers = []) => {
   return layers.map(each => getSlug(each.name));
};

export const data = [
   {
      id: 1,
      name: 'Background',
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z',
   },
   {
      id: 2,
      name: 'Foreground',
      createdAt: '2025-01-02T12:00:00Z',
      updatedAt: '2025-01-03T14:00:00Z',
   },
   {
      id: 3,
      name: 'Shadows',
      createdAt: '2025-01-03T15:00:00Z',
      updatedAt: '2025-01-03T15:30:00Z',
   },
   {
      id: 4,
      name: 'Highlights',
      createdAt: '2025-01-04T08:00:00Z',
      updatedAt: '2025-01-05T09:00:00Z',
   },
   {
      id: 5,
      name: 'Midtones',
      createdAt: '2025-01-05T10:00:00Z',
      updatedAt: '2025-01-05T10:00:00Z',
   },
];
