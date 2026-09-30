import { createRootRoute, Outlet, HeadContent, Navigate } from '@tanstack/react-router'

import { Header } from '../components/Header';
import DataExplainer from '@/components/dataExplainer';
import LoadingOverlay from '@/components/loadingOverlay';

const RootComponent = () => {
  return (
    <>

      <HeadContent />
      <LoadingOverlay />
      <DataExplainer />
      <Header />
      <Outlet />
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <Navigate to="/" />
})
