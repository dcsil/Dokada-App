// import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";

function Auth(props) {

  const [signUp, setSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginForm, setloginForm] = useState({
    username: "",
    password: "",
  });

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

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  return (
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

            <p>Please login to your account</p>

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
                Sign in
              </MDBBtn>

              {/* <a className="text-muted" href="#!">
                Forgot password?
              </a> */}
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn
                outline
                className="mx-2"
                color="danger"
                onClick={signMeUp}
              >
                SIGN UP
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
  );
}

export default Auth;
