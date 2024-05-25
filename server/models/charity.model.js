const CharitySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Charity name"],
  },

  description: {
    type: String,
    default: "",
  },

  logo: {
    type: String,
    required: [true, "Please upload an image for the Charity"],
    trim: true,
  },

  causes: [{
    type: String,
    required: [true, "Please list at least one cause that are being currently funded"],
  }],

  address: {
    type: String,
    required: [true, "Please enter a Crypto Wallet Address"],
  }
})