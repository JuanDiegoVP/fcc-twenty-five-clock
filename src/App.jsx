import { useRef, useState } from "react";
import { useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { HiMiniPlayPause } from "react-icons/hi2";
import { VscDebugRestart } from "react-icons/vsc";

function App() {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [sessionRunning, setSessionRunning] = useState(true);
  const [breakRunning, setBreakRunning] = useState(false);
  const [blength, setBlength] = useState(300);
  const [slength, setSlength] = useState(1500);

  const timer = useRef();
  const audio = document.getElementById("beep");

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((prev) => {
          if (prev === 0 && sessionRunning) {
            audio.play();
            setBreakRunning(true);
            setSessionRunning(false);
            setTime(blength);
          } else if (prev === 0 && breakRunning) {
            audio.play();
            setBreakRunning(false);
            setSessionRunning(true);
            setTime(slength);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer.current);
  });

  const handleReset = () => {
    setTime(1500);
    setRunning(false);
    setSessionRunning(true);
    setBreakRunning(false);
    setBlength(300);
    setSlength(1500);
    audio.pause();
    audio.currentTime = 0;
  };

  const handleBreakDecrement = () => {
    setBlength((prev) => {
      if (!running) {
        if (breakRunning) {
          if (prev > 60) {
            setTime(prev - 60);
            return prev - 60;
          }
        }
        if (sessionRunning) {
          if (prev > 60) {
            return prev - 60;
          }
        }
        return prev;
      }
      return prev;
    });
  };
  const handleBreakIncrement = () => {
    setBlength((prev) => {
      if (!running) {
        if (breakRunning) {
          if (prev < 3600) {
            setTime(prev + 60);
            return prev + 60;
          }
        }
        if (sessionRunning) {
          if (prev < 3600) {
            return prev + 60;
          }
        }
        return prev;
      }
      return prev;
    });
  };

  const handleSessionDecrement = () => {
    setSlength((prev) => {
      if (!running) {
        if (sessionRunning) {
          if (prev > 60) {
            setTime(prev - 60);
            return prev - 60;
          }
        }
        if (breakRunning) {
          if (prev > 60) {
            return prev - 60;
          }
        }
        return prev;
      }
      return prev;
    });
  };
  const handleSessionIncrement = () => {
    setSlength((prev) => {
      if (!running) {
        if (sessionRunning) {
          if (prev < 3600) {
            setTime(prev + 60);
            return prev + 60;
          }
        }
        if (breakRunning) {
          if (prev < 3600) {
            return prev + 60;
          }
        }
        return prev;
      }
      return prev;
    });
  };

  const format = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  return (
    <div className=" flex h-screen justify-center items-center bg-[#1c1c1c] font-montserrat">
      <div className="flex w-2xl h-96 flex-col items-center bg-[#242424]">
        <div className="flex items-center p-2 border-b-2 border-[#202020] h-14 bg-[#242424] w-full">
          <div className="text-xl font-bold text-[#31b95b]">25 + 5 Clock</div>
        </div>
        <div className="flex justify-between w-full p-3">
          <div className="flex flex-col items-center justify-center w-2xs h-20 bg-[#303030] rounded-md shadow">
            <div className="text-[#efefef] font-semibold">Break Length</div>
            <div className="flex gap-5">
              <button
                className="text-xl cursor-pointer"
                onClick={handleBreakDecrement}
              >
                <FaArrowDown className="text-[#6c6c6c] hover:text-[#31b95b]" />
              </button>
              <div className="text-[#32acdb] font-medium">
                {Math.floor(blength / 60)}
              </div>
              <button
                className="text-xl cursor-pointer"
                onClick={handleBreakIncrement}
              >
                <FaArrowUp className="text-[#6c6c6c] hover:text-[#31b95b]" />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-2xs h-20 bg-[#303030] rounded-md shadow">
            <div className="text-[#efefef] font-semibold">Session Length</div>
            <div className="flex gap-5">
              <button
                className="text-xl cursor-pointer"
                onClick={handleSessionDecrement}
              >
                <FaArrowDown className="text-[#6c6c6c] hover:text-[#31b95b]" />
              </button>
              <div className="text-[#32acdb] font-medium">
                {Math.floor(slength / 60)}
              </div>
              <button
                className="text-xl cursor-pointer"
                onClick={handleSessionIncrement}
              >
                <FaArrowUp className="text-[#6c6c6c] hover:text-[#31b95b]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center h-full w-xl rounded-md shadow justify-center text-4xl my-2 bg-[#303030]">
          <div className="text-[#efefef] font-bold ">
            {breakRunning ? "Break" : "Session"}
          </div>
          <div
            className={`text-[#6c6c6c] font-semibold ${
              running && "text-[#32acdb]"
            }`}
          >
            {format(time)}
          </div>
        </div>

        <div className="flex w-2xs justify-center gap-2.5 h-full p-3">
          <button
            className="cursor-pointer flex gap-1 items-center"
            onClick={() => {
              if (running) clearInterval(timer.current);
              setRunning(!running);
            }}
          >
            <HiMiniPlayPause className="text-6xl text-[#6c6c6c] hover:text-[#31b95b] bg-[#303030] rounded-md shadow w-20 h-14" />
          </button>
          <button className="text-5xl cursor-pointer" onClick={handleReset}>
            <VscDebugRestart className="text-[#6c6c6c] hover:text-[#b93131] bg-[#303030] rounded-md shadow w-20 h-14" />
          </button>
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </div>
  );
}

export default App;
