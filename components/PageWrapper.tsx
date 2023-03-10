import { GlobalContextProvider } from "../contexts/GlobalContext";

interface PageWrapperProps {
   Component: React.FC;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ Component }) => {
   return (
      <GlobalContextProvider>
         <Component></Component>
      </GlobalContextProvider>
   );
};

export default PageWrapper;
