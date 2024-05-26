const express = require("express");
const router = express.Router();
const path = require("path");
const Joi = require('joi');
const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const {
    buildCAClient,
    registerAndEnrollUser,
    enrollAdmin,
} = require("../utils/CAUtil.js");
const { getConfigurationFile, buildWallet } = require("../utils/AppUtil.js");

const createUserSchema = Joi.object({
    userId: Joi.string().required(),
    orgName: Joi.string().required(),
    caName: Joi.string().required()
});

router.post("/api/create-user", async (req, res) => {
    try {
        
        const { error, value } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { userId, orgName, caName } = value;

        const ccp = getConfigurationFile();

        const caClient = buildCAClient(FabricCAServices, ccp, caName);

        const walletPath = path.join(__dirname, '..', '..', 'wallet', orgName);

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, orgName);

        await registerAndEnrollUser(caClient, wallet, orgName, userId, "");

        res.status(200).json({
            success: true,
            message: `User ${userId} registered and enrolled successfully in organization ${orgName}`,
        });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

module.exports = router;