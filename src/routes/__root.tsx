import { createRootRoute, createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Header } from '../components/Header';

const RootComponent = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export const Route = createRootRoute({ component: RootComponent })
