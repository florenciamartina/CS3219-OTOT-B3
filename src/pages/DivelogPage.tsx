import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Button,
  Container,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divelog } from "./Divelog.d";
import { requests } from "../utils/api-requests";
import { DIVELOG_URL, GET_DIVELOG_NAME, GET_DIVELOG_YEAR } from "../configs";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken, getUsername } from "../context/UserContext";
import CreateDivelogDialog from "../components/CreateDivelogDialog";
import DivelogCard from "../components/DivelogCard";

function DivelogPage() {
  const navigate = useNavigate();
  const snackBar = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchOption, setSearchOption] = useState<string | null>("name");
  const [name, setName] = useState<string | null>();
  const [year, setYear] = useState<number | null>();
  const [divelogs, setDivelogs] = useState<Divelog[]>([]);
  const [createDivelogDialog, setCreateDivelogDialog] = useState(false);

  function handleSearchOption(
    event: React.MouseEvent<HTMLElement>,
    newSearchOption: string | null
  ) {
    setSearchOption(newSearchOption);
  }

  function handleCreateDivelog() {
    setAnchorEl(null);
    setCreateDivelogDialog(true);
  }

  function searchDivelogByName() {
    const username = "ben";
    console.log(username);
    setLoading(false);
    requests
      .get(DIVELOG_URL, `${GET_DIVELOG_NAME}?name=${name}&username=${username}`)
      .then(({ data, status }) => {
        if (status !== 200) {
          snackBar.setError("Unable to get divelogs.");
          navigate("/home");
        }
        setDivelogs([data]);
        console.log([data]);
        //     // snackBar.setSuccess(message, 2000);
      });
    setLoading(true);
  }

  async function searchDivelogByYear() {
    // const username = getUsername();
    const username = "ben";
    console.log(username);

    requests
      .get(DIVELOG_URL, `${GET_DIVELOG_YEAR}?year=${year}&username=${username}`)
      .then(({ data, status }) => {
        if (status !== 200) {
          snackBar.setError("Unable to get divelogs.");
          navigate("/home");
        }
        setDivelogs(data);
        console.log(data);
        //     // snackBar.setSuccess(message, 2000);
      });
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button onClick={() => navigate("/home")}>
        <ArrowBackIcon />
      </Button>
      <h1>Search by : </h1>
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

      {/* <SearchBar searchOption={searchOption ? searchOption : "name"} /> */}
      {searchOption === "name" && (
        <div>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <IconButton
            type="button"
            aria-label="search"
            onClick={searchDivelogByName}
          >
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
        </div>
      )}

      {searchOption === "year" && (
        <div>
          <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            value={year}
            type="number"
            error={year ? !isNaN(year) : true}
            helperText={
              year
                ? isNaN(year)
                  ? "Input must be a number"
                  : ""
                : "Input cannot be empty"
            }
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
          <Button
            type="button"
            aria-label="search"
            onClick={searchDivelogByYear}
          >
            {loading && <CircularProgress size={18} sx={{ mr: 1 }} />}
            <SearchIcon style={{ fill: "blue" }} />
          </Button>
        </div>
      )}

      {divelogs?.map((divelog: Divelog) => (
        <DivelogCard divelog={divelog}></DivelogCard>
      ))}

      <Button onClick={handleCreateDivelog}>Create Divelog</Button>

      <CreateDivelogDialog
        dialogOpen={createDivelogDialog}
        setDialogOpen={setCreateDivelogDialog}
      />
    </Container>
  );
}

export default DivelogPage;
