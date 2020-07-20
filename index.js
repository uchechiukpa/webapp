const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('./db');
var fs = require("fs");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json())
//ROUTES

//get all users
router.get("/", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users")

        res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message)
    }
});

//get a user
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const name = await pool.query("SELECT * FROM users WHERE name_id = $1", [id]);

        res.json(name.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});

//create a user
router.post("/", async (req, res) => {
    const data = {
        firstname: req.body.fullname,
        lastname: req.body.username,
        email: req.body.email,
        

    }

   
    try {
        const usersimage = await pool.query("INSERT INTO users (lastname, lastname, email) VALUES($1,$2,$3) RETURNING *", [data.firstname, data.lastname, data.email]);
        res.json(usersimage.rows[0])
    } catch (err) {
        console.error(err.message)
    }
   
});



//update a user
router.put("/:id", async (req, res) => {
    const data = {
        firstname: req.body.fullname,
        lastname: req.body.username,
        email: req.body.email,
        
    }
    try {
        const usersimage = await pool.query("UPDATE users SET firstname=$1, lastname=$2, email=$3 WHERE name_id=$8", [data.firstname, data.lastname, data.email,  data.id]);
        res.json(usersimage.rows[0])
    } catch (err) {
        console.error(err.message)
    }

})

// delete a user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE name_id = $1", [id]);

        res.json('User has been Deleted')
    } catch (err) {
        console.error(err.message)
    }
});




module.exports = router;



