import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import UploadIcon from "@mui/icons-material/Upload";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import endpoint from "../Server/MockServer";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-root": {
    width: "573px",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #444D56",
    fontSize: 16,
    padding: "0 9px",
    width: "100%",
    height: "30px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));

const ModalTextField = styled(TextField)({
  width: "100%",
  marginBottom: "8px",
  "& label.Mui-focused": {
    color: "color: rgba(255, 255, 255, 0.6);",
  },
  "& .MuiOutlinedInput-input": {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    color: "rgba(255, 255, 255, 0.87)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "color: rgba(255, 255, 255, 0.6);",
    },
    "&:hover fieldset": {
      borderColor: "color: rgba(255, 255, 255, 0.6);",
    },
  },
});
const modalContainerStyle = {
  padding: "14px",
  minWidth: "482px",
};

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [value, setValue] = React.useState(null);
  const [modalData, setModalData] = React.useState({
    previewImage: "",
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
  });

  const makePostApiCall = (tempObj) => {
    axios
      .post(`${endpoint.key}/v1/videos`,
      tempObj,
      {
        header:{
          contentType:'application/json'
        },
      })
      .then((res) => {
        console.alert(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const uploadHandler = () => {
    console.log("modalData upload", modalData);
    const releaseDate = new Date(value?.$d);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    let finalBody = JSON.parse(JSON.stringify(modalData));
    const tempObj = {
      ...finalBody,
      releaseDate: releaseDate.toLocaleDateString("en-US", options),
    };    
    makePostApiCall(tempObj);
    setModalData(tempObj);
    handleClose();
  };
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <div className="ModalContainer" style={modalContainerStyle}>
        <Stack
          className="modalHeader"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h3>Upload Videos</h3>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Stack>
        <div className="modalPannel" style={{ paddingRight: "28px" }}>
          <ModalTextField
            id="VideoLink"
            name="videoLink"
            label="Video Link"
            variant="outlined"
            value={modalData.videoLink}
            onChange={(e) =>
              setModalData({ ...modalData, videoLink: e.target.value })
            }
            helperText="This link will be used to derive the video"
          />

          <ModalTextField
            id="ThumbnailLink"
            name="previewImage"
            value={modalData.previewImage}
            onChange={(e) =>
              setModalData({ ...modalData, previewImage: e.target.value })
            }
            label="Thumbnail Image Link"
            variant="outlined"
            helperText="This link will be used to preview the thumbnail image"
          />
          <ModalTextField
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            value={modalData.title}
            onChange={(e) =>
              setModalData({ ...modalData, title: e.target.value })
            }
            helperText="The title will be the representative text for video"
          />
          <FormControl sx={{ mb: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="genre"
              value={modalData.genre}
              onChange={(e) =>
                setModalData({ ...modalData, genre: e.target.value })
              }
              label="Genre"
              helperText="Genre will help in categorizing your videos"
              sx={{ width: "100%" }}
            >
              <MenuItem value={"Education"}>Education</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"Comedy"}>Comedy</MenuItem>
              <MenuItem value={"Lifstyle"}>Lifstyle</MenuItem>
            </Select>
            <FormHelperText>
              Genre will help in categorizing your videos
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: 1, width: "100%" }}>
            <InputLabel id="select-label">
              Suitable age group for the clip
            </InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              name="contentRating"
              value={modalData.contentRating}
              onChange={(e) =>
                setModalData({ ...modalData, contentRating: e.target.value })
              }
              label="Suitable age group for the clip"
              sx={{ width: "100%" }}
            >
              <MenuItem value={"7+"}>7+</MenuItem>
              <MenuItem value={"12+"}>12+</MenuItem>
              <MenuItem value={"16+"}>16+</MenuItem>
              <MenuItem value={"18+"}>18+</MenuItem>
            </Select>
            <FormHelperText>
              This will be used to filter videos on age group suitability
            </FormHelperText>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Release date"
              value={value}
              name="releaseDate"
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "100%" }}
                  helpertext={"This will be used to sort videos"}
                />
              )}
            />
          </LocalizationProvider>
          <Stack
            mt={2}
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <Button
              variant="contained"
              sx={{ bgcolor: "#EE1520", color: "white" }}
              onClick={uploadHandler}
            >
              Upload Video
            </Button>
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Stack>
        </div>
      </div>
    </Dialog>
  );
}

export default function Header({ setSearchFilter, hedearComponents = false }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <header>
      <nav>
        <div className="headerContainer">
          <Link to="/">
            <div className="logoContainer">
              <span style={{ color: "#EE1520" }}>X</span>
              <span style={{ color: "#ffffff" }}>Flix</span>
            </div>
          </Link>
          {hedearComponents && (
            <>
              <div className="searchBoxContainer">
                <BootstrapInput
                  sx={{
                    minWidth: "573px",
                  }}
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Search"
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{
                    height: "30px",
                    bgcolor: "#313131",
                    color: "text.secondary",
                    border: "1px solid #444D56",
                    borderRadius: "0px 2px 2px 0px",
                  }}
                >
                  <SearchIcon />
                </Button>
              </div>
              <div className="uploadButtonContainer">
                <Button
                  variant="contained"
                  sx={{ height: "30px", color: "white", fontSize: "12px" }}
                  startIcon={<UploadIcon />}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Upload
                </Button>{" "}
              </div>
            </>
          )}
        </div>
        <SimpleDialog
          selectedValue={"jjsjs"}
          open={open}
          onClose={handleClose}
        />
      </nav>
    </header>
  );
}
