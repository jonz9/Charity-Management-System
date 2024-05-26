const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require("./CAUtil.js");
const { getConfigurationFile, buildWallet } = require("./AppUtil.js");

const walletPath = path.join(__dirname, '..', '..', 'wallet');

async function registerInitialUsers() {
    const ccp = getConfigurationFile();
    let orgs = ccp.organizations;
    for (let orgUserId in Object.keys(orgs)) {
        let org = orgs[Object.keys(orgs)[orgUserId]];
        for (let user in org.users) {
            const caName = findCaName(ccp.certificateAuthorities);

            const caClient = buildCAClient(FabricCAServices, ccp, caName);

            const wallet = await buildWallet(Wallets, walletPath);

            await enrollAdmin(caClient, wallet, org.mspid);

            await registerAndEnrollUser(
                caClient,
                wallet,
                org.mspid,
                org.users[user],
                ""
            );
        }
    }
}

function findCaName(obj) {
    for (let key in obj) {
        if (obj[key] && obj[key].hasOwnProperty("caName")) {
            return obj[key].caName;
        }
    }
    return null;
}

module.exports = { findCaName, registerInitialUsers};