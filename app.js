const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const keys = require("./key.js")
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res) {
      var info = req.body.zipinfo
      const zipCode = info;
      const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial&appid="+ keys.keyId;
      https.get(url, function(response) {
            console.log(response.statusCode);
            response.on("data", function(data) {
              const weatherData = JSON.parse(data);
              const weatherDescription = weatherData.weather[0].description;
              const weatherTemp = weatherData.main.temp;
              const image = weatherData.weather[0].icon;
              const imageUrl = "http://openweathermap.org/img/wn/" + image + "@2x.png";
              res.header("content-type", "text/html");
              res.write("<img src=" + imageUrl + " >");
              res.write("<h1>The Temperature in this zipcode is " + weatherTemp + "degrees</h1>");
              res.write("<p> There are " + weatherDescription + " above you</p>");
              res.send();

            })
})
})



            app.listen(3000, function() {
              console.log("Port 3000 is listening")
            })
