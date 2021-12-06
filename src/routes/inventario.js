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
const { unlink } = require('fs-extra');

const Chart = require('chart.js');

router.get('/upload', isAuthenticated, (req, res) => {
    res.render('upload');
});


router.get('/inventario', isAuthenticated, async (req, res) => {
    const producto = await Producto.find({ user: req.user.id});
    res.render('inventario', { producto });
});

router.post('/upload', isAuthenticated , async (req, res) => {
    const producto = new Producto();
    producto.user = req.user.id;
    producto.sku = req.body.sku;
    producto.nombre_producto = req.body.nombre_producto;
    producto.proveedor = req.body.proveedor;
    producto.descripcion = req.body.descripcion;
    producto.precio_sku_producto = req.body.precio_sku_producto;
    producto.stock = req.body.stock;
    producto.filename = req.file.filename;
    producto.path = '/img/uploads/' + req.file.filename;
    producto.originalname = req.file.originalname;
    producto.mimetype = req.file.mimetype;
    producto.size = req.file.size;
    await producto.save();
    req.flash('success_msg', 'Producto registrado con exito');
    res.redirect('/inventario');
});

router.get('/inventario/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    res.render('profile', { producto  });
});

router.get('/inventario/:id/delete',isAuthenticated,  async (req, res) => {
    const { id } = req.params;
    const productoDeleted = await Producto.findByIdAndDelete(id);
    await unlink(path.resolve('/img/uploads/' + productoDeleted.path));
    req.flash('error_msg', `Producto borrado `);
    res.redirect('/inventario');
});

router.get('/buscar', isAuthenticated, async (req, res) => {
        if(req.query.search) {
            const producto = await Producto.find({
                user: req.user.id,
                sku: req.query.search,                
            });
            res.render('buscar', { producto })
        }
});

router.get('/inventario/:id/edit',isAuthenticated,  async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.render({ producto });
});
  
  router.put('/inventario/edit-pro/:id', isAuthenticated, async (req, res) => {
    const { nombre_producto, proveedor, descripcion, precio_sku_producto, stock } = req.body;
    await Producto.findByIdAndUpdate(req.params.id, { nombre_producto, proveedor, descripcion, precio_sku_producto, stock });
    req.flash("success_msg", "Actualizacion exitosa");
    res.redirect("/inventario");
  });
module.exports = router;