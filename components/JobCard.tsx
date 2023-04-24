interface ITag {
   text: string;
   icon: JSX.Element;
}
interface JobCardProps {
   title: string;
   subTitle: string;
   languages?: string[];
   exam?: string;
   skills?: string[];
   subjects?: string[];
   saved?: boolean;
   tags: ITag[];
}

const JobCard: React.FC<JobCardProps> = (props) => {
   return (
      <div className="md:p-6 md:pb-8 py-5 px-4">
         <div className="gap-1 flex flex-col pb-4 border-b border-b-gray-200">
            <div className="text-gray-900 text-lg font-semibold">
               {props.title}
            </div>
            <div className="text-sm text-gray-500 font-medium">
               {props.subTitle}
            </div>
         </div>
      </div>
   );
};

export default JobCard;
