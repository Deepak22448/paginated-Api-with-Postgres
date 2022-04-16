const paginatedResults = ({ tabel, client }) => {
  return async (req, res, next) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const response = await client.query(`SELECT * FROM ${tabel}`);
    const data = response.rows;

    results.result = data.slice(startIndex, endIndex);
    if (endIndex < data.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0)
      results.previous = {
        page: page - 1,
        limit,
      };

    results.total_pages = Math.floor(data.length / limit);
    res.paginatedResults = results;
    next();
  };
};

module.exports = paginatedResults;
