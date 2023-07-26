import classNames from "classnames";
import { useGlobalContext } from "../contexts/GlobalContext";
import { icons } from "../utils/helpers";

const Alert: React.FC = () => {
   const [state, dispatch] = useGlobalContext();

   return (
      <div
         className={classNames(
            "flex items-center rounded-xl bg-primary-25 gap-2 py-3 px-4 border transition-all duration-300 border-primary-300 w-fit absolute  left-1/2 -translate-x-1/2",
            { "-top-32": !Boolean(state.alert), "top-14": Boolean(state.alert) }
         )}
      >
         {icons.checkCircle}
         <div className="text-primary-400 font-semibold mr-2">
            {state.alert?.text || ""}
         </div>
         <button className="btn btn-primary btn-sm w-fit">Undo</button>
      </div>
   );
};

export default Alert;
