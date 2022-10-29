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
import { DIVELOG_URL, DELETE_DIVELOG } from "../configs";
import { Divelog } from "../pages/Divelog";

type DeleteDivelogDialog = {
  dialogOpen: boolean;
  setDialogOpen: (isOpen: boolean) => void;
  divelog: Divelog;
  refreshDivelogs: () => void;
};

function DeleteDivelogDialog(props: DeleteDivelogDialog) {
  const { dialogOpen, setDialogOpen } = props;
  const [loading, setLoading] = useState(false);

  const snackBar = useSnackbar();

  const handleDelete = () => {
    const body = {
      username: props.divelog.username,
      name: props.divelog.name,
    };

    console.log(body);

    setLoading(true);
    requests
      .delete(DIVELOG_URL, DELETE_DIVELOG, body)
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
    <Dialog sx={{ padding: "1rem" }} open={dialogOpen}>
      <DialogTitle>Delete Divelog</DialogTitle>

      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => setDialogOpen(false)}>
          <Close />
        </IconButton>
      </Box>

      <Box sx={{ padding: "0 1rem 1rem 1rem" }}>
        <Typography>
          Are you sure you want to delete {props.divelog.name}?
        </Typography>
        <Box sx={{ flexDirection: "row" }}>
          <Button onClick={handleDelete}>
            {loading && <CircularProgress size={18} sx={{ mr: 1 }} />}
            Yes
          </Button>
          <Button>Cancel</Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default DeleteDivelogDialog;
