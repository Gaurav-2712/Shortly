require('dotenv').config()
const express = require("express");
const { connectToMongoDB } = require("./connect");
const { checkAuth } = require("./middlewares/auth.js");
const cookieParser = require("cookie-parser");
const compression = require('compression');

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/StaticRoute');
const userRoute = require('./routes/user');

const URL = require("./models/url");
const path = require('path');

const app = express();
const PORT = process.env.PORT;

connectToMongoDB(process.env.MONGO_URL).then(() =>
  console.log("Mongodb connected")
);

app.set('view engine','ejs');
app.set('ejs',path.resolve('./views'))


app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(compression());

const staticPath = path.join(__dirname,"./public")
app.use(express.static(staticPath)); 

app.use("/url",checkAuth,urlRoute);
app.use('/user',checkAuth,userRoute);
app.use('/',checkAuth,staticRoute);


app.get("/shortly/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date(Date.now()),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.get("/*",(req,res)=>{
  res.render('error');
})

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
