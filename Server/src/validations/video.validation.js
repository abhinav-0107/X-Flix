const Joi = require("joi");
const {
  genreCategories,
  ratingValues,
  voteTypes,
  voteValues,
  sortBy,
} = require("../utils/validationList");
const {
  isValidMongoId,
  isValidGenre,
  isValidRating,
} = require("./custom.validation");

const videoObject = {
  body: Joi.object().keys({
    videoLink: Joi.string()
      .required()
      .pattern(
        new RegExp("^(?:https://www.youtube.com/embed/|youtube.com/embed/)")
      ),
    title: Joi.string().required(),
    genre: Joi.string()
      .required()
      .valid(...genreCategories),
    contentRating: Joi.string()
      .required()
      .valid(...ratingValues),
    previewImage: Joi.string(),
    releaseDate: Joi.date().required(),
    votes: Joi.object().keys({
      upVotes: Joi.string(),
      downVotes: Joi.string(),
    }),
    viewCount: Joi.number(),
  }),
};

const videoId = {
  params: Joi.object().keys({
    videoId: Joi.string().required().custom(isValidMongoId),
  }),
};

const voteObject = {
  body: Joi.object().keys({
    vote: Joi.string()
      .required()
      .valid(...voteTypes),
    change: Joi.string()
      .required()
      .valid(...voteValues),
  }),
};

const videoQueries = {
  query: Joi.object().keys({
    sortBy: Joi.string().valid(...sortBy),
    title: Joi.string(),
    genres: Joi.custom(isValidGenre),
    contentRating: Joi.custom(isValidRating),
  }),
};

module.exports = { videoObject, videoId, voteObject, videoQueries };
