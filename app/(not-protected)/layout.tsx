import React from 'react';
import NavbarOrigin from '@/features/home/components/navbar/navbar-origin';

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NavbarOrigin />
      <main className={'@container/main mb-20'}>{children}</main>
    </>
  );
};

export default HomeLayout;
