import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { REACT_URL } from "../../config";
import axios from "axios";

function NoteViewer({ note, onClose, showSuccessNotification,setUploadControl }) {
  const [editedNote, setEditedNote] = useState(note);
  const [open, setOpen] = useState(true);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleUpdateNote = async () => {
    try {
      const response = await axios.put(
        `${REACT_URL}/${editedNote._id}`,
        editedNote
      );
      setUploadControl(true);
      showSuccessNotification("Note updated successfully");
      onClose();
      handleClose();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Note</DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={editedNote?.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tagline"
          name="tagline"
          value={editedNote?.tagline}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Note Content"
          name="body"
          value={editedNote?.body}
          onChange={handleInputChange}
          multiline
          fullWidth
          rows={4}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={(e) => {
            handleUpdateNote();
          }}
          color="primary"
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NoteViewer;
