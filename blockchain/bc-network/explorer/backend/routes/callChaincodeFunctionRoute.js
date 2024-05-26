const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs").promises;
const Joi = require("joi");
const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require("../utils/CAUtil.js");
const { getConfigurationFile, buildWallet } = require("../utils/AppUtil.js");
const utils = require("../utils/utils.js");

const walletPath = path.join(__dirname, "..", "..", "wallet");

const callChaincodeFunctionSchema = Joi.object({
  functionName: Joi.string().required(),
  arguments: Joi.array().items(Joi.string()).required(),
  orgName: Joi.string().required(),
  userId: Joi.string().required(),
  channelName: Joi.string().required(),
  chaincodeName: Joi.string().required(),
});

async function main(
  functionName,
  args,
  adminOrg,
  userId,
  caName,
  channelName,
  chaincodeName
) {
  try {
    const ccp = getConfigurationFile();

    const caClient = buildCAClient(FabricCAServices, ccp, caName);

    const wallet = await buildWallet(Wallets, walletPath);

    await enrollAdmin(caClient, wallet, adminOrg);

    await registerAndEnrollUser(caClient, wallet, adminOrg, userId, "");

    const gateway = new Gateway();

    try {
      await gateway.connect(ccp, {
        wallet,
        identity: userId,
        discovery: { enabled: true, asLocalhost: true },
      });
      const network = await gateway.getNetwork(channelName);

      const contract = network.getContract(chaincodeName);

      console.log("\n--> Submit Transaction: calling chaincode function");
      const result = await contract.submitTransaction(functionName, ...args);
      const resultString = result.toString();

      // Log the detailed result
      console.log("Result from chaincode:", resultString);

      // Create a detailed success message
      const successMessage = `Function '${functionName}' with arguments [${args.join(
        ", "
      )}] invoked to the network successfully.`;
      console.log(successMessage);

      // Return both result and message
      return { result: resultString, message: successMessage };
    } finally {
      gateway.disconnect();
    }
  } catch (error) {
    // Create a detailed error message
    const errorMessage = `Error invoking function '${functionName}' with arguments [${args.join(
      ", "
    )}]: ${error}`;
    console.error(errorMessage);

    // Throw an Error with the detailed message to be caught by the caller
    throw new Error(errorMessage);
  }
}

router.post("/api/call-chaincode-function", async (req, res) => {
  try {
    const { error, value } = callChaincodeFunctionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      functionName,
      arguments: args,
      orgName,
      userId,
      channelName,
      chaincodeName,
    } = value;

    const ccp = getConfigurationFile();
    const caName = utils.findCaName(ccp.certificateAuthorities);

    // Read and parse the functions.json file
    const functionsJsonPath = path.join(
      __dirname,
      "..",
      "..",
      "functions.json"
    );
    const jsonString = await fs.readFile(functionsJsonPath, "utf8");
    const jsonData = JSON.parse(jsonString);

    // Find the function definition
    const functionDef = jsonData.find((fn) => fn.name === functionName);

    if (!functionDef) {
      return res.status(404).json({ error: "Function definition not found" });
    }

    // Sort and convert args to array based on the function definition
    const sortedArgs = functionDef.inputs.map((input) => args[input.name]);

    // Call the main function with sorted arguments
    const { result, message } = await main(
      functionName,
      sortedArgs,
      orgName,
      userId,
      caName,
      channelName,
      chaincodeName
    );

    // Send back a success response
    res.status(200).json({ result, message });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

module.exports = router;
