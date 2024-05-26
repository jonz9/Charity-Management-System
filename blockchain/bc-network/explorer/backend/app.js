const express = require("express");
const middleware = require("./middleware/middleware.js");
const callChaincodeFunctionRoute = require('./routes/callChaincodeFunctionRoute.js');
const createUserRoute = require('./routes/createUserRoute.js');
const runScriptsRoute = require('./routes/runScriptsRoute.js');
const getJsonRoute = require('./routes/getJsonRoute.js');
const utils = require('./utils/utils.js');


var apiName;
const apiVersion = "1.00";
const blockchainPlatform = "AKB";
const dashesString = "-".repeat(78);

const app = express();

app.use(middleware);

app.use("/callChaincode", callChaincodeFunctionRoute);
app.use("/users", createUserRoute);
app.use("/scripts", runScriptsRoute);
app.use("/json", getJsonRoute);


app.get("/", (req, res) => {
  apiName = req.body;
  res
    .status(200)
    .send(
      `{"apiName":"${apiName}","apiVersion":"${apiVersion}","blockchainPlatform":"${blockchainPlatform}"}`
    );
});


const port = process.env.PORT || 8000;

// Avvia il web server Express
const HOST = "0.0.0.0";
// const options = {
// 	key: fs.readFileSync("./key.pem"),
// 	cert: fs.readFileSync("./cert.pem")
// };

// const server = https.createServer(options, app);
app.listen(port, HOST, () => {
  utils.registerInitialUsers();
  console.log(
    `ExplorerAPI server started on host ${HOST}, port ${port}, ${blockchainPlatform} Platform, ${apiName}`
  );
});
