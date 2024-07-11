export default function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-white">
      {/* <div className="mx-auto max-w-5xl">{children}</div> */}
      {children}
    </div>
  );
}
