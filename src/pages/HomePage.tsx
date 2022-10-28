import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, IconButton, TextField } from "@mui/material";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button onClick={() => navigate("/divelog")}>Task B1</Button>
        <Button onClick={() => navigate("/nusmods")}>Task B4</Button>
      </Container>
    </div>
  );
}

export default HomePage;
