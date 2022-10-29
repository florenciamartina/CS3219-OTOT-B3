import { useState, useEffect } from "react";
import {
  Button,
  Container,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Module } from "./Module";
import { requests } from "../utils/api-requests";
import { SERVERLESS_URL } from "../configs";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { faculties } from "../json/faculties";
import { departments } from "../json/departments";
import { mcs } from "../json/mcs";
import ModuleCard from "../components/ModuleCard";
import { blue } from "@mui/material/colors";

function NUSModsPage() {
  const navigate = useNavigate();
  const snackBar = useSnackbar();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ay, setAy] = useState<string | null>();
  const [dep, setDep] = useState<string | null>();
  const [fac, setFac] = useState<string | null>();
  const [mc, setMc] = useState<string | null>();
  const [sem, setSem] = useState<string | null>();
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    searchModules();
  }, [page]);

  const LIMIT = 20;

  function getModuleQueries() {
    let url = "";
    if (ay) {
      url = url + `&ay=${ay}`;
    }
    if (dep) {
      url = url + `&dep=${dep}`;
    }
    if (fac) {
      url = url + `&fac=${fac}`;
    }
    if (mc) {
      url = url + `&mc=${mc}`;
    }
    if (sem) {
      url = url + `&sem=${sem}`;
    }
    if (page) {
      url = url + `&page=${page}`;
    }
    return url;
  }

  function searchModules() {
    setLoading(true);
    console.log(loading);
    const url = getModuleQueries();
    requests.get(SERVERLESS_URL + url, "").then(({ data, status }) => {
      if (status !== 200) {
        snackBar.setError("Unable to get modules.");
        navigate("/home");
      }

      setMaxPage(data.maxPage);
      setModules(data.modules);
      console.log(data);
      setLoading(false);
    });
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Button onClick={() => navigate("/home")}>
          <ArrowBackIcon />
        </Button>
        <h1>Search by : </h1>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="ay">Academic Year</InputLabel>
          <Select
            labelId="ay"
            id="ay"
            value={ay}
            label="Academic Year"
            onChange={(e) => setAy(e.target.value)}
          >
            <MenuItem value={"2018-2019"}>2018-2019</MenuItem>
            <MenuItem value={"2019-2020"}>2019-2020</MenuItem>
            <MenuItem value={"2020-2021"}>2020-2021</MenuItem>
            <MenuItem value={"2021-2022"}>2021-2022</MenuItem>
            <MenuItem value={"2022-2023"}>2022-2023</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="dep">Department</InputLabel>
          <Select
            labelId="dep"
            id="dep"
            value={dep}
            label="Department"
            onChange={(e) => setDep(e.target.value)}
          >
            {departments?.map((dep: string) => (
              <MenuItem value={dep}>{dep}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="fac">Faculty</InputLabel>
          <Select
            labelId="fac"
            id="fac"
            value={fac}
            label="Faculty"
            onChange={(e) => setFac(e.target.value)}
          >
            {faculties?.map((fac: string) => (
              <MenuItem value={fac}>{fac}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="mc">MC</InputLabel>
          <Select
            labelId="mc"
            id="mc"
            value={mc}
            label="MC"
            onChange={(e) => setMc(e.target.value)}
          >
            {mcs?.map((mc: string) => (
              <MenuItem value={mc}>{mc}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sem">Semester</InputLabel>
          <Select
            labelId="sem"
            id="sem"
            value={sem}
            label="Semester"
            onChange={(e) => setSem(e.target.value)}
          >
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
          </Select>
        </FormControl>

        <IconButton
          onClick={searchModules}
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
      </Container>

      {!modules && <Typography>No modules found.</Typography>}
      {modules && modules.length > 0 && (
        <Grid
          container
          direction="row"
          spacing={"2rem"}
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
            width: "100vw",
          }}
        >
          {modules?.map((module: Module) => (
            <ModuleCard module={module} />
          ))}
        </Grid>
      )}

      {!loading && modules.length == 0 && (
        <Typography>
          No modules found. Please try another combination.
        </Typography>
      )}

      {loading && <Typography>Loading...</Typography>}

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        sx={{ paddingTop: "1rem" }}
      >
        {page > 1 && <Button onClick={(e) => setPage(page - 1)}>Prev</Button>}
        {page + 1 <= maxPage && (
          <Button onClick={(e) => setPage(page + 1)}>Next</Button>
        )}
      </Grid>
    </Container>
  );
}

export default NUSModsPage;
