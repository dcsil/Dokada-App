import React from "react";
import "./styles/HomePage.css";
// import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import axios from "axios";

function HomePage(props) {

  console.log("lol")
  React.useEffect(() => {
    console.log("useeffect")
    fetch({
      method: "GET",
      url: "/",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        console.log(response)
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [props]);
  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <Button
        href="/canvas"
        variant="contained"
        size="large"
        color="secondary"
        style={{ width: 200 }}
        className="gradient-custom-2"
      >
        Canvas
      </Button>
      <br />
      <br />
      <Button
        href="/dashboard"
        variant="contained"
        size="large"
        color="secondary"
        style={{ width: 200 }}
        className="gradient-custom-2"
      >
        Dashboard
      </Button>
      <br />
      <br />

    </div>
  );
}

export default HomePage;
