import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "../context/SnackbarContext";
import { getUsername } from "../context/UserContext";
import { requests } from "../utils/api-requests";
import { CREATE_DIVELOG, DIVELOG_URL } from "../configs";

type CreateDivelogDialog = {
  dialogOpen: boolean;
  setDialogOpen: (isOpen: boolean) => void;
};

function CreateDivelogDialog(props: CreateDivelogDialog) {
  const { dialogOpen, setDialogOpen } = props;
  const [loading, setLoading] = useState(false);

  const snackBar = useSnackbar();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const username = getUsername();
    const username = "ben";
    const name = data.get("name");
    const year = data.get("year");
    const location = data.get("location");
    const depth = data.get("depth");
    const duration = data.get("duration");
    const comments = data.get("comments");

    if (!username || !name || !year || !location) {
      return;
    }

    const body = {
      username: username.toString(),
      name: name.toString(),
      year: year,
      location: location.toString(),
      depth: depth ? depth : null,
      duration: duration ? duration : null,
      comments: comments ? comments.toString() : "",
    };

    setLoading(true);
    requests
      .post(DIVELOG_URL, CREATE_DIVELOG, body)
      .then(({ data: { message }, status }) => {
        console.log(message);
        if (status !== 201) throw new Error(message);
        // success
        setDialogOpen(false);
        snackBar.setSuccess(message, 3000);
      })
      .catch((err) => {
        console.log(err);
        snackBar.setError(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Create Divelog</DialogTitle>

      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => setDialogOpen(false)}>
          <Close />
        </IconButton>
      </Box>

      <Box
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
        }}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              placeholder="Name"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              type="text"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Year"
              required
              fullWidth
              id="year"
              label="year"
              name="year"
              type="nunber"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Location"
              required
              fullWidth
              id="location"
              label="location"
              name="location"
              type="text"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Depth"
              fullWidth
              id="depth"
              label="depth"
              name="depth"
              type="number"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Duration"
              fullWidth
              id="duration"
              label="duration"
              name="duration"
              type="number"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Comments"
              fullWidth
              id="comments"
              label="comments"
              name="comments"
              type="text"
              variant="standard"
            />
          </Grid>

          <Grid
            item
            sx={{ display: "flex", justifyContent: "flex-end" }}
            xs={12}
          >
            <Button variant="contained" type="submit" disabled={loading}>
              {loading && <CircularProgress size={18} sx={{ mr: 1 }} />}
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default CreateDivelogDialog;
