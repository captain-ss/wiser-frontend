import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import NoteEditor from "./component/NodeEditor/NoteEditor";
import NoteGrid from "./component/NoteGrid/NoteGrid";
import NoteViewer from "./component/NoteViewer/NoteViewer";
import Header from "./component/Header/Header";
import Footer from "./component/Footer";
import Notification from "./component/Notificaiton";

const theme = createTheme();

function App() {
  const [search, setSearch] = useState("");
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [uploadControl, setUploadControl] = useState(false)
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  // Function to show a success notification
  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const handleNoteSelect = (index) => {
    setSelectedNoteIndex(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Notification
        message={notificationMessage}
        open={notificationOpen}
        onClose={handleNotificationClose}
      />
      <Header setSearch={setSearch} />
      <Container maxWidth="lg">
        {/* <h1>Notekeeper App</h1> */}
        <NoteEditor />
        <div style={{ margin: "10px 0px" }}></div>
        <NoteGrid search={search} onSelect={handleNoteSelect} />

        {selectedNoteIndex !== null && (
          <NoteViewer
            showSuccessNotification={showSuccessNotification}
            note={selectedNoteIndex}
            setUploadControl={setUploadControl}
            onClose={() => setSelectedNoteIndex(null)}
          />
        )}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
