import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

//Redux Actions
import {
  setBreakDecrement,
  setBreakIncrement,
  setSessionDecrement,
  setSessionIncrement,
} from "../reducer/timer/timerSlice";

export const BreakSessionLength = () => {
  //Redux
  const dispatch = useDispatch();
  const { color } = useSelector((state) => state.mode);
  const { blength, slength } = useSelector((state) => state.timer);

  return (
    <div className="flex items-center lg:justify-between justify-center w-full p-3">
      <div
        className={`flex flex-col items-center justify-center lg:w-2xs  sm:w-60 w-40 sm:h-20 h-14 mr-4 ${color.componentBackground} rounded-md shadow`}
      >
        <div className={`${color.mainText} font-semibold max-[350px]:text-[12px] max-[640px]:text-[14px]`}>Break Length</div>
        <div className="flex gap-5">
          <button
            className="text-xl cursor-pointer"
            onClick={() => dispatch(setBreakDecrement())}
          >
            <FaArrowDown className={`${color.grayText} ${color.greenHover}`} />
          </button>
          <div className={`${color.blueText} font-medium`}>
            {Math.floor(blength / 60)}
          </div>
          <button
            className="text-xl cursor-pointer"
            onClick={() => dispatch(setBreakIncrement())}
          >
            <FaArrowUp className={`${color.grayText} ${color.greenHover}`} />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col items-center justify-center lg:w-2xs sm:w-60 w-40 sm:h-20 h-14 ml-4 ${color.componentBackground} rounded-md shadow`}
      >
        <div className={`${color.mainText} font-semibold max-[350px]:text-[12px] max-[640px]:text-[14px]`}>Session Length</div>
        <div className="flex gap-5">
          <button
            className="text-xl cursor-pointer"
            onClick={() => dispatch(setSessionDecrement())}
          >
            <FaArrowDown className={`${color.grayText} ${color.greenHover}`} />
          </button>
          <div className={`${color.blueText} font-medium`}>
            {Math.floor(slength / 60)}
          </div>
          <button
            className="text-xl cursor-pointer"
            onClick={() => dispatch(setSessionIncrement())}
          >
            <FaArrowUp className={`${color.grayText} ${color.greenHover}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
