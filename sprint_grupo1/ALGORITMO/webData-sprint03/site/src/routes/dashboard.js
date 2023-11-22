var express = require("express");
var router = express.Router();

var dashboardController = require ("../controllers/dashboardController")

router.post("/buscarUltimasMedidas/:idSensor", function (req, res) {
   dashboardController.buscarMedidasEmTempoReal(req, res);
})
router.get("/buscarMedidasEmTempoReal/:idSensor", function (req, res) {
   dashboardController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router