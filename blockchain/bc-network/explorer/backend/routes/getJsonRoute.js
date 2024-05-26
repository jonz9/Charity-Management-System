const express = require("express");
const router = express.Router();
const path = require("path");
const Joi = require('joi');
const { generateJSONForChaincodes } = require("../utils/jsonCreator.js");
const fs = require("fs").promises;
const exec = require('child_process').exec;

const getJsonSchema = Joi.object({
    chaincodeName: Joi.string().required()
});

router.put("/api/getJson", async (req, res) => {
    const { error, value } = getJsonSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { chaincodeName } = value;

    const dynamicDirPath = path.join(
        __dirname,
        `../../../../chaincode/${chaincodeName}/lib`
    );

    try {
        await fs.access(dynamicDirPath);
        const responseObj = {};
        const { functions, getFunctions, fileFunctions } =
            generateJSONForChaincodes(dynamicDirPath);
        const functionsFilePath = path.join(__dirname, "..", "..", "functions.json");
        const fOutputString = JSON.stringify(fileFunctions, null, 2);
        await fs.writeFile(functionsFilePath, fOutputString);
        const invokeFunctions = functions;
        const queryFunctions = getFunctions;

        responseObj.invokeFunctions = invokeFunctions;
        responseObj.queryFunctions = queryFunctions;
        res.json(responseObj);
    } catch (err) {
        if (err.code === "ENOENT") {
            return res
                .status(404)
                .json({ error: "Chaincode library directory not found" });
        }
        return res.status(500).json({ error: err.message });
    }
});

router.get("/editConfig", (req, res) => {
  const scriptPath = path.join(__dirname, "..", "globalParams.sh");

  const command = `bash -c 'source ${scriptPath} && exportNetworkParams && exportChannel1Params && echo CHANNEL_NAME="$CHANNEL_NAME" CHANNEL_PROFILE="$CHANNEL_PROFILE" ORDERER_PORT="$ORDERER_PORT" CHANNEL_CREATOR="$CHANNEL_CREATOR" CHANNEL_ORDERER_NAME="$CHANNEL_ORDERER_NAME" CHANNEL_MEMBER1_NODE="$CHANNEL_MEMBER1_NODE" CHANNEL_MEMBER1_ORG="$CHANNEL_MEMBER1_ORG" CHANNEL_MEMBER2_NODE="$CHANNEL_MEMBER2_NODE" CHANNEL_MEMBER2_ORG="$CHANNEL_MEMBER2_ORG" CHANNEL_MEMBER3_NODE="$CHANNEL_MEMBER3_NODE" CHANNEL_MEMBER3_ORG="$CHANNEL_MEMBER3_ORG"'`;

  exec(command, async (error, stdout, stderr) => {  
      if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send("Error executing script");
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send("Script error output");
    }

    const lines = stdout.split(' ');
    const variables = lines.reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) {
            acc[key.trim()] = value.trim().replace(/^"|"$/g, ''); // Removing surrounding quotes if present
        }
        return acc;
    }, {});

    if (Object.keys(variables).length === 0) {
      return res.status(500).send("No matching environment variables found.");
    }

    const jsonContent = JSON.stringify(variables, null, 2);

    try {
      await fs.writeFile(path.join(__dirname, "inputs.json"), jsonContent);
      res.status(200).json(variables);
    } catch (writeError) {
      console.error(`Error writing JSON to file: ${writeError}`);
      res.status(500).send("Error writing JSON to file");
    }
  });
});

module.exports = router;
