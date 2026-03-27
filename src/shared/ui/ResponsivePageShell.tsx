import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const ResponsivePageShell = ({ children, title }: Props) => {
  return (
    <div
      className="
        min-h-screen 
        bg-gray-50 
        p-4 
        xs:p-5 
        sm:p-6 
        md:p-8 
        lg:p-10 
        xlg:p-12
      "
    >
      <div
        className="
          max-w-7xl 
          mx-auto 
          bg-white 
          rounded-xl 
          shadow-md 
          p-4 
          xs:p-5 
          sm:p-6 
          md:p-8
        "
      >
        {title && (
          <h1
            className="
              text-xl 
              xs:text-2xl 
              sm:text-3xl 
              md:text-4xl 
              font-bold 
              mb-4 
              md:mb-6
            "
          >
            {title}
          </h1>
        )}

        <div className="space-y-4 md:space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsivePageShell;