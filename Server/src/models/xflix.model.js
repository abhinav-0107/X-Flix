const mongoose = require("mongoose");
const xflixSchema = mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  contentRating: {
    type: String,
    require: true,
    trim: true,
  },
  previewImage: {
    type: String,
    trim: true,
    default:
      "https://play-lh.googleusercontent.com/h5e_W1mUKxg_yx33Aq6B6v39owOTYh16XrHbCUMAwWSkQrc75iKnK9upxzLRV8PrTrQP",
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  votes: {
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
  },
  viewCount: { type: Number, default: 0 },
});

const Xflix = mongoose.model("xflix", xflixSchema);

module.exports = { Xflix };
