const express = require("express");
const router = express.Router();
const path = require('path');
const User = require("../models/User");
const Ventas = require("../models/Ventas");
const Producto = require("../models/Producto");
const passport = require ("passport");
const { model } = require("mongoose");
const flash = require("connect-flash");
const { truncate } = require("fs/promises");
const { isAuthenticated } = require("../helpers/auth");

const Chart = require('chart.js');




// New code 
router.get('/ventas', isAuthenticated, (req, res) => {
    res.render('ventas');
});
router.post('/ventas' , isAuthenticated, async (req, res) => {
    const venta = new Ventas();
    venta.name_cli = req.body.name_cli;
    venta.cedula_cli = req.body.cedula_cli;
    venta.email_cli = req.body.email_cli;
    venta.cel_cli = req.body.cel_cli;
    venta.direccion_cli = req.body.direccion_cli;
    venta.user = req.user.id;
    venta.valor_total = req.body.valor_total;

    await venta.save();
    console.log(venta)
    req.flash('success_msg', 'Venta registrada con exito');
    res.redirect('/ventas');

});

router.get('/reportes', isAuthenticated, async (req, res) => {
    const venta = await Ventas.find({user: req.user.id});
    res.render('reportes', { venta });
});
router.get('/reportes', isAuthenticated, async (req, res) => {
    res.render('reportes');
});


router.get('/clientes', isAuthenticated, async (req, res) => {
    const venta = await Ventas.find({user: req.user.id});
    res.render('clientes', { venta });
});
router.get('/clientes', isAuthenticated, async (req, res) => {
    res.render('clientes');
});


module.exports = router;