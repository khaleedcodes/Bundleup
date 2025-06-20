import mongoose from "mongoose";

const bitfaceSchema = new mongoose.Schema({
  avatarSeed: {
    type: String,
    required: true,
    trim: true,
    default: "jgagbu9m3o",
  },
  avatarStyle: {
    type: String,
    required: true,
    trim: true,
    default: "Adventurer Neutral",
    enum: [
      "Adventurer",
      "Big Smile",
      "Big Ears",
      "Micah",
      "Pixel Art",
      "Bottts",
      "Adventurer Neutral",
      "Avataars Neutral",
    ],
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    authProvider: {
      type: String,
      required: true,
      enum: ["bundlebit", "google"],
      trim: true,
      lowercase: true,
    },
    bundles: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bundle" }],
    },
    bio: {
      type: String,
    },
    googleId: {
      type: String,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
    },
    familyName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    givenName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    displayname: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
      trim: true,
      lowercase: true,
    },
    bitface: bitfaceSchema,
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
