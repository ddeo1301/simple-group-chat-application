const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res) => {
  res.send(`
    <form action="/username" method="POST"  
      onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
      <input type="text" name="username" id="username" placeholder="Enter username">
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/username", (req, res) => {
  //console.log('hlw');
  //console.log(req.body.username)
  fs.appendFile("username.txt", `${req.body.username}   `, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.redirect("/message");
});

app.get("/message", (req, res) => {
  //console.log('how r u');
  //fs.readFile("username.txt", (err, data) => {
    fs.readFile("message.txt", (err, data) => {
    //console.log('inside bracket');
    if (err) {
      data = "No username found";
    }
    res.send(`
      ${data}
      <form action="/login" method="POST"  
        onsubmit="document.getElementById('username').value =localStorage.getItem('username')">
        <input type="text" name="message" id="message" placeholder="Enter message">
        <input type="hidden" name="username" id="username">
        <br>
        <button type="submit">Send</button>
      </form>
    `);
  });
});

app.post("/login", (req, res) => {
  //console.log(req.body.username,123);
  //console.log(req.body.message);
  //fs.appendFile("username.txt", ` ${req.body.username} : ${req.body.message} \n`, (err) => {
    fs.appendFile("message.txt", ` ${req.body.username} : ${req.body.message} \n`, (err) => {
  //fs.writeFile("username.txt", ` ${req.body.username} : ${req.body.message} \n`, (err) => {
    console.log(req.body.username);
    console.log(req.body.message);
    if (err) {
      console.log(err);
    }
    // res.redirect("/");
    res.redirect("/message"); 
  });
});

app.listen(2500);