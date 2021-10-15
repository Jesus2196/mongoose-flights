const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight,
}

function index(req, res) {
    Flight.find({}, function (err, flights) {
        res.render('flights/index', { flights: flights })
    });
}

function newFlight(req, res) {
    res.render('flights/new')
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    let flight = new Flight(req.body);
    flight.save(function (err) {
        if (err) return res.redirect('/flights/new');
        res.redirect('/flights');
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        Ticket.find({ flight: flight._id }, function (err, tickets) {
            res.render('flights/show', {
                title: 'Flight',
                flight, tickets
            });
        });
    });
};


function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, function (err) {
        res.redirect("/flights");
    });
}