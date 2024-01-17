import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import { InputBase } from "@mui/material";
import userService from "../../api/auth";
import Button from "@mui/material/Button";
import "./login.scss";
import { useNavigate } from "react-router";
import { useState } from "react";
const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      fetchData(values);
    },
  });
  const [show, setShow] = useState(false);
  const fetchData = async (values) => {
    try {
      const response = await userService.getLoginDetails(values);
      localStorage.setItem("teamName", response.teamName);
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.userId);
      setShow(false);
      if (response) navigate("/clock");
    } catch (error) {
      console.log(error);
      setShow(true);
    }
  };

  const navigate = useNavigate();

  return (
    <div style={{ width: "75%" }}>
      <form onSubmit={formik.handleSubmit}>
        <InputLabel className="inputLabel">Email</InputLabel>
        <InputBase
          style={{ padding: "0px 10px" }}
          id="email"
          name="email"
          type="email"
          className="inputBase"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <InputLabel className="inputLabel">Password</InputLabel>
        <InputBase
          style={{ padding: "0px 10px" }}
          id="password"
          name="password"
          type="text"
          className="inputBase"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {show && (
          <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            Invalid Credentials
          </div>
        )}
        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#383838",
            borderColor: "transparent",
            width: "100%",
            height: "50px",
            marginTop: "15px",
          }}
        >
          Login
        </Button>
      </form>
      <div className="register">
        Don't have a account?
        <span style={{ color: "#383838", cursor: "pointer" }} onClick={() => navigate("/signup")}>
          Register
        </span>{" "}
      </div>
    </div>
  );
};

function Login() {
  return (
    <div className="LoginPage">
      <div>
        <div style={{ textAlign: "center", fontWeight: "bold", color: "white" }}>Login</div>
        <div className="LoginContainer">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
