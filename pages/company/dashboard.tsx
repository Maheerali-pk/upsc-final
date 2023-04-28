import Head from "next/head";
import PageWrapper from "../../components/PageWrapper";
import CompanyNavbar from "../../components/CompanyNavbar";

interface DashboardProps {}

const DashboardContent: React.FC<DashboardProps> = () => {
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={1}></CompanyNavbar>
      </>
   );
};

const Dashboard: React.FC<DashboardProps> = () => {
   return <PageWrapper Component={DashboardContent}></PageWrapper>;
};
export default Dashboard;
