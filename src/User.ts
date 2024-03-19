const mongoose = require("mongoose");

// Sub schema for scan_pull_request key
var scan_pull_request_Schema = new mongoose.Schema(
  {
    repoName: {
      type: String,
    },
  },
  { _id: false }
);

// Sub schema for weekly_email_report key
var weekly_email_report_Schema = new mongoose.Schema(
  {
    repoName: {
      type: String,
    },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    username: {
      type: String,
    },
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
    scan_pull_request: [scan_pull_request_Schema],
    weekly_email_report: [weekly_email_report_Schema],
  },
  { timestamps: true }
);

// TODO: verify

mongoose.models = {};

const User = mongoose.model("users", schema);

export default User;
