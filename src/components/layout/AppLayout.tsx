import type { ReactNode } from 'react';

// import { AppNavigation } from '../common/AppNavigation';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({
  children,
}: AppLayoutProps) => {
  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* <AppNavigation /> */}

        {children}
      </div>
    </main>
  );
};