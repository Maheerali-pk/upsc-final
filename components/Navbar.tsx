import classNames from "classnames";
import { useState } from "react";
import { icons } from "../utils/helpers";
import NavbarItem from "./NavbarItem";

interface NavbarProps {}

const navbarItems: INavbarItem[] = [
   { text: "Home", url: "/", icon: icons.home },
   { text: "Products", url: "/", icon: icons.home },
   {
      text: "Home",
      url: "/",
      icon: icons.home,
      subItems: [
         { text: "Overview", url: "/" },
         { text: "Overview", url: "/" },
         { text: "Overview", url: "/" },
      ],
   },
   { text: "Home", url: "/", icon: icons.home },
   { text: "Home", url: "/", icon: icons.home },
];

const Navbar: React.FC<NavbarProps> = () => {
   const [open, setOpen] = useState(false);
   return (
      <div className="h-18 md:h-20 flex items-center px-4 lg:px-28 border-b border-b-gray-100 justify-between w-full">
         <div className="gap-10 flex w-full items-center">
            <img src="/images/logo.png"></img>
            <div className="gap-8 hidden md:flex w-full">
               {navbarItems.map((item) => (
                  <NavbarItem {...item}></NavbarItem>
               ))}
            </div>
         </div>
         <div className="gap-8 hidden md:flex whitespace-nowrap items-center">
            <div className="font-semibold text-gray-600 cursor-pointer">
               Log in
            </div>
            <div className="bg-primary-400 cursor-pointer rounded-lg text-white font-semibold py-2.5 px-3.5">
               Sign up
            </div>
         </div>
         <div
            className="cursor-pointer flex items-center md:hidden"
            onClick={() => setOpen(!open)}
         >
            {icons.menuBars}
         </div>
         <div
            className={classNames(
               "shadow-lg h-screen md:hidden z-10 top-0 transition-all ease-in time duration-300   bg-white fixed flex flex-col w-9/12 pt-4 px-2",
               { "left-0": open, "-left-full": !open }
            )}
         >
            <img
               src="/images/logo.png"
               className="mb-8 h-fit w-fit mx-4 "
            ></img>
            <div className="gap-1 flex flex-col w-full">
               {navbarItems.map((item) => (
                  <NavbarItem {...item}></NavbarItem>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
