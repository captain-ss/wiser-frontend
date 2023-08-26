import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { REACT_URL } from "../../config";
import Notification from "../Notificaiton";
function NoteEditor() {
  const [note, setNote] = useState({
    title: "",
    tagline: "",
    body: "",
    pinned: false,
  });
  const [error, setError] = useState({
    title: "",
    tagline: "",
    body: "",
  });
  const [errorShow, setErrorShow] = useState(null);
  //change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  // Function to show a success notification
  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };
  //Pin change heander
  const handleCheckboxChange = (event) => {
    setNote((prevNote) => ({
      ...prevNote,
      pinned: event?.target.checked,
    }));
  };
  //Save handler
  const handleSave = async () => {
    if (note.title === "") {
      setError((prevError) => ({ ...prevError, title: "Title is required" }));
      return;
    }
    if (note.tagline === "") {
      setError((prevError) => ({
        ...prevError,
        tagline: "Tagline is required",
      }));
      return;
    }
    if (note.body === "") {
      setError((prevError) => ({
        ...prevError,
        body: "Note content is required",
      }));
      return;
    }

    try {
      const response = await axios.post(`${REACT_URL}`, note);
      showSuccessNotification('Note saved successfully');

    } catch (error) {
      setErrorShow("Error saving note");
      console.error("Error saving note:", error);
    }
    //Clearing data
    setNote({
      title: "",
      tagline: "",
      body: "",
      isPinned: false,
    });
    setError({
      title: "",
      tagline: "",
      body: "",
    });
  };

  return (
    <div>
       <Notification
        message={notificationMessage}
        open={notificationOpen}
        severity="success" 
        onClose={handleNotificationClose}
      />
      {" "}
      <TextField
        label="Title"
        name="title"
        value={note.title}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!error.title}
        helperText={error.title}
      />
      <TextField
        label="Tagline"
        name="tagline"
        value={note.tagline}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!error.tagline}
        helperText={error.tagline}
      />
      <TextField
        label="Note Content"
        name="body"
        value={note.body}
        onChange={handleInputChange}
        multiline
        fullWidth
        rows={4}
        margin="normal"
        error={!!error.body}
        helperText={error.body}
      />
      <span
        style={{
          marginRight: "10px",
          fontWeight: "700",
        }}
      >
        <Checkbox
          checked={note.pinned}
          onChange={handleCheckboxChange}
          color="primary"
        />

        {note.pinned ? "Pinned" : "Pin"}
      </span>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Note
      </Button>{" "}
      <div>{errorShow !== null ? errorShow : ""}</div>
      
    </div>
  );
}

export default NoteEditor;
