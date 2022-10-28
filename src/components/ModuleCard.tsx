import { Module } from "../pages/Module";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDivelogDialog from "../components/EditDivelogDialog";
import DeleteDivelogDialog from "../components/DeleteDivelogDialog";

interface ModuleCardProps {
  module: Module;
}

function ModuleCard(props: ModuleCardProps) {
  return (
    <Container>
      <Card sx={{ minWidth: 275, maxWidth: "max-content" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.module.moduleCode}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.module.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {props.module.description}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {props.module.moduleCredit.toString()}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {props.module.department}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {props.module.faculty}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ModuleCard;
