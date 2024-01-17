import { useEffect, useState } from "react";
import PomodoroClock from "../../components/PomodoroClock/PomodoroClock.js";
import CustomizedTimeline from "../../components/Timeline/Timeline.js";
import "./bgcolor.scss";
import PomodoroCard from "../../components/TeamCards/TeamCards.js";
import { useNavigate } from "react-router-dom";
import teamService from "../../api/team/index.js";
import { useRecoilState } from "recoil";
import { timeLineDetails } from "../../recoil/timelineStore.js";
import timerService from "../../api/timeline/index.js";
import { io } from "socket.io-client";
import { apiPath } from "../../Constants.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Message from "../../components/Message/message.js";
import helpMessageService from "../../api/helpMessage/index.js";

function DashBoard() {
  const nav = useNavigate();
  const room = localStorage.getItem("teamName");
  const userId = localStorage.getItem("id");
  const [teamData, setTeamData] = useState([]);
  const [_timeline, setTimeline] = useRecoilState(timeLineDetails);
  const [timers, setTimers] = useState({});
  const [otherTimers, setOtherTimers] = useState({});
  const [run, setRun] = useState(JSON.parse(localStorage.getItem(`isRun_${userId}`)) || false);
  const [helpMessage, setHelpMessage] = useState(null);
  const [message, setMessage] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMounting, setIsMounting] = useState(true);
  const [swapBreak, setSwapBreak] = useState(() => {
    const storedSwapBreak = localStorage.getItem(`swapBreak_${userId}`);
    return storedSwapBreak !== null ? JSON.parse(storedSwapBreak) : true;
  });

  //Handle Functions

  const handleIcon = () => {
    if (run) {
      io(apiPath).emit("pause", room, userId);
    } else {
      io(apiPath).emit("startOrResume", room, userId, swapBreak);
    }
    setRun(!run);
  };

  const handleLogout = () => {
    localStorage.removeItem("teamName");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    nav("/");
  };

  const handleMessageDelete = async (id) => {
    try {
      await helpMessageService.deleteMessage(id);
      await fetchMessages();
    } catch (error) {
      console.log("Error in handleMessageDelete() at Dashboard");
    }
  };

  //Fetch Functions

  const fetchTeam = async () => {
    try {
      const response = await teamService.getTeamDetails(userId);
      setTeamData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTimeLine = async () => {
    try {
      const response = await timerService.getTimeLineDetails(userId);
      setTimeline(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const socketData = async (breakData) => {
    try {
      const socket = io(apiPath);
      socket.emit("joinRoom", room, userId, breakData);

      socket.on("connect", () => {
        console.log("connected to socket");
      });

      socket.on("onlineUsers", (users) => {});

      socket.on("timer", (data) => {
        if (data.id === userId) {
          setTimers((prevTimers) => {
            return {
              ...prevTimers,
              [data.id]: data.time,
            };
          });
          if (data.time === 9 || data.time === 10) {
            fetchTimeLine();
          }
          if (data.time === 0) {
            setRun(false);
          }
        }
        if (data.id !== userId) {
          setOtherTimers((prevTimers) => ({
            ...prevTimers,
            [data.id]: {
              time: data.time,
              online: true,
            },
          }));
        }
      });

      socket.on("disconnect", (data) => {
        setOtherTimers((prevTimers) => ({
          ...prevTimers,
          [data.id]: {
            time: prevTimers[data.id] ? prevTimers[data.id].time : 0,
            online: false,
          },
        }));
      });

      socket.on("privateMessage", async (data) => {
        if (data.toUser === userId) {
          setHelpMessage(data?.message);
          setIsDialogOpen(true);
          await fetchMessages();
        }
      });

      if (timers < 0) {
        socket.on("disconnect", (data) => {
          setOtherTimers((prevTimers) => ({
            ...prevTimers,
            [data.id]: {
              time: prevTimers[data.id] ? prevTimers[data.id].time : 0,
              online: false,
            },
          }));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await helpMessageService.getHelpMessage(userId);
      setMessage(response);
    } catch (error) {
      console.log("Error in fetchMessages() at DashBoard.js", error);
    }
  };

  //useEffects

  useEffect(() => {
    if (isMounting) {
      socketData(swapBreak);
      setIsMounting(false);
    }
    fetchTeam();
    fetchMessages();
  }, []);

  useEffect(() => {
    localStorage.setItem(`isRun_${userId}`, JSON.stringify(run));
    localStorage.setItem(`swapBreak_${userId}`, JSON.stringify(swapBreak));
    fetchTimeLine();
  }, [run, swapBreak, userId]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "40px",
            margin: "0 auto",
          }}
        >
          <span className="pom-title">POMODORO</span>
          <span className="timer-title"> TIMER</span>
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          <ExitToAppIcon
            style={{
              fontSize: "30px",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      </div>

      <div className="displayFlex">
        <div>
          <CustomizedTimeline />
        </div>
        <div
          style={{ width: "50%", display: "flex", justifyContent: "center" }}
          className="PomoClock"
        >
          <PomodoroClock
            timers={timers}
            handleIcon={handleIcon}
            run={run}
            apiPath={apiPath}
            room={room}
            userId={userId}
            fetchTimeLine={fetchTimeLine}
            socketData={socketData}
            swapBreak={swapBreak}
            setSwapBreak={setSwapBreak}
          />
          <div>
            {" "}
            <Message message={message} handleMessageDelete={handleMessageDelete} />
          </div>

          <div>
            <Snackbar
              open={isDialogOpen}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={() => setIsDialogOpen(false)}
            >
              <MuiAlert
                onClose={() => setIsDialogOpen(false)}
                severity="info"
                elevation={6}
                variant="filled"
              >
                {helpMessage}
              </MuiAlert>
            </Snackbar>
          </div>
        </div>
        <div>
          <PomodoroCard teamData={teamData} userId={userId} otherTimers={otherTimers} room={room} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
