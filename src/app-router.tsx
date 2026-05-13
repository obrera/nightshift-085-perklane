import { createBrowserRouter } from 'react-router'

import type { ShellNotFoundProps } from '@/shell/data-access/shell-not-found-props'

import { ShellFeature, ShellUiLoader } from '@/shell/feature'

export const appRouter = createBrowserRouter(
  [
    {
      children: [
        {
          index: true,
          lazy: () => import('@/features/perklane/feature/perklane-feature'),
        },
        {
          lazy: () => import('@/shell/feature/shell-not-found-feature'),
          loader: (): ShellNotFoundProps => ({
            links: [
              {
                description: 'Return to the loyalty stamp card and operator verifier.',
                title: 'PerkLane',
                to: '/',
              },
            ],
          }),
          path: '*',
        },
      ],
      element: <ShellFeature links={[{ label: 'Workbench', to: '/' }]} />,
      hydrateFallbackElement: <ShellUiLoader fullScreen />,
    },
  ],
  {
    // Set the base URL for router links and redirects, removing trailing slashes if present, independent of the base
    basename: import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
)
