const { genreCategories, ratingValues } = require("../utils/validationList");

function isValidMongoId(value, helpers) {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(value)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
}

const isValidGenre = (value, helpers) => {
  for (let genre of value.split(",")) {
    if (!genreCategories.includes(genre))
      return helpers.message(
        `"{{#label}}" must be a value in [${genreCategories}]`
      );
  }
  return value;
};

const isValidRating = (value, helpers) => {
  for (let rating of value.split(",")) {
    if (!ratingValues.includes(rating))
      return helpers.message(
        `"{{#label}}" must be a value in [${ratingValues}]`
      );
  }
  return value;
};

module.exports = { isValidMongoId, isValidGenre, isValidRating };
