import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

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
        <Typography>Welcome to Florencia's CS3219 Task B</Typography>
      </Container>
    </div>
  );
}

export default HomePage;
