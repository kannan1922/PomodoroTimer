import React from "react";
import "../PomodoroClock/clock.scss";
import { io } from "socket.io-client";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

function PomodoroClock({
  timers,
  handleIcon,
  run,
  apiPath,
  room,
  userId,
  fetchTimeLine,
  socketData,
  swapBreak,
  setSwapBreak,
}) {
  return (
    <>
      <div className={swapBreak ? "pomodoro session" : "pomodoro break"}>
        <div className="status">{swapBreak ? "session" : "break"}</div>
        {Object.entries(timers).map(([id, time]) => {
          const minutes = Math.floor(time / 60);
          const seconds = time % 60;
          return (
            <div key={id} className="timer">
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
            </div>
          );
        })}
        <button className="button" id="toggle" onClick={handleIcon}>
          {run ? (
            <PauseIcon style={{ position: "relative", top: "6px" }} />
          ) : (
            <PlayCircleFilledWhiteIcon style={{ position: "relative", top: "6px" }} />
          )}
        </button>
        <button
          disabled={run}
          className={`button ${run ? "disabled" : ""}`}
          id="toggle"
          onClick={() => io(apiPath).emit("reset", room, userId, swapBreak)}
        >
          <RestartAltIcon
            style={{ position: "relative", top: "6px" }}
            onClick={() =>
              setTimeout(() => {
                fetchTimeLine();
              }, 1000)
            }
          />
        </button>
        <button
          disabled={run}
          className={`button ${run ? "disabled" : ""}`}
          id="toggle"
          onClick={() => {
            setSwapBreak(!swapBreak);
            socketData(!swapBreak);
          }}
        >
          <SwapHorizIcon style={{ position: "relative", top: "6px" }} />
        </button>
      </div>
    </>
  );
}

export default PomodoroClock;
