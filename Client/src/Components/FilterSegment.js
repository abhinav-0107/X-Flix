import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import "./Header.css";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const generDataInitial = [
  {
    name: "All",
    state: true,
  },
  {
    name: "Education",
    state: false,
  },
  {
    name: "Sports",
    state: false,
  },
  {
    name: "Comedy",
    state: false,
  },
  {
    name: "Lifestyle",
    state: false,
  },
];

const ageGroupInitial = [
  {
    name: "Anyone",
    state: true,
  },
  {
    name: "7+",
    state: false,
  },
  {
    name: "12+",
    state: false,
  },
  {
    name: "16+",
    state: false,
  },
  {
    name: "18+",
    state: false,
  },
];
const buttonStyles = {
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  color: "text.primary",
  textTransform: "capitalize",
  fontWeight: "400",
  fontFamily: "Roboto",
};
const activeButtonStyles = {
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  textTransform: "capitalize",
  fontWeight: "400",
  fontFamily: "Roboto",
  background: "#FFFFFF",
  borderRadius: "16px",
  color: "#586069",
};
const releaseDateButtonStyles = {
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  textTransform: "capitalize",
  background: "#FFFFFF",
  borderRadius: "16px",
  color: "#586069",
  fontWeight: "400",
  fontFamily: "Roboto",
  "&:focus": {
    background: "#FFFFFF",
    borderRadius: "16px",
    color: "#586069",
  },
};

const filterButtonStack_46 = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  gap: "46px",
};
const filterButtonStack_72 = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  gap: "72px",
};
const filterButoonsContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: " 84px",
};
const filterSegmentContainer = {
  background: "#202020",
  display: "flex",
  justifyContent: "center",
  alignItems: "baseline",
  padding: " 3px 0",
};
export default function FilterSegment({ setFilterObject }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedMenu, setSelectedMenu] = React.useState("releaseDate");
  const [generData, setGenerData] = React.useState(generDataInitial);
  const [ageGroup, setAgeGroup] = React.useState(ageGroupInitial);
  const open = Boolean(anchorEl);

  const generHandler = (index) => {
    let tempObj = JSON.parse(JSON.stringify(generData));
    if (index === 0) {
      tempObj[index].state = !tempObj[index].state;
    } else {
      tempObj[index].state = !tempObj[index].state;
      tempObj[0].state = false;
    }
    setGenerData(tempObj);
  };
  const ageGroupHandler = (index) => {
    let tempObj = JSON.parse(JSON.stringify(ageGroup));
    tempObj.forEach((item, i) => {
      if (i === index) {
        item.state = true;
      } else {
        item.state = false;
      }
    });
    setAgeGroup(tempObj);
  };
  const fliterObjectMaker = () => {
    let obj = {
      gener: generData,
      ageGroup: ageGroup,
      sortBy: selectedMenu,
    };
    // setFilterOptions(obj)
    setFilterObject(obj);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (text) => {
    setAnchorEl(null);
    setSelectedMenu(text);
  };
  useEffect(() => {
    fliterObjectMaker();
  }, [selectedMenu, generData, ageGroup]);

  return (
    <section>
      <div style={filterSegmentContainer}>
        <div style={filterButoonsContainer}>
          <div style={filterButtonStack_46}>
            {generData.map((item, i) => {
              return (
                <Button
                  key={item.name.concat(i)}
                  sx={item.state ? activeButtonStyles : buttonStyles}
                  onClick={() => generHandler(i)}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
          <div style={filterButtonStack_72}>
            {ageGroup.map((item, i) => {
              return (
                <Button
                  key={item.name.concat(i)}
                  sx={item.state ? activeButtonStyles : buttonStyles}
                  onClick={() => ageGroupHandler(i)}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="releaseDateButtonContainer">
          <Button
            sx={releaseDateButtonStyles}
            startIcon={<ImportExportIcon />}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {selectedMenu}
          </Button>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleClose("releaseDate")}>
            Release Date
          </MenuItem>
          <MenuItem onClick={() => handleClose("viewCount")}>
            View Count
          </MenuItem>
        </Menu>
      </div>
    </section>
  );
}
