import User from "../models/userModel.js";

async function updateUser(req, res) {
  try {
    const { _id } = req.user;
    const updates = req.body;

    if (!_id || !updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Missing userId or updates" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.set(updates);
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
}
async function getUserAvatar(req, res) {
  try {
    const { _id } = req.user;

    if (!_id) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const user = await User.findById(_id).select("bitface");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ bitface: user.bitface });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user avatar" });
  }
}

export { updateUser, getUserAvatar };
