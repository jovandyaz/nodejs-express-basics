const { Router } = require("express");

const router = Router();

router.get('/home', (req, res) => {
    const isActive = false;
    const title = 'Welcome to my server';
    res.render('index', { title, isActive });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard from server' });
});

router.get('/about', (req, res) => {
    res.send('<h1>About this world</h1>');
});

module.exports = router;