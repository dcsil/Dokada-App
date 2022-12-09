// import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBInput,
  MDBIcon,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";
import { fontFamily } from "@mui/system";

function Auth(props) {
  const [signUp, setSignUp] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginForm, setloginForm] = useState({
    username: "",
    password: "",
  });
  const [greetingText, setGreeting] = useState("Please login to your account")
  const [reminderText, setReminder] = useState("Don't have an account?")
  const [bigButtonLabel, setBigLabel] = useState("Sign In")
  const [smallButtonLabel, setSmallLable] = useState("Sign Up")

  console.log(signUp);

  function switchLable(){
    if(bigButtonLabel == "Sign In"){
      setGreeting("Please Sign up for a new account")
      setReminder("Already have an account?")
      setBigLabel("Sign Up")
      setSmallLable("Sign In")
    }
    else{
      setGreeting("Please login to your account")
      setReminder("Don't have an account?")
      setBigLabel("Sign In")
      setSmallLable("Sign Up")
    }
  }

  function logMeIn(event) {
    axios({
      method: "POST",
      url: "/token",
      data: {
        username: loginForm.username,
        password: loginForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token);
      })
      .catch((error) => {
        alert("wrong credentials! Try again");
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    setloginForm({
      username: "",
      password: "",
    });

    event.preventDefault();
  }

  function signMeUp(event) {
    axios({
      method: "POST",
      url: "/register",
      data: {
        username: loginForm.username,
        password: loginForm.password,
      },
    })
      .then((response) => {
        // props.setToken(response.data.access_token);        
        console.log(response.data)
        if(response.data["status"] == "fail"){
          alert("User already exist");
        }
        setSignUp(false);
      })
      .catch((error) => {        
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    setloginForm({
      username: "",
      password: "",
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  return signUp ? (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src={require("../images/Dokada.png")}
                style={{ width: "385px" }}
                alt="logo"
              />
              <h1 className="mt-1 mb-5 pb-1 ">We are DOKADA</h1>
            </div>

            <p>{greetingText}</p>

            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="form1"
              onChange={handleChange}
              type="username"
              text={loginForm.username}
              name="username"
              placeholder="Username"
              value={loginForm.username}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              onChange={handleChange}
              type="password"
              text={loginForm.password}
              name="password"
              placeholder="Password"
              value={loginForm.password}
            />
            {/* {errorMessage && <h3 style={{ color: "red" }}> {errorMessage} </h3>} */}
            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                onClick={logMeIn}
                className="mb-4 w-100 gradient-custom-2"
              >
                {bigButtonLabel}
              </MDBBtn>

              {/* <a className="text-muted" href="#!">
                Forgot password?
              </a> */}
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">{reminderText}</p>
              <MDBBtn
                outline
                className="mx-2"
                color="danger"
                onClick={() => {setSignUp(false)}}
              >
                {smallButtonLabel}
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Hear more. See more. Know more Gather actionable feedback to
                make feedback more feasible and efficient Increase customer
                satisfaction and learn more about user preference
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  ) : (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
              <div className="text-center mb-2">
                <img
                  src={require("../images/Dokada.png")}
                  style={{ width: "285px" }}
                  alt="logo"
                />

                <h5
                  className="fw-bold mb-2 text-center"
                  style={{ margin: "20px" }}
                >
                  {" "}
                  Please enter your register credentials!
                </h5>
              </div>

              <MDBInput
                wrapperClass="mb-3"
                label="Username"
                id="form1"
                onChange={handleChange}
                type="username"
                text={loginForm.username}
                name="username"
                placeholder="Username"
                value={loginForm.username}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                onChange={handleChange}
                type="password"
                text={loginForm.password}
                name="password"
                placeholder="Password"
                value={loginForm.password}
              />
              {/* {errorMessage && <h3 style={{ color: "red" }}> {errorMessage} </h3>} */}
              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn
                  onClick={signMeUp}
                  className="mb-4 w-100 gradient-custom-2"
                >
                  Sign Up
                </MDBBtn>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Already Have an Account</p>
                <MDBBtn
                  outline
                  className="mx-2"
                  color="danger"
                  onClick={() => {setSignUp(true)}}
                >
                  Sign In
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Auth;
