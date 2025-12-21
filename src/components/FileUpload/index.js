import { React, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css";
import { handleData } from "../../modelData/api";
import { API }  from "../../App.js";


export default function FileUpload({ user }) {
    const navigate = useNavigate();

    function handleAddPhoto() {
        const photoInput = document.getElementById("photo");
        const photoFile = photoInput.files[0];
        if (photoFile) {
            const formData = new FormData();
            formData.append("photo", photoFile);
            fetch(`${API}/api/photos/new`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token") || "",
                },
            })
            .then((res) => {
                alert("Photo uploaded successfully!");
            })
            .catch((error) => {
                console.error("Error uploading photo:", error);
                alert("Failed to upload photo.");
            })
            .finally((data) => {
                console.log(data);
                navigate("/photos/" + user._id);
            });

        } else {
            alert("Please select a photo to upload.");
        }
    }

    return (
        <div>
            <h1>Upload photo</h1>
            <input type="file" id="photo" required/>
            <button onClick={handleAddPhoto}>Add Photo</button>
        </div>
    );
}


