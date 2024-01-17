import "../Message/message.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Message({ message, handleMessageDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="move">
        <button type="button" className="icon-button" onClick={handleClickOpen}>
          <span className="material-icons">notifications</span>
          <span className="icon-button__badge">{message.count}</span>
        </button>
        {/* <Button onClick={handleClickOpen}>
          <span className="msg-icn">
            <span
              style={{
                display: "inline-block",
                width: "30px",
                height: "30px",
                background: "black",
                color: "white",
                borderRadius: "50%",
                textAlign: "center",
                lineHeight: "30px",
              }}
            >
              {message.count}
            </span>
            {"  "}
            Help
          </span>
        </Button> */}
      </div>
      {message.data?.map((data) => {
        return (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            key={data._id}
          >
            <DialogTitle>{"List of requests"}</DialogTitle>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <DialogContentText
                  id="alert-dialog-slide-description"
                  style={{ textAlign: "left" }}
                >
                  {data.message}
                </DialogContentText>
                <div>
                  <Button onClick={() => handleMessageDelete(data._id)} style={{ color: "black" }}>
                    <DeleteForeverIcon />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
}

export default Message;
