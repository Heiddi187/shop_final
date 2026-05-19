type LayoutProps = {
   children: React.ReactNode;
   sidebar?: React.ReactNode;
};

export function MainLayout({ children, sidebar }: LayoutProps) {
   return (
      <div className="min-h-screen bg-black text-white">
         <main className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
               <aside className="hidden lg:block">{sidebar}</aside>

               <section>{children}</section>
            </div>
         </main>
      </div>
   );
}
