const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "First name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    avatar: {
      type: String,
    },
    installationId: {
      type: String,
    },
  },
  { timestamps: true }
);

// TODO: verify it again on more time

mongoose.models = {};

const User = mongoose.model("users", schema);

export default User;
