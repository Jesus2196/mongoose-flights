const Flight = require("../models/flight");

module.exports = {
  create,
  delete: deleteDest,
};

function create(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    flight.destinations.push(req.body);
    flight.save(function (err) {
      res.redirect(`/flights/${req.params.id}`);
    });
  });
}

function deleteDest(req, res) {
  Flight.findOne({ 'destinations._id': req.params.id }, function (err, flight) {
    const destSubdoc = flight.destinations.id(req.params.id);
    destSubdoc.remove();
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`);
    });
  });
}