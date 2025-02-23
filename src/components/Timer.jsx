import { useSelector } from "react-redux";

//Redux Actions

export const Timer = () => {
  //Redux
  const { running, time, breakRunning } = useSelector((state) => state.timer);
  const { color } = useSelector((state) => state.mode);

  const format = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  return (
    <div
      className={`flex flex-col items-center h-full lg:w-xl md:w-md sm:w-xs w-64 rounded-md shadow justify-center text-4xl my-2 ${color.componentBackground}`}
    >
      <div className={`${color.mainText} font-bold`}>
        {breakRunning ? "Break" : "Session"}
      </div>
      <div
        className={`font-semibold ${running ? color.blueText : color.grayText}`}
      >
        {format(time)}
      </div>
    </div>
  );
};
