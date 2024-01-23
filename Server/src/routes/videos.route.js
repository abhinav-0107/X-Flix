const express = require("express");
const { videoControllers } = require("../controllers");
const validate = require("../middlewares/validate");
const { videoValidation } = require("../validations");
const router = express.Router();

router.get(
  "/",
  validate(videoValidation.videoQueries),
  videoControllers.getAllVideos
);

router.get(
  "/:videoId",
  validate(videoValidation.videoId),
  videoControllers.getVideoById
);

router.post(
  "/",
  validate(videoValidation.videoObject),
  videoControllers.createNewVideo
);

router.patch(
  "/:videoId/votes",
  validate(videoValidation.videoId),
  validate(videoValidation.voteObject),
  videoControllers.updateVotes
);

router.patch(
  "/:videoId/views",
  validate(videoValidation.videoId),
  videoControllers.updateViews
);

module.exports = router;
