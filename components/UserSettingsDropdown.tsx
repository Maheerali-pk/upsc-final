import { useRouter } from "next/router";
import { icons } from "../utils/helpers";
import ProgressBar from "./ProgressBar";
import { routes } from "../utils/utils";

interface UserSettingsPopupProps {}
interface UserSettingDropdownItemProps {
   text: string;
   icon: JSX.Element;
   onClick: () => void;
}
const UserSettingDropdownItem: React.FC<UserSettingDropdownItemProps> = ({
   text,
   icon,
   onClick,
}) => {
   return (
      <div
         className="hover:bg-gray-50 p-2.5 flex items-center gap-3"
         onClick={onClick}
      >
         {icon}
         <div className="text-sm font-medium text-gray-700">{text}</div>
      </div>
   );
};

const UserSettingsDropdown: React.FC<UserSettingsPopupProps> = () => {
   const router = useRouter();
   const userSettingsDropdownItems: UserSettingDropdownItemProps[] = [
      {
         icon: icons.settingsDropdown.editProfile,
         text: "Edit Profile",
         onClick: () => {
            router.push(routes.company.editProfile);
         },
      },
      {
         icon: icons.settingsDropdown.settings,
         text: "Account Settings",
         onClick: () => {},
      },
      {
         icon: icons.settingsDropdown.help,
         text: "Help center",
         onClick: () => {},
      },
      {
         icon: icons.settingsDropdown.logout,
         text: "Logout",
         onClick: () => {
            localStorage.removeItem("loggedin");
            localStorage.removeItem("auth-token");
            router.push(routes.login);
         },
      },
   ];
   return (
      <div className="flex flex-col rounded-lg border border-gray-200 shadow-lg -bottom-6 right-0 translate-y-full  absolute bg-white w-60">
         <div className="flex px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
               {icons.settingsDropdown.loggedInUser}
               <div className="flex flex-col">
                  <div className="text-gray-700 text-sm font-semibold">
                     User name
                  </div>
                  <div className="text-gray-600 text-sm">test@gmail.com</div>
               </div>
            </div>
         </div>
         <div className="flex flex-col px-1.5 pt-2">
            {userSettingsDropdownItems.map((item) => (
               <UserSettingDropdownItem {...item}></UserSettingDropdownItem>
            ))}
            <div className="flex flex-col rounded-lg border border-gray-200 py-4 px-3 gap-2 my-3">
               <div className="text-gray-700 font-medium">
                  Profile level: 56%
               </div>
               <ProgressBar percentage={56}></ProgressBar>
               <div className="text-gray-500  text-xs whitespace-normal">
                  Fill in more details to boost your chances of getting hired
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserSettingsDropdown;
