import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
