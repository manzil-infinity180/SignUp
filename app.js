const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const Email = req.body.email;

  const data = {
    members: [
      {
        email_address: Email,
        status: "subscribed",
        merge_field: {
          FNAME: firstName,
          LNAME: lastName
        },
      },
    ],
  };
  const JSONdata = JSON.stringify(data);
  const url = process.env.URL;
 
  const option = {
    method: "POST",
    auth: `rahul1:${process.env.ID}`
  };

  var request = https.request(url, option, function (response) {
     if (response.statusCode === 200) {
          res.sendFile(__dirname+ "/sucess.html");
     }else{
          res.sendFile(__dirname+ "/failure.html");
     }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(JSONdata);
  request.end();
  
});

app.post("/failure",function(req,res){
     res.redirect("/");
})
app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on Port 3000");
});
