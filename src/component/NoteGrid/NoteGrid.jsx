import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the Delete icon
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { REACT_URL } from "../../config";
import "./NoteGrid.css";
import { Button } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import EditIcon from "@mui/icons-material/Edit";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import Notification from "../Notificaiton";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

function NoteGrid({ onSelect, search }) {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  //Get notes by page
  async function fetchNotes() {
    try {
      const response = await axios.get(
        `${REACT_URL}?page=${currentPage}&title=${search}`
      );
      setNotes(response.data.notes);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }
  const showNotification = (message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    fetchNotes();
  }, [currentPage, search]);
  const handleDeleteNote = async (note) => {
    try {
      await axios.delete(`${REACT_URL}/${note._id}`);
      showNotification("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        {notes?.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <StyledPaper elevation={3}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>{note.title}</h3>

                {/* <IconButton />
                <EditIcon variant="contained" color="primary" /> */}

                {note?.pinned && <PushPinIcon style={{ marginLeft: "10px" }} />}
                <div>{note.id}</div>
              </div>
              <p>{note.tagline}</p>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    handleDeleteNote(note);
                    fetchNotes();
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    onSelect(note);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<FileOpenIcon />}
                  onClick={() => {
                    onSelect(note);
                  }}
                >
                  Open
                </Button>
              </div>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
      <div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      
        <Notification
          message={notificationMessage}
          open={notificationOpen}
          severity="success" 
          onClose={handleNotificationClose}
        />
      </div>
    </div>
  );
}

export default NoteGrid;
