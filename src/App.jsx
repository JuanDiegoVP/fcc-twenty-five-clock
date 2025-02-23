import { useEffect, useRef } from "react";
import { BreakSessionLength } from "./components/BreakSessionLength";
import { Navbar } from "./Navbar";
import { useDispatch, useSelector } from "react-redux";

//Redux Actions
import { setTime } from "./reducer/timer/timerSlice";
import { Timer } from "./components/Timer";
import { ControllerButtons } from "./components/ControllerButtons";

function App() {
  const timer = useRef();
  const audio = document.getElementById("beep");

  //Redux
  const dispatch = useDispatch();
  const { running, play, pause } = useSelector((state) => state.timer);
  const { color } = useSelector((state) => state.mode);

  if (play) {
    audio.play();
  }

  if (pause) {
    audio.pause();
    audio.currentTime = 0;
  }

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        dispatch(setTime());
      }, 1000);
    }

    return () => clearInterval(timer.current);
  });

  //Add mobile responsiveness

  return (
    <div
      className={`flex h-screen justify-center items-center transition-colors ${color.pageBackground} font-montserrat`}
    >
      <div
        className={`flex w-2xl h-96 flex-col items-center ${color.containerBackground}`}
      >
        <Navbar />
        <BreakSessionLength />
        <Timer />
        <ControllerButtons />

        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </div>
  );
}

export default App;
