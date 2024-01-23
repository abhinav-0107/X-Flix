const { videoService } = require("../services");
const https = require("http-status");
const catchAsync = require("../utils/catchAsync");

const createNewVideo = catchAsync(async (req, res) => {
  const { body } = req;
  const videoObject = await videoService.saveNewVideo(body);

  if (videoObject) res.status(https.CREATED).send(videoObject);
});

const getAllVideos = catchAsync(async (req, res) => {
  const { query } = req;
  const {
    sortBy = null,
    title = "",
    contentRating = "Anyone",
    genres = "All",
  } = query;
  const videos = await videoService.getAllVOD(
    sortBy,
    title,
    contentRating,
    genres
  );
  if (videos)
    res.status(https.OK).send({
      status: true,
      message: "successfull!",
      videos,
    });
});

const getVideoById = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const video = await videoService.getSpecificVOD(videoId);
  if (video)
  res.status(https.OK).send(video);
});

const updateVotes = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { body } = req;
  const updatedVideo = await videoService.updateVoteServ(videoId, body);
  if (updatedVideo) res.sendStatus(https.NO_CONTENT);
});

const updateViews = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const updatedVideo = await videoService.updateViewsServ(videoId);
  if (updatedVideo) res.sendStatus(https.NO_CONTENT);
});

module.exports = {
  createNewVideo,
  getAllVideos,
  getVideoById,
  updateVotes,
  updateViews,
};
