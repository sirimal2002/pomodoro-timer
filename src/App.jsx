import { useEffect, useState } from "react";
import { Timer, Play, Pause, RotateCcw, CircleX } from "lucide-react";

function App() {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work"); // work, shortBreak, longBreak
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let interval = 0;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            const audio = new Audio("/bugle_tune.wav");
            audio.play();

            // Handle cycle completion
            if (mode === "work") {
              setCycles((c) => c + 1);
              if ((cycles + 1) % 4 === 0) {
                setMode("longBreak");
                setMinutes(15);
              } else {
                setMode("shortBreak");
                setMinutes(5);
              }
            } else {
              setMode("work");
              setMinutes(25);
            }
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 10);
    }
    console.log(interval);

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode, cycles]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "work") {
      setMinutes(25);
    } else if (mode === "shortBreak") {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
    setSeconds(0);
  };

  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setSeconds(0);
    if (newMode === "work") {
      setMinutes(25);
    } else if (newMode === "shortBreak") {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
  };

  const reload = () => {
    setCycles(0);
    resetTimer();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-900  to-violet-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-center mb-8">
          <Timer className="w-8 h-8 text-white mr-2" />
          <h1 className="text-3xl font-bold text-white">Pomodoro Timer</h1>
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => switchMode("work")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              mode === "work"
                ? "bg-white text-purple-900 shadow-lg scale-105"
                : "text-white hover:bg-white/20"
            }`}
          >
            Work
          </button>
          <button
            onClick={() => switchMode("shortBreak")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              mode === "shortBreak"
                ? "bg-white text-purple-900 shadow-lg scale-105"
                : "text-white hover:bg-white/20"
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => switchMode("longBreak")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              mode === "longBreak"
                ? "bg-white text-purple-900 shadow-lg scale-105"
                : "text-white hover:bg-white/20"
            }`}
          >
            Long Break
          </button>
        </div>

        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-6xl font-bold text-white">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </div>
              <div className="text-white/80 capitalize">
                {mode.replace(/([A-Z])/g, " $1").trim()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="bg-white text-purple-900 rounded-full p-4 hover:bg-white/90 transition-all duration-300 shadow-lg hover:scale-105"
          >
            {isActive ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <button className="bg-white/10 text-white rounded-full p-4 hover:bg-white/20 transition-all duration-300">
            <RotateCcw onClick={resetTimer} className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <div className="text-center text-white/80">
            Completed Cycles: {cycles}
          </div>
          <button className="text-white/50 transition-all duration-300">
            <CircleX onClick={reload} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
