import React from "react";
import "./TeamCards.scss";
import { IconButton } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool";
import Badge from "@mui/material/Badge";
import { io } from "socket.io-client";
import { apiPath } from "../../Constants";
import images from "./helperMethods/hasCode";

export default function TeamCards({ teamData, userId, otherTimers, room }) {
  const socket = io(apiPath);
  return (
    <div className="pomodoroPage">
      <div className="TeamMembers">
        {teamData.map((data) => {
          const index = data._id.toString().hashCode() % images.length;
          if (data._id !== userId) {
            return (
              <div className="flip-card" key={data._id}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div>
                      <div>
                        <Badge
                          color={otherTimers[data._id]?.time < 10 ? "primary" : "error"}
                          overlap="circular"
                          badgeContent=" "
                        >
                          <img
                            alt="profile"
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                            }}
                            src={images[index]}
                          />
                        </Badge>
                      </div>
                      <div>{data.name}</div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div>
                      {otherTimers[data._id]?.time < 10
                        ? otherTimers[data._id].time
                        : `${data.name} has finished ${data.sessionsCompleted} Pomodoros and currently has none in progress.`}
                    </div>
                    <div>
                      {otherTimers[data._id]?.time < 9 ? (
                        <IconButton
                          style={{
                            position: "absolute",
                            bottom: "5px",
                            right: "5px",
                            color: "white",
                          }}
                          onClick={() => socket.emit("helpUser", data._id, room, userId)}
                        >
                          <PanToolIcon />
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
