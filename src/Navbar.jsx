import { useDispatch, useSelector } from "react-redux";

//Actions
import { setMode } from "./reducer/mode/modeSlice";

//Logos
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { mode, color } = useSelector((state) => state.mode);

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 border-b-2 ${color.navbarBorder} h-14 ${color.containerBackground} w-full`}
    >
      <div className={`text-xl font-bold ${color.greenText}`}>25 + 5 Clock</div>
      <div>
        <button
          onClick={() => dispatch(setMode())}
          className=" w-10 h-5 rounded-2xl bg-white flex items-center transition duration-300 focus:outline-none shadow"
        >
          <div
            className={`w-6 h-6 rounded-full transition duration-500 transform p-1 text-white ${
              mode
                ? "bg-yellow-500 -translate-x-2"
                : "bg-gray-700 translate-x-full"
            }`}
          >
            {mode ? <MdLightMode /> : <MdDarkMode />}
          </div>
        </button>
      </div>
    </div>
  );
};
