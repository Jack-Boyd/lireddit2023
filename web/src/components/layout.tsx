import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <main className="flex justify-center h-screen">
      <div className="w-full md:max-w-2xl">
        {children}
      </div>
    </main>
  );
};

export default Layout;