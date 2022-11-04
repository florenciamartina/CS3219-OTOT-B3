import React from "react";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import ScubaDivingIcon from "@mui/icons-material/ScubaDiving";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  return (
    <AppBar position="relative" sx={{ boxShadow: "none", height: "60px" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate("/home")}
        >
          <ScubaDivingIcon />
        </IconButton>

        <Button
          sx={{
            color: "white",
            "&:hover": {
              color: grey[400],
            },
          }}
          onClick={() => navigate("/divelog")}
        >
          Task B1
        </Button>
        <Button
          sx={{
            color: "white",
            "&:hover": {
              color: grey[400],
            },
          }}
          onClick={() => navigate("/nusmods")}
        >
          Task B4
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
