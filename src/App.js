import "./App.css";

import React, { useEffect, Location } from "react";
import { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TopBar from "./components/TopBar";
import { UserDetail, Me } from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import FileUpload from "./components/FileUpload";
import { Login, Logout, Register } from "./components/LoginRegister";

export const API = " https://rk43xg-8081.csb.app";

const App = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("App useEffect - user:", user);
  }, [user]);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar st={user} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">{user && <UserList />}</Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />

                <Route path="/users" element={<UserList />} />
                <Route path="/addphoto" element={<FileUpload user={user} />} />

                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/logout" element={<Logout onLogout={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/me" element={<Me setUser={setUser} />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
