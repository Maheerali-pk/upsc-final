import Head from "next/head";
import PageWrapper from "../../components/PageWrapper";
import CompanyNavbar from "../../components/CompanyNavbar";
import PrivateRoute from "../../components/PrivateRoute";

interface DashboardProps {}

const HomeContent: React.FC<DashboardProps> = () => {
   return (
      <PrivateRoute purpose="COMPANY">
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={0}></CompanyNavbar>
      </PrivateRoute>
   );
};

const Home: React.FC<DashboardProps> = () => {
   return <PageWrapper Component={HomeContent}></PageWrapper>;
};
export default Home;
