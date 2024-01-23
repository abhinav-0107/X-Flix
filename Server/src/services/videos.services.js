const { Xflix } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { isEmpty } = require("lodash");
const { sortVideos } = require("../utils/sortVideos");

const saveNewVideo = async (data) => {
  try {
    if (isEmpty(data)) {
      throw new ApiError(httpStatus.NO_CONTENT, "Empty object not accepted.");
    }
    const videoInstance = await Xflix.create(data);
    if (isEmpty(videoInstance)) {
      res.status(https.NO_CONTENT).send({
        status: false,
        message: "video not added!",
      });
      return;
    }
    return videoInstance;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message || "Bad Request");
  }
};

const getAllVOD = async (sortBy, title, contentRating, genres) => {
  try {
    const titleQuery = title
      ? { title: { $regex: new RegExp(title, "i") } }
      : null;
    const contentRatingQuery =
      contentRating === "Anyone"
        ? null
        : { contentRating: { $in: contentRating.split(",") } };
    const genresQuery =
      genres === "All" ? null : { genre: { $in: genres.split(",") } };

    let result = await Xflix.find({
      ...titleQuery,
      ...contentRatingQuery,
      ...genresQuery,
    });
    if (isEmpty(result)) {
      throw new ApiError(httpStatus.NOT_FOUND, "No videos Found");
    }
    if (sortBy) {
      result = sortVideos(sortBy, result);
    }
    return result;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message || "Bad Request");
  }
};

const getSpecificVOD = async (videoId) => {
  try {
    if (!videoId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Enter Proper video Id.");
    }
    const result = await Xflix.findById(videoId);
    if (isEmpty(result)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "No video found with matching id"
      );
    }
    return result;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message || "Bad Request");
  }
};

const updateVoteServ = async (videoId, body) => {
  try {
    if (!videoId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Enter Proper video Id.");
    }
    let { vote, change } = body;
    const vidoeData = await Xflix.findById({ _id: videoId });
    if (isEmpty(vidoeData) || !vidoeData) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "No video found with matching id"
      );
    }
    vote = vote + "s";
    let currentVoteValue = Number(vidoeData.votes[vote]);
    const updatedVoteObj = {
      ...vidoeData.votes,
      [vote]:
        change === "increase"
          ? ++currentVoteValue
          : currentVoteValue
          ? Math.abs(--currentVoteValue)
          : currentVoteValue,
    };
    vidoeData.votes = updatedVoteObj;
    const updatedVideo = await vidoeData.save();
    return updatedVideo;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message || "Bad Request");
  }
};

const updateViewsServ = async (videoId) => {
  if (!videoId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Enter Proper video Id.");
  }
  const vidoeData = await Xflix.findById({ _id: videoId });
  if (isEmpty(vidoeData) || !vidoeData) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }

  vidoeData.viewCount = ++vidoeData.viewCount;
  const updatedVideo = await vidoeData.save();
  return updatedVideo;
};

module.exports = {
  saveNewVideo,
  getAllVOD,
  getSpecificVOD,
  updateVoteServ,
  updateViewsServ,
};
