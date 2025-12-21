import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { getData, handleData } from "../../modelData/api.js";
import { API } from "../../App.js";

import "./styles.css";

/**
 * Define TopBar, a React component.
 */
function TopBar({ st }) {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  async function updateContextText() {
    const loc = location.pathname.split("/");
    if (loc.length < 3) return;

    const data = loc[1];
    const params = loc[2];
    const path = API + "/api/users/" + params;

    try {
      if (data === "users") {
        setContextText(
          `Detail of User: ${st.first_name} ${st.last_name}`
        );
      } else if (data === "photos") {
        setContextText(
          `Photos of: ${st.first_name} ${st.last_name}`
        );
      } else {
        setContextText("");
      }
    } catch (error) {
      console.log("Error fetch user:", error);
    }
  }

  useEffect(() => {
    setContextText("");
    updateContextText();
  }, [st]);

  return (
    <AppBar className="topbar-appBar" position="fixed">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          <Link to="/users">{"Đỗ Đức Chính"}</Link>
        </Typography>
        

        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>

        <Typography variant="h6" color="inherit">
          {!st || !st._id ? (
            <>
              <Link to="/login">{" "}Login{" "}</Link>
              <Link to="/register">{" "}Register{" "}</Link>
            </>
          ) : (
            <div>
              <Typography variant="h6" color="inherit">
                <Link to="/me">{"Hi: " + st.first_name + "   "}</Link>
                <Link to="/addphoto">{" "}Add Photo{" "}</Link>
                <Link to="/logout">{" "}Logout</Link>
              </Typography>
              
                
            </div>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
