import Head from "next/head";
import PageWrapper from "../../components/PageWrapper";
import CompanyNavbar from "../../components/CompanyNavbar";

interface DashboardProps {}

const HomeContent: React.FC<DashboardProps> = () => {
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={0}></CompanyNavbar>
      </>
   );
};

const Home: React.FC<DashboardProps> = () => {
   return <PageWrapper Component={HomeContent}></PageWrapper>;
};
export default Home;
