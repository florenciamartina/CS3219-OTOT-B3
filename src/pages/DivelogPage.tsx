import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divelog } from "./Divelog.d";
import { requests } from "../utils/api-requests";
import { DIVELOG_URL, GET_DIVELOG_NAME, GET_DIVELOG_YEAR } from "../configs";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import CreateDivelogDialog from "../components/CreateDivelogDialog";
import DivelogCard from "../components/DivelogCard";
import { blue } from "@mui/material/colors";

function DivelogPage() {
  const navigate = useNavigate();
  const snackBar = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchOption, setSearchOption] = useState<string | null>("name");
  const [username, setUsername] = useState<string | null>();
  const [name, setName] = useState<string | null>();
  const [year, setYear] = useState<number | null>();
  const [divelogs, setDivelogs] = useState<Divelog[]>([]);
  const [createDivelogDialog, setCreateDivelogDialog] = useState(false);

  function handleSearchOption(
    event: React.MouseEvent<HTMLElement>,
    newSearchOption: string | null
  ) {
    if (newSearchOption !== null) {
      setSearchOption(newSearchOption);
    }
  }

  function handleCreateDivelog() {
    setAnchorEl(null);
    setCreateDivelogDialog(true);
  }

  function refreshDivelogs() {
    if (name) {
      searchDivelogByName();
    }

    if (year) {
      searchDivelogByYear();
    }
  }

  function searchDivelogByName() {
    setLoading(true);
    requests
      .get(DIVELOG_URL, `${GET_DIVELOG_NAME}?name=${name}&username=${username}`)
      .then(({ data, status }) => {
        if (status == 404) {
          snackBar.setError(`Divelog ${name} does not exist!`);
          return;
        }

        if (status !== 200) {
          snackBar.setError("Unable to get divelogs.");
          // navigate("/home");
          return;
        }
        setDivelogs([data]);
        console.log([data]);
        //     // snackBar.setSuccess(message, 2000);
      });
    setLoading(false);
  }

  function searchDivelogByYear() {
    setLoading(true);
    requests
      .get(DIVELOG_URL, `${GET_DIVELOG_YEAR}?year=${year}&username=${username}`)
      .then(({ data, status }) => {
        if (status == 404 || data.length == 0) {
          snackBar.setError(`You didn't write any divelogs in ${year} :(`);
          return;
        }

        if (status !== 200) {
          snackBar.setError("Unable to get divelogs.");
          return;
        }
        setDivelogs(data);
        console.log(data);
        //     // snackBar.setSuccess(message, 2000);
      });
    setLoading(false);
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        padding: "2rem",
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        gap: "2rem",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Button onClick={() => navigate("/home")}>
          <ArrowBackIcon />
        </Button>
        <Typography>Search by : </Typography>
        <ToggleButtonGroup
          value={searchOption}
          exclusive
          onChange={handleSearchOption}
          aria-label="text alignment"
        >
          <ToggleButton value="name" aria-label="Search by name">
            Name
          </ToggleButton>
          <ToggleButton value="year" aria-label="Search by year">
            Year
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography> OR </Typography>
        <Button
          fullWidth
          sx={{
            backgroundColor: blue[600],
            "&:hover": {
              backgroundColor: blue[900],
            },
            color: "white",
          }}
          onClick={handleCreateDivelog}
        >
          <AddBoxIcon /> Create
        </Button>
      </Box>

      <Box sx={{ display: "inline-flex", gap: "1rem" }}>
        <TextField
          required
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={username ? false : true}
          helperText={username ? "" : "Username cannot be empty"}
        />

        {/* <SearchBar searchOption={searchOption ? searchOption : "name"} /> */}
        {searchOption === "name" && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "start",
              gap: "1rem",
            }}
          >
            <TextField
              required
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={name ? false : true}
              helperText={name ? "" : "Name cannot be empty"}
            />
            <IconButton
              onClick={searchDivelogByName}
              disabled={!username || !name}
              sx={{
                backgroundColor: blue[600],
                "&:hover": {
                  backgroundColor: blue[900],
                },
                height: "min-content",
                color: "white",
              }}
            >
              {loading && <CircularProgress size={18} sx={{ mr: 1 }} />}
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        {searchOption === "year" && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "start",
              gap: "1rem",
            }}
          >
            <TextField
              required
              id="outlined-basic"
              label="Year"
              variant="outlined"
              value={year}
              type="number"
              error={year ? isNaN(year) : true}
              helperText={
                year ? "" : "Input cannot be empty and must be a number"
              }
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
            <IconButton
              onClick={searchDivelogByYear}
              disabled={!username || !year}
              sx={{
                backgroundColor: blue[600],
                "&:hover": {
                  backgroundColor: blue[900],
                },
                height: "min-content",
                color: "white",
              }}
            >
              {loading && <CircularProgress size={18} sx={{ mr: 1 }} />}
              <SearchIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {loading && <Typography>Loading ...</Typography>}

      <Grid
        container
        direction="row"
        spacing={"2rem"}
        style={{
          maxHeight: "70vh",
          overflow: "auto",
          width: "90vw",
          padding: "1rem",
        }}
      >
        {divelogs &&
          divelogs.length > 0 &&
          divelogs.map((divelog: Divelog, index) => (
            <Grid item xs={2} sm={3} md={4} key={index}>
              <DivelogCard
                divelog={divelog}
                refreshDivelogs={refreshDivelogs}
              ></DivelogCard>
            </Grid>
          ))}
      </Grid>

      <CreateDivelogDialog
        dialogOpen={createDivelogDialog}
        setDialogOpen={setCreateDivelogDialog}
        refreshDivelogs={refreshDivelogs}
      />
    </Container>
  );
}

export default DivelogPage;
