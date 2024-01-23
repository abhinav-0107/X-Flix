import React, { useEffect, useState } from "react";
import DashBoard from "./DashBoard";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Stack from "@mui/material/Stack";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Divider from "@mui/material/Divider";
import endpoint from "../Server/MockServer";
import axios from "axios";
import Header from "./Header";
import { useParams } from "react-router-dom";

const voteButtons = {
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  textTransform: "capitalize",
  background: "#313131",
  borderRadius: "16px",
  color: "#FFFFFF",
  fontWeight: "400",
  fontFamily: "Roboto",
  padding: " 7px 14px",
};
const headingStyle = {
  fontWeight: "700",
  fontSize: "24px",
  lineHeight: "28px",
  color: "#FFFFFF",
};
const subHeadingStyle = {
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "16px",
  color: "#C2C2C2",
};
export default function VideoStream() {
  const param = useParams();
  const [data, setData] = useState("");
  const makeApiCall = (id) => {
    axios
      .get(`${endpoint.key}/v1/videos/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
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
  const upvoteHandler = () => {
    const body = {
      vote: "upVote",
      change: "increase",
    };
    axios
      .patch(`${endpoint.key}/v1/videos/${param.id}/votes`, body)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const downvoteHandler = () => {
    const body = {
      vote: "downVote",
      change: "increase",
    };
    axios
      .patch(`${endpoint.key}/v1/videos/${param.id}/votes`, body)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const viewCountApi = () => {
    axios
      .patch(`${endpoint.key}/v1/videos/${param.id}/views`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    makeApiCall(param.id);
    viewCountApi();
    console.log(param);
  }, [param]);

  return (
    <>
      <Header />
      <section>
        <div
          className="videoStremingContainer"
          style={{
            padding: "24px 144px",
            background: "#181818",
            paddingBottom: 0,
          }}
        >
          {data && (
            <>
              <div
                className="videoPlayer"
                style={{ width: "100%", height: "523px" }}
              >
                <iframe
                  width={"100%"}
                  height={"100%"}
                  style={{ borderRadius: "10.449px" }}
                  src={`https://www.${data?.videoLink}`}
                  frameborder="0"
                  title="youtube"
                ></iframe>
              </div>
              <Stack
                className="metaDataContainer"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={0}
                mt={3}
              >
                <div className="leftSideMeta">
                  <span style={headingStyle}>{data.title}</span>
                  <Stack
                    className="rratingRelaeseDate"
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    style={subHeadingStyle}
                    mt={2}
                  >
                    <span>{data.contentRating}</span>
                    <FiberManualRecordIcon sx={{ fontSize: "10px" }} />
                    <span>{releaseDateSimplifier(data.releaseDate)}</span>
                  </Stack>
                </div>
                <Stack
                  className="votingButtons"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Button
                    sx={voteButtons}
                    onClick={upvoteHandler}
                    startIcon={<ThumbUpIcon sx={{ color: "#797979" }} />}
                  >
                    {data.votes.upVotes}K
                  </Button>
                  <Button
                    sx={voteButtons}
                    onClick={downvoteHandler}
                    startIcon={<ThumbDownIcon sx={{ color: "#797979" }} />}
                  >
                    {data.votes.downVotes}K
                  </Button>
                </Stack>
              </Stack>
              <Divider
                variant="fullWidth"
                sx={{ color: "#181818", marginTop: "25px" }}
                mt={3}
              />
            </>
          )}
        </div>
      </section>
      <DashBoard />
    </>
  );
}
