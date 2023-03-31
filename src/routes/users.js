const { Router } = require("express");
const axios = require('axios');

const router = Router();

router.get('/users', (req, res) => {
    const users = [
        { name: 'John', age: 20 },
        { name: 'Jane', age: 25 },
        { name: 'Peter', age: 30 },
    ];

    // res.json(users);
    res.render('users', { title: 'Users', users, posts: [] });
});

router.get('/posts', async (req, res) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.render('users', { title: 'Posts', users: [], posts: data });
});


module.exports = router;