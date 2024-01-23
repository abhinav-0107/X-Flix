import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import endpoint from "../Server/MockServer";
import { Link } from "react-router-dom";
import axios from "axios";

const imgClass = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
const headingStyle = {
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "16px",
  color: "#FFFFFF",
};
const subHeadingStyle = {
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "16px",
  color: "#D1D5DA",
};
export default function DashBoard({ dataSend }) {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(dataSend);
    if (!dataSend?.length) {
      makeApiCall();
    } else {
      setData(dataSend);
    }
  }, [dataSend]);

  const makeApiCall = () => {
    axios
      .get(`${endpoint.key}/v1/videos`)
      .then((res) => {
        console.log(res);
        setData(res.data.videos);
      })
      .catch((err) => console.log(err));
  };

  const releaseDateSimplifier = (str) => {
    const dateValue = new Date(str);
    const currentdateValue = new Date();
    const yearDiff = currentdateValue.getFullYear() - dateValue.getFullYear();
    if (yearDiff >= 1) {
      return `${yearDiff} years ago`;
    } else if (dateValue.getMonth() > 0) {
      return `${dateValue.getMonth()} months ago`;
    } else if (dateValue.getDay() > 0) {
      return `${dateValue.getDay()} days ago`;
    } else {
      return `${dateValue.getHours()} hours ago`;
    }
  };

  return (
    <section>
      <div
        className="dashBoardContainer"
        style={{ background: "#181818", padding: "24px 144px" }}
      >
        <Grid container spacing={2}>
          {data.length &&
            data?.map((item, i) => {
              return (
                <Grid key={i} item xs={3}>
                  <Link to={`/${item._id}`}>
                    <div style={{ cursor: "pointer" }}>
                      <Card
                        sx={{
                          maxWidth: 345,
                          backgroundColor: "#181818",
                          padding: 0,
                        }}
                      >
                        <img
                          style={imgClass}
                          // height="140"
                          src={item.previewImage}
                          alt="green iguana"
                        />
                      </Card>
                      <Typography gutterBottom component="div">
                        <span style={headingStyle}>{item.title}</span>
                      </Typography>
                      <Typography sx={subHeadingStyle} color="text.secondary">
                        {releaseDateSimplifier(item.releaseDate)}
                      </Typography>
                    </div>
                  </Link>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </section>
  );
}
