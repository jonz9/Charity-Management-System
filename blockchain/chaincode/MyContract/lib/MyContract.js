"use strict";

  const { Contract } = require("fabric-contract-api"); const ClientIdentity = require("fabric-shim").ClientIdentity;

class MyContract extends Contract {
  async initLedger(ctx) {
    console.log("============= START : Initialize Ledger ===========");
    const donations = [
      {
        donor: "Danny", //donor_id
        amount: 100,
        timestamp: new Date().toISOString(),
        pool: "red_cross_can_wildfire",
        donation: donations.donor + donations+timestamp //donation_id
      },
    ];
    for (let i = 0; i < donations.length; i++) {
      donations[i].docType = "donation";
      await ctx.stub.putState("DON" + i, Buffer.from(JSON.stringify(donations[i])));
      console.log("Added", donations[i]);
    }
    console.log("============= END : Initialize Ledger ===========");
  }

  async createDonation(ctx, donor, time, pool, amount) {
    console.info("============= START : Create Donation ===========");

    if (amount > 0) {
      const donation = {
        donor,
        time,
        amount,
        pool,
        donationID : donor + time,
        recipient : "", 
      };

      await ctx.stub.putState(donation.donationID, Buffer.from(JSON.stringify(donation)));
      console.info("============= END : Create Donation ===========");
    } else {
      return "Invalid Amount";
    }
  }

  // async confirmDonation(ctx, donationID, amount) {
  //   console.info("============= START : Add Donation ===========");

  //   const donationAsBytes = await ctx.stub.getState(donationID);
  //   if (!donationAsBytes || donationAsBytes.length === 0) {
  //     throw new Error(`${donationID} does not exist`);
  //   }
  //   const donation = JSON.parse(donationAsBytes.toString());
  //   donation.amount += amount;

  //   await ctx.stub.putState(donationID, Buffer.from(JSON.stringify(donation)));
  //   console.info("============= END : Add Donation ===========");
  // }

  // async addDonationToPool(ctx, donationID, poolID) {
  //   console.info("============= START : Add Donation To Pool ===========");

  //   const donationAsBytes = await ctx.stub.getState(donationID);
  //   if (!donationAsBytes || donationAsBytes.length === 0) {
  //     throw new Error(`${donationID} does not exist`);
  //   }
  //   const donation = JSON.parse(donationAsBytes.toString());
  //   donation.pool = poolID;

  //   await ctx.stub.putState(donationID, Buffer.from(JSON.stringify(donation)));
  //   console.info("============= END : Add Donation To Pool ===========");
  // }

  async spendDonation(ctx, donationID, recipient, price, pool) {
    console.info("============= START : Spend Donation ===========");

    const donationAsBytes = await ctx.stub.getState(donationID);
    if (!donationAsBytes || donationAsBytes.length === 0) {
      throw new Error(`${donationID} does not exist`);
    }
    
    const donation = JSON.parse(donationAsBytes.toString());

    if(price < donation.amount){
      throw new Error("Invalid donation amount");
    }

    if (price > donation.amount) {
      throw new Error("Insufficient donation amount");
    }

    donation.recipient = recipient;

    await ctx.stub.putState(donationID, Buffer.from(JSON.stringify(donation)));
    console.info("============= END : Spend Donation ===========");
  }
}

module.exports = MyContract;



















