const sortVideos = (sortBy, result) => {
  const sortedVideos = result?.sort((a, b) => b[sortBy] - a[sortBy]);
  return sortedVideos;
};

module.exports = { sortVideos };
