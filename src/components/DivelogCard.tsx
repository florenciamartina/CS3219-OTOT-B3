import { Divelog } from "../pages/Divelog";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDivelogDialog from "../components/EditDivelogDialog";
import DeleteDivelogDialog from "../components/DeleteDivelogDialog";

interface DivelogCardProps {
  divelog: Divelog;
  refreshDivelogs: () => void;
}

function DivelogCard(props: DivelogCardProps) {
  const [editDivelogDialog, setEditDivelogDialog] = useState(false);
  const [deleteDivelogDialog, setDeleteDivelogDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleEditDivelog() {
    setAnchorEl(null);
    setEditDivelogDialog(true);
  }

  function handleDeleteDivelog() {
    setAnchorEl(null);
    setDeleteDivelogDialog(true);
  }

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Log: {props.divelog.username} - {props.divelog.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Year: {props.divelog.year.toString()}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Location: {props.divelog.location}
          </Typography>
          {props.divelog.depth && (
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Depth: {props.divelog.depth.toString()}
            </Typography>
          )}
          {props.divelog.duration && (
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Duration: {props.divelog.duration.toString()}
            </Typography>
          )}
          {props.divelog.comments && (
            <Typography sx={{ fontSize: 14 }}>
              Comments: {props.divelog.comments}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button onClick={handleEditDivelog}>
              <EditIcon />
            </Button>
            <Button onClick={handleDeleteDivelog}>
              <DeleteIcon />
            </Button>
          </Grid>
        </CardActions>
      </Card>

      <EditDivelogDialog
        divelog={props.divelog}
        dialogOpen={editDivelogDialog}
        setDialogOpen={setEditDivelogDialog}
        refreshDivelogs={props.refreshDivelogs}
      />

      <DeleteDivelogDialog
        divelog={props.divelog}
        dialogOpen={deleteDivelogDialog}
        setDialogOpen={setDeleteDivelogDialog}
        refreshDivelogs={props.refreshDivelogs}
      />
    </Container>
  );
}

export default DivelogCard;
