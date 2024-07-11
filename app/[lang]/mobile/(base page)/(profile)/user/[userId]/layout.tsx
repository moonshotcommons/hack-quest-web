export default function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full bg-neutral-off-white">
      <div className="h-20 w-full bg-[url('/images/profile/profile-bg.png')] bg-cover bg-no-repeat grayscale-[50%]" />
      {children}
    </div>
  );
}
