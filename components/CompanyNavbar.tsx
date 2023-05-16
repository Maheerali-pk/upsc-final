import { useRouter } from "next/router";
import { routes } from "../utils/utils";
import NavbarBase from "./NavbarBase";
import { icons } from "../utils/helpers";
import { useEffect, useRef, useState } from "react";
import UserSettingsDropdown from "./UserSettingsDropdown";

interface NavbarProps {
   selectedItem: number;
}

const navbarItems: INavbarItem[] = [
   { text: "Home", url: "/company/", icon: icons.home },
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
   const [userSettingsDropdownOpen, setUserSettingsDropdownOpen] = useState(false);
   const onClickOnUserProfileIcon = () => {
      setUserSettingsDropdownOpen(!userSettingsDropdownOpen);
   };
   const userSettingsIconRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      if (userSettingsDropdownOpen) {
         const onClickOutside = (e: MouseEvent) => {
            if (!userSettingsIconRef.current?.contains(e.target as HTMLElement)) setUserSettingsDropdownOpen(false);
         };
         window.addEventListener("click", onClickOutside);
         return () => {
            window.removeEventListener("click", onClickOutside);
         };
      }
   }, [userSettingsDropdownOpen]);
   const rightContent = (
      <div className="gap-4 hidden md:flex whitespace-nowrap items-center">
         <div>{icons.nofitficationWithDot}</div>
         <div
            onClick={() => setUserSettingsDropdownOpen(!userSettingsDropdownOpen)}
            className="relative w-10 h-10 cursor-pointer"
            ref={userSettingsIconRef}
         >
            <img
               src="/images/company-logo.png"
               className="rounded-full border-gray-200 border h-10 w-10 object-contain p-1"
            ></img>
            {userSettingsDropdownOpen && <UserSettingsDropdown></UserSettingsDropdown>}
         </div>
      </div>
   );
   return <NavbarBase selected={props.selectedItem} items={navbarItems} rightContent={rightContent} />;
};

export default Navbar;
