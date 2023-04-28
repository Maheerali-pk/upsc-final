import { useRouter } from "next/router";
import { routes } from "../utils/utils";
import NavbarBase from "./NavbarBase";
import { icons } from "../utils/helpers";

interface NavbarProps {
   selectedItem: number;
}

const navbarItems: INavbarItem[] = [
   { text: "Home", url: "/", icon: icons.home },
   { text: "Dashbaord", url: "/company/dashboard", icon: icons.home },
   {
      text: "Post a job",
      url: "/company/post-job",
      icon: icons.home,
   },
   { text: "Messages", url: "/", icon: icons.home, badge: "10" },
];
const Navbar: React.FC<NavbarProps> = (props) => {
   const router = useRouter();

   const rightContent = (
      <div className="gap-4 hidden md:flex whitespace-nowrap items-center">
         <div>{icons.nofitficationWithDot}</div>
         <img
            src="/images/company-logo.png"
            className="rounded-full border-gray-200 border h-10 w-10 object-contain p-1"
         ></img>
      </div>
   );
   return (
      <NavbarBase
         selected={props.selectedItem}
         items={navbarItems}
         rightContent={rightContent}
      />
   );
};

export default Navbar;
