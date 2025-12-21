import React from "react";
import { Divider, Typography } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import { getData, handleData } from "../../modelData/api.js";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API } from "../../App.js";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const user = useParams();
  const [photos, setPhotos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState("Loading ...");
  const navigate = useNavigate();

  useEffect(() => {
    setStatus("Loading ...");
    setRefresh(false);
    getData(API + "/api/photos/" + user.userId)
      .then((data) => {
        setPhotos(data);
        setStatus("OK");
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [user, refresh, photos.length]);

  function viewPhoto() {
    const viewP = [];
    photos.forEach((photo) => {
      viewP.push(<Divider />);
      viewP.push(<h2> {"Photo id: " + photo._id} </h2>);
      viewP.push(<p> Times{": " + photo.date_time} </p>);
      viewP.push(<DetetePhoto photoId={photo._id} setPhotos={setPhotos} />);
      viewP.push(
        <img src={API + "/api/photos/photo/" + photo.file_name} width={400} height={220}></img>
      );
      viewP.push(<CommentView photoId={photo._id} />);
      viewP.push(<br />);
    });
    if (viewP.length === 0) {
      viewP.push(<p>No photos uploaded by this user.</p>);
    }
    return viewP;
  }

  return (
    <Typography variant="body1">
      This should be the UserPhotos view of the PhotoShare app. Since it is
      invoked from React Router the params from the route will be in property
      match. So this should show details of user:
      {user.userId}.
      <br />
      <Divider />
      <br />
      {status === "OK" ? viewPhoto() : status}
    </Typography>
  );
}

function CommentView( { photoId } ) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState("Loading ...");

  function deteleComment(commentId) {
    const data = { photo_id: photoId, cmt_id: commentId };
    handleData(API + "/api/comment", "DELETE", data)
      .then((data) => {
        console.log(data);
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function submitComment(e) {
    e.preventDefault();
    if (comment === "") {
      alert("Comment cannot be empty!");
      return;
    }
    const commentData = {
        comment: comment
      };
    handleData(API + "/api/comment/commentsOfPhoto/" + photoId, "POST", commentData)
      .then((data) => {
        console.log(data);
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
    });
  }

  useEffect(() => {
    setRefresh(false);
    setStatus("Loading ...");
    getData(API + "/api/comment/" + photoId)
      .then((data) => {
        setComments(data);
        setStatus("OK");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh, photoId]);


  if (status !== "OK") {
    return <div>{status}</div>;
  }

  return (
    <div>
      <h3>Comments:</h3>
      {comments.length === 0 ? (
        <p>No Comment</p>
      ) : (
        comments.map((cmt) => (
          <div key={cmt._id}>
            <h4>User: {cmt.user.first_name + " " + cmt.user.last_name}</h4>
            <h5>Time: {cmt.date_time}</h5>            
            <ul>
              <li>Comment: {cmt.comment}</li>  
            </ul>
          </div>
        ))
      )}
      <h3>Add Comment:</h3>
      <form onSubmit={submitComment}>
          <label>Comment:</label>
          <input
            type="text"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

function DetetePhoto( { photoId, setPhotos } ) {
  function deletePhoto() {
    handleData(API + "/api/photos/" + photoId, "DELETE")
      .then((data) => {
        console.log(data);
        alert("Photo deleted successfully!");
        setPhotos((prev) =>
          prev.filter((photo) => photo._id !== photoId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      
    </div>
  )
}

export default UserPhotos;
