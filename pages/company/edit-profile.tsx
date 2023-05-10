import Head from "next/head";
import PageWrapper from "../../components/PageWrapper";
import CompanyNavbar from "../../components/CompanyNavbar";

interface DashboardProps {}

const EditProfileContent: React.FC<DashboardProps> = () => {
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={-1}></CompanyNavbar>
         <div>Edit profile</div>
      </>
   );
};

const EditProfile: React.FC<DashboardProps> = () => {
   return <PageWrapper Component={EditProfileContent}></PageWrapper>;
};
export default EditProfile;
