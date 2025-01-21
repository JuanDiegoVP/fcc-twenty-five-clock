import { useRef, useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { FaArrowDown, FaArrowUp, FaPause, FaPlay } from "react-icons/fa";
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
    <div className="main-container">
      <div className="app-container">
        <div className="title">25 + 5 Clock</div>

        <div className="length-container">
          <div className="labels-container">
            <div id="break-label">Break Length</div>
            <div className="number-elements">
              <button onClick={handleBreakDecrement} id="break-decrement">
                <FaArrowDown />
              </button>
              <div id="break-length">{Math.floor(blength / 60)}</div>
              <button onClick={handleBreakIncrement} id="break-increment">
                <FaArrowUp />
              </button>
            </div>
          </div>
          <div className="labels-container">
            <div id="session-label">Session Length</div>
            <div className="number-elements">
              <button onClick={handleSessionDecrement} id="session-decrement">
                <FaArrowDown />
              </button>
              <div id="session-length">{Math.floor(slength / 60)}</div>
              <button onClick={handleSessionIncrement} id="session-increment">
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>

        <div className="session-time-container">
          <div id="timer-label">{breakRunning ? "Break" : "Session"}</div>
          <div id="time-left">{format(time)}</div>
        </div>

        <div className="timer-control-container">
          <button
            onClick={() => {
              if (running) clearInterval(timer.current);
              setRunning(!running);
            }}
            id="start_stop"
          >
            <FaPlay /> <FaPause />
          </button>
          <button className="reset" onClick={handleReset} id="reset">
            <VscDebugRestart />
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
