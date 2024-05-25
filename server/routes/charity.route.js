const express = require("express");
const router = express.Router();
const {
  getCharities,
  getCharity,
  createCharity,
  deleteCharity,
} = require("../controllers/charity.controllers");

router.get("/", getCharities);

router.get("/:id", getCharity);

router.post("/", createCharity);

router.delete("/:id", deleteCharity);


module.exports = router;