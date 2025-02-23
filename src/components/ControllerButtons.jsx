import { useDispatch, useSelector } from "react-redux";
import { HiMiniPlayPause } from "react-icons/hi2";
import { VscDebugRestart } from "react-icons/vsc";

//Redux Actions
import { setRunning, setReset } from "../reducer/timer/timerSlice";

export const ControllerButtons = () => {
  //Redux
  const dispatch = useDispatch();
  const { color } = useSelector((state) => state.mode);

  return (
    <div className="flex w-2xs justify-center gap-2.5 h-20 p-3">
      <button
        className="cursor-pointer flex items-center"
        onClick={() => {
          dispatch(setRunning());
        }}
      >
        <HiMiniPlayPause
          className={`text-6xl ${color.grayText} ${color.greenHover} ${color.componentBackground} rounded-md shadow h-16 w-28 `}
        />
      </button>
      <button
        className="cursor-pointer flex items-center"
        onClick={() => dispatch(setReset({ reset: false }))}
      >
        <VscDebugRestart
          className={`${color.grayText} ${color.redHover} ${color.componentBackground} rounded-md shadow  h-16 w-28`}
        />
      </button>
    </div>
  );
};
