import Head from "next/head";
import PageWrapper from "../../../components/PageWrapper";
import ProfileSetupHeader from "../../../components/ProfileSetupHeader";
import SuccessMessage from "../../../components/SuccessMessage";
import { icons } from "../../../utils/helpers";
import Navbar from "../../../components/Navbar";

interface SuccessProps {}

const SuccessPage: React.FC<SuccessProps> = () => {
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>
         <div className="setup-wrapper">
            <ProfileSetupHeader
               text="Great! Your profile has been set up"
               icon={icons.success}
            ></ProfileSetupHeader>
         </div>
      </>
   );
};
const Success: React.FC = () => {
   return <PageWrapper Component={SuccessPage}></PageWrapper>;
};

export default Success;
