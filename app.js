const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");
// const { redirect } = require("express/lib/response");
// const https = require("https");
const mongoose = require("mongoose");

const app = express();
// const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

//database

main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect("mongodb://localhost:27017/todolistDB");
  await mongoose.connect(
    "mongodb+srv://sandun-induwara:787898Test@cluster0.tklkw.mongodb.net/todolistDB"
  );

  console.log(" connected to db");
}

const itemsSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 20 },
});

const Items = mongoose.model("Items", itemsSchema);

// const addData = (dbname, name) => {
//   const silence = new dbname({ name: name });
//   console.log("save successful -  " + silence.name);

//   silence.save();
// };

//-----------------

app.get("/", (req, res) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = days[d.getDay()];

  Items.find({}, (err, items) => {
    if (err) {
      console.log(err);
      // } else {
      //   if (!items[0]) {
      //     res.render("index.ejs", {
      //       date: day,
      //       items: [{ name: "Welcome !!!" }],
      //     });
    } else {
      res.render("index.ejs", { date: day, items: items });
      // }
    }
  });

  // res.render("index.ejs", { date: day, items: data });
  //   console.log(req);
});

app.post("/", (req, res) => {
  let item = req.body.item;

  if (item !== "") {
    // addData(Items, item);

    const silence = new Items({ name: item });
    // console.log("save successful -  " + item);

    silence.save();
    // items.push(item);
  }

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  let item = req.body;

  console.log(item);

  Items.deleteOne({ _id: item.delbut }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("delete succesful");
    }
  });
  res.redirect("/");
});

//

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
