import React from "react";
import "./styles/HomePage.css";
// import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";

function HomePage(props) {

  React.useEffect(() => {
    fetch({
      method: "GET",
      url: "/",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {c8a934b6
        const res = response.json();
        res.access_token && props.setToken(res.access_token);
      })
      .catch((error) => {
        console.log("Error:", error)
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
