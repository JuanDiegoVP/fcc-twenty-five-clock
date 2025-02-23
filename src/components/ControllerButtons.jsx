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
    <div className="flex w-2xs justify-center gap-2.5 h-full p-3">
      <button
        className="cursor-pointer flex gap-1 items-center"
        onClick={() => {
          dispatch(setRunning());
        }}
      >
        <HiMiniPlayPause
          className={`text-6xl ${color.grayText} ${color.greenHover} ${color.componentBackground} rounded-md shadow w-20 h-14`}
        />
      </button>
      <button
        className="text-5xl cursor-pointer"
        onClick={() => dispatch(setReset({ reset: false }))}
      >
        <VscDebugRestart
          className={`${color.grayText} ${color.redHover} ${color.componentBackground} rounded-md shadow w-20 h-14`}
        />
      </button>
    </div>
  );
};
