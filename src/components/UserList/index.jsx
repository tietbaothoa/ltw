import { React, useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css";
import { getData, handleData } from "../../modelData/api.js";
import { API } from "../../App.js";
import { use } from "react";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("Loading...");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    getData(API + "/api/users")
      .then((data) => {
        setUsers(data);
        setStatus("OK");
      })
      .catch((err) => {setStatus("Error loading user list"); navigate("/login");});
  }, []);

  if (status != "OK") return <Typography variant="body1">{status}</Typography>;

  return (
    <div>
      <Typography variant="body1">
        This is the user list, which takes up 3/12 of the window. You might
        choose to use <a href="https://mui.com/components/lists/">Lists</a> and{" "}
        <a href="https://mui.com/components/dividers/">Dividers</a> to display
        your users like so:
      </Typography>
      <TextField
        size="small"
        label="Search user"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 8 }}
      />

      <List component="nav">
      {users.filter((user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((item) => (

          <>
            <ListItem>
              <Link to={"/users/" + item._id}>
                <ListItemText primary={item.first_name} />{" "}
              </Link>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      <Typography variant="body1">
        The model comes in from models.userListModel()
      </Typography>
    </div>
  );
}

export default UserList;
