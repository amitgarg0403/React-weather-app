
// "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit
// const apiKey = "0c8c5a5750c92bc629e20369198568c5";

require('dotenv').config();
const express = require('express');
const cors = require("cors");
const axios = require('axios')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;


app.get("/", (req,res)=>{
    res.send("Hello World ")
})

app.get("/:cityname/:units", (req,res) =>{
    console.log(req.params);
    let city = req.params.cityname;
    let unit = req.params.units === "C" ? "metric" : "imperial";
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ unit +"&appid="+ process.env.API_KEY
    console.log(url);
    axios.get(url)
    .then(response=>{
        res.send(response.data)
    })
    .catch(err=>{
        console.error("Error fetching weather data:");
            if (err.response && err.response.status === 404) {
                // If the error response status is 404, send "City not found" message with 404 status code
                console.log(1);
                res.send({message: "City not found"});
            } else {
                // For other errors, send a generic error message with 500 status code
                console.log(2);
                res.status(500).send("Error fetching weather data. Please try again later.");
            }
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

