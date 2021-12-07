const express = require("express");
const router = express.Router();
const path = require('path');
const User = require("../models/User");
const passport = require ("passport");
const { model } = require("mongoose");
const flash = require("connect-flash");
const { truncate } = require("fs/promises");
const { isAuthenticated } = require("../helpers/auth");



// New code 

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin',passport.authenticate('local',{ 
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


router.get('/users/signup', isAuthenticated, (req,res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req,res) => {
    const { name, cedula, email, telefono, direccion ,name_place, nit, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push('Por favor inserta tu nombre');
    }
    if (cedula.length <=5) {
        errors.push('Por favor inserta una cedula valida');
    }
    if (cedula.length <=5) {
        errors.push('Por favor inserta un nit valida');
    }
    if (telefono.length < 6){
        errors.push('Por favor ingrese un numero de telefono valido');
    }
    if (direccion.length < 5) {
        errors.push('Por favor ingrese una direccion valida');
    }
    if (name_place.length < 5) {
        errors.push('Por favor ingrese un nombre  valido');
    }
    if (password != confirm_password) {
        errors.push('Las contraseñas no coiciden');
    }
    if (password.length < 4 ) {
        errors.push('La contraseña debe ser mayor a 4 caracteres');
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, cedula, email, telefono, direccion, name_place, nit});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El email ya esta registrado');
            res.redirect('/users/signup'); 
        } else {
            const newUser = new User ({name, cedula, email, telefono, direccion, name_place, nit, password});
            newUser.password  = await newUser.encryptPassword(password);
             newUser.user = req.user.id;
           await newUser.save();
           req.flash('success_msg', 'Registro de usuario con exito');
           res.redirect('/users/signup');
        }
       
    }
});

router.get('/users/perfil', isAuthenticated, async (req, res) => {
    res.render('perfil');
});
router.get('/users/perfil/:id/edit',isAuthenticated,  async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render({ user });
});

router.put('/users/perfil/edit-pro/:id', isAuthenticated, async (req, res) => {
    const { name, cedula, email, telefono, direccion } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, cedula, email, telefono, direccion});
    req.flash("success_msg", "Actualizacion exitosa");
    res.redirect('/users/perfil');
  });


router.get('/users/logout', isAuthenticated, (req, res) => {
    req.logOut();
    req.flash('success_msg', `Cerraste Sesión`);
    res.redirect('/users/signin');
});

module.exports = router;