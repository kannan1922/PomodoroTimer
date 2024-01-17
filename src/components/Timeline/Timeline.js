import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import TimerIcon from '@mui/icons-material/Timer';
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { timeLineDetails } from "../../recoil/timelineStore";
export default function CustomizedTimeline() {
  const [timeline, setTimeline] = useRecoilState(timeLineDetails);
  return (
    <div style={{ maxHeight: "500px", minWidth:"380px", overflow: "auto",scrollbarWidth: "thin", scrollbarColor: "#888 #eee" }}>
      <Timeline position="alternate">
        {timeline.map((val) => (
          <>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0", fontSize: "12px" }} // Adjusted font size
                align="right"
                variant="body2"
              >
                {val.startTime}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot style={{background:"#ff7473"}}>
                  <TimerIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "8px", px: 2 }}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ fontSize: "14px" }} // Adjusted font size
                >
                  {" "}
                  Focus
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {" "}
                  Embark on focused productivity!
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "12px 0", fontSize: "12px" }}
                variant="body2"
                color="text.secondary"
              >
                {val.endTime}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <TimerIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "20px", px: 2 }}>
                <Typography sx={{ fontSize: "12px" }}>
                  {" "}
                  {/* Adjusted font size */}
                  Completed!
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </>
        ))}
      </Timeline>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary">
              <RepeatIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ py: "10px", px: 2 }}>
            <Typography variant="h6" component="span" sx={{ fontSize: "12px" }}>
              {" "}
              {/* Adjusted font size */}
              Repeat
            </Typography>
            <Typography sx={{ fontSize: "10px" }}>
              {" "}
              {/* Adjusted font size */}
              Because this is the life you love!
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
