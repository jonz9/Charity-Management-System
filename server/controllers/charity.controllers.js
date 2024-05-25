const Charity = require("../models/charity.model");

const getCharities = async (req, res) => {
  try {
    const charity = await Charity.find({});
    res.status(200).json(charity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCharity = async (req, res) => {
  try {
    const { id } = req.params;
    const charity = await Charity.findById(id);
    res.status(200).json(charity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCharity = async (req, res) => {
  try {
    const charity = await Charity.create(req.body);
    res.status(200).json(charity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCharity = async (req, res) => {
  try {
    const { id } = req.params;
    const charity = await Charity.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Charity not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCharities, getCharity, createCharity, deleteCharity };
