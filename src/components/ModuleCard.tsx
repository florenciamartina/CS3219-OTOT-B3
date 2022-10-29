import { Module } from "../pages/Module";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

interface ModuleCardProps {
  module: Module;
}

function ModuleCard(props: ModuleCardProps) {
  return (
    <Container sx={{ width: "max-content" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: blue[900] }} gutterBottom>
            {props.module.moduleCode} {props.module.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.module.faculty} &nbsp;&#x25cf;&nbsp;{" "}
            {props.module.department} &nbsp;&#x25cf;&nbsp;{" "}
            {props.module.moduleCredit.toString()} {" MC "}
          </Typography>
          <Typography
            fontWeight={"light"}
            sx={{ fontSize: 14 }}
            color="text.secondary"
          >
            {props.module.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ModuleCard;
