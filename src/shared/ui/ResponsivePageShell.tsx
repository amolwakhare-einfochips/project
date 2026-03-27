type Props = {
  children: React.ReactNode;
};

const ResponsivePageShell = ({ children }: Props) => {
  return (
    <div className="px-4 py-4 xs:px-4 sm:px-6 md:px-10 lg:px-16 xlg:px-24">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default ResponsivePageShell;