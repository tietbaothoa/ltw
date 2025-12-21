import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import { getData, handleData } from "../../modelData/api.js";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { API } from "../../App.js";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const user = useParams(); // App.js line 30
  const [userDetail, setUserDetail] = useState([]);
  const [status, setStatus] = useState("Loading ...");
  const navigate = useNavigate();

  useEffect(() => {
    setStatus("Loading ...");
    getData(API + "/api/users/" + user.userId)
      .then((data) => {
        setUserDetail(data);
        setStatus("OK");
      })
      .catch((err) => {
        console.log(err);
        setStatus("Error");
        navigate("/login");
      });
  }, [user]);

  return (
    <>
      <Typography variant="body1">
        This should be the UserDetail view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user: {user.userId}. You can fetch
        the model for the user from models.userModel.
        <br />
        <Divider />
        <br />
        {status == "OK" ? (
          <div>
            First name{": " + userDetail.first_name}
            <br />
            Last name{": " + userDetail.last_name}
            <br />
            Location{": " + userDetail.location}
            <br />
            Description{": " + userDetail.description}
            <br />
            Occupation{": " + userDetail.occupation}
            <br />
            <Link to={"../photos/" + user.userId}>My PhotoShare</Link>
          </div>
        ) : (
          status
        )}
      </Typography>
    </>
  );
}

function Me({ setUser }) {
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  function handleDelete(e) {
    e.preventDefault();
    handleData(API + "/api/users/" + info._id, "DELETE")
      .then((data) => {
        setInfo(null); 
        console.log(data); 
        setUser(null); 
        alert("Delete successful");
        navigate("/login");
      })
      .catch((err) => { 
        console.log(err); 
        alert("Delete failed: "+ err.message);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleData(API + "/api/users/update/me", "POST", info)
      .then((data) => {
        setInfo(data); 
        console.log(info);
        alert("Update successful");
        navigate("/");
      })
      .catch((err) => { 
        setInfo(null); 
        console.log(err); 
        alert("Update failed: "+ err.message);
      });
  }

  useEffect(() => {
    getData(API + "/api/users/about/me")
      .then((data) => { 
        setInfo(data); 
        console.log(info); 
      })
      .catch((err) => { 
        setInfo(null); 
        console.log(err); 
      });
  }, []);

  return (
    <div>
      <h2>About me</h2>
      <p>View your details.</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <label >
          Username:<input type="text" name="login_name" onChange={(e) => setInfo({ ...info, login_name: e.target.value })} value={info?.login_name || ""} />
        </label>
        <br />
        <label >
          Password:<input type="password" name="login_pass" onChange={(e) => setInfo({ ...info, login_pass: e.target.value })} value={info?.login_pass || ""} />
        </label>
        <br />
        <label>
          First name:<input type="text" name="first_name" onChange={(e) => setInfo({ ...info, first_name: e.target.value })} value={info?.first_name || ""} />
        </label>
        <br />
        <label>
          Last name:<input type="text" name="last_name" onChange={(e) => setInfo({ ...info, last_name: e.target.value })} value={info?.last_name || ""} />
        </label>
        <br />
        <label>
          Location:<input type="text" name="location" onChange={(e) => setInfo({ ...info, location: e.target.value })} value={info?.location || ""} />
        </label>
        <br />
        <label>
          Description:<textarea type="text" name="description" onChange={(e) => setInfo({ ...info, description: e.target.value })} value={info?.description || ""} />
        </label>
        <br />
        <label>
          Occupation:<input type="text" name="occupation" onChange={(e) => setInfo({ ...info, occupation: e.target.value })} value={info?.occupation || ""} />
        </label>
        <br />
        <button type="submit">Update me</button>
      </form>
    </div>
  )
}

export { UserDetail, Me };
