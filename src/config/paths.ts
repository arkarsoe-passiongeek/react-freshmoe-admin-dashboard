export const paths = {
   root: {
      path: '/',
      getHref: () => '/',
   },
   auth: {
      login: {
         path: '/auth/login',
         getHref: (_redirectTo: string) => '/auth/login',
      },
   },
   layer: {
      path: '/service-parameter/layer',
      getHref: () => '/service-parameter/layer',
      create: {
         path: '/service-parameter/layer/create',
         getHref: () => '/service-parameter/layer/create',
      },
      edit: {
         path: '/service-parameter/layer/:id/edit',
         getHref: (id: string) => `/service-parameter/layer/${id}/edit`,
      },
      view: {
         path: '/service-parameter/layer/:id/view',
         getHref: (id: string) => `/service-parameter/layer/${id}/view`,
      },
   },
   serviceType: {
      path: '/service-type',
      getHref: () => '/service-type',
      create: {
         path: '/service-type/create',
         getHref: () => '/service-type/create',
      },
      edit: {
         path: '/service-type/:id/edit',
         getHref: (id: string) => `/service-type/${id}/edit`,
      },
      view: {
         path: '/service-type/:id/view',
         getHref: (id: string) => `/service-type/${id}/view`,
      },
   },
   serviceArea: {
      path: '/service-parameter/service-area',
      getHref: () => '/service-parameter/service-area',
      create: {
         path: '/service-parameter/service-area/create',
         getHref: () => '/service-parameter/service-area/create',
      },
      edit: {
         path: '/service-parameter/service-area/:id/edit',
         getHref: (id: string) => `/service-parameter/service-area/${id}/edit`,
      },
      view: {
         path: '/service-parameter/service-area/:id/view',
         getHref: (id: string) => `/service-parameter/service-area/${id}/view`,
      },
   },
   profile: {
      path: '/profile',
      getHref: () => '/profile',
      changePassword: {
         path: '/profile/change-password',
         getHref: () => '/profile/change-password',
      },
   },
   notAuthorized: {
      path: '/not-authorized',
      getHref: () => '/not-authorized',
   },
   notFound: {
      path: '*',
      getHref: () => '*',
   },
} as const;
