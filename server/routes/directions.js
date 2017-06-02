const getDirections = require('../google').getDirections

//add logger
module.exports = (req, res, next) => {
  getDirections(req.query.start, req.query.end)
  .then(results => {
    res.json(results)
  })
  .catch(err => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  })
}