import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import VideoStream from "./Components/VideoStream";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<VideoStream />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
