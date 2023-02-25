interface INavbarItem {
   text: string;
   url?: string;
   icon: JSX.Element;
   subItems?: INavbarSubItem[];
}
interface INavbarSubItem {
   text: string;
   url: string;
}
