import { ReactNode } from "react";
import NavBar from '@/components/navbar'

interface LayoutProps {
  children: ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <NavBar/>
      <main className="flex justify-center h-screen">    
        <div className="w-full md:max-w-2xl">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;