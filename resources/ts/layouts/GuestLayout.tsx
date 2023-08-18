import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface GuestLayoutProps {
  children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray pt-6 sm:justify-center sm:pt-0">
      <div className="mt-6">
        <Link href="/">
          <h1 className="text-center text-3xl font-bold text-graydark sm:max-w-md">
            Insurance Management Website
          </h1>
        </Link>
      </div>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
