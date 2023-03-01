interface AuthPageWrapperProps {
   icon: JSX.Element;
   heading: string;
   subHeading: JSX.Element | string;

   children: React.ReactNode;
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
   icon,
   heading,
   subHeading,
   children,
}) => {
   return (
      <div className="flex justify-center w-full">
         <div className="flex flex-col md:w-90 w-full items-center h-full pt-12 md:pt-24 px-4 ">
            <div className="mb-6">{icon}</div>
            <div className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3">
               {heading}
            </div>
            <div className="mb-8 text-gray-600 text-center whitespace-nowrap">
               {subHeading}
            </div>
            {children}
         </div>
      </div>
   );
};

export default AuthPageWrapper;
