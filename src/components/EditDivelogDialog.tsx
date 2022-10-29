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
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "../context/SnackbarContext";
import { getUsername } from "../context/UserContext";
import { requests } from "../utils/api-requests";
import { DIVELOG_URL, UPDATE_DIVELOG } from "../configs";
import { Divelog } from "../pages/Divelog";

type EditDivelogDialog = {
  dialogOpen: boolean;
  setDialogOpen: (isOpen: boolean) => void;
  divelog: Divelog;
  refreshDivelogs: () => void;
};

function EditDivelogDialog(props: EditDivelogDialog) {
  const { dialogOpen, setDialogOpen } = props;
  const [loading, setLoading] = useState(false);

  const snackBar = useSnackbar();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("depth"));
    console.log(data.get("duration"));
    console.log(data.get("comments"));
    const depth = data.get("depth");
    const duration = data.get("duration");
    const comments = data.get("comments");

    const body = {
      username: props.divelog.username,
      name: props.divelog.name,
      year: props.divelog.year,
      location: props.divelog.location,
      depth: depth ? parseInt(depth.toString()) : null,
      duration: duration ? parseInt(duration.toString()) : null,
      comments: comments ? comments.toString() : "",
    };

    console.log(body);

    setLoading(true);
    requests
      .put(DIVELOG_URL, UPDATE_DIVELOG, body)
      .then(({ data: { message }, status }) => {
        console.log(message);
        if (status !== 200) throw new Error(message);
        // success
        setDialogOpen(false);
        snackBar.setSuccess(message, 3000);
        props.refreshDivelogs();
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
      <DialogTitle>Edit Divelog</DialogTitle>

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
            <Typography>Username: {props.divelog.username}</Typography>
            <Typography>Name: {props.divelog.name}</Typography>
            <Typography>Year: {props.divelog.year.toString()}</Typography>
            <Typography>Location: {props.divelog.location}</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Depth"
              fullWidth
              id="depth"
              label="depth"
              name="depth"
              // type="Number"
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
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default EditDivelogDialog;
