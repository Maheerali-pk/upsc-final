import { GlobalContextProvider } from "../contexts/GlobalContext";

interface PageWrapperProps {
   Component: React.FC;
   verifyAuth?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ Component, verifyAuth }) => {
   return (
      <GlobalContextProvider>
         <Component></Component>
      </GlobalContextProvider>
   );
};

export default PageWrapper;
