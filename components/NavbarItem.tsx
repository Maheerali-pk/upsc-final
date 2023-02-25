import { useEffect, useState } from "react";
import { icons } from "../utils/helpers";

const NavbarItem: React.FC<INavbarItem> = (item) => {
   const [open, setOpen] = useState(false);
   useEffect(() => {
      window.addEventListener("click", (e) => {
         const target = e.target as HTMLElement;
      });
   }, []);
   return (
      <div className="gap-2 px-4 md:px-0 py-2.5 md:py-0 text-gray-600 relative flex cursor-pointer items-center md:justify-start justify-between">
         <div
            onClick={() => setOpen(!open)}
            className=" font-semibold gap-4 flex"
         >
            <div className="md:hidden">{item.icon}</div>
            {item.text}
         </div>
         {item.subItems && icons.arrowDown}
         {/* {open && (
            <div className="flex flex-col absolute top-full p-3 bg-white border border-gray-100 shadow-md">
               {item.subItems?.map((subItem) => (
                  <div className="py-2">{subItem.text}</div>
               ))}
            </div>
         )} */}
      </div>
   );
};

export default NavbarItem;
