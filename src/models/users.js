
import User from "./schemas/users.js";
import Role from "./schemas/role.js";
import bcrypt from "bcrypt";

export const createUser = async (name, email, password) => {
  const customer = await Role.findOne({ name: "customer" });

  if (!customer) {
    throw new Error("Default role not found");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: customer._id,
  });

  return user._id.toString();
};

export const findUserByEmail = async (email) => {
  return User.findOne({ email }).populate("role");
};

export const verifyPassword = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

// Get all users without exposing password hashes.
export const getAllUsers = async () => {
  return User.find({})
    .select("-passwordHash")
    .populate("role", "name")
    .sort({ name: 1 })
    .lean();
};

// Get one user by MongoDB ID.
export const getUserById = async (userId) => {
  return User.findById(userId)
    .select("-passwordHash")
    .populate("role", "name")
    .lean();
};

// Update a user's name and email.
export const updateUser = async (userId, userData) => {
  const allowedUpdates = {};

  if (typeof userData.name === "string") {
    allowedUpdates.name = userData.name.trim();
  }

  if (typeof userData.email === "string") {
    allowedUpdates.email = userData.email.trim().toLowerCase();
  }

  return User.findByIdAndUpdate(
    userId,
    { $set: allowedUpdates },
    {
      new: true,
      runValidators: true,
    }
  )
    .select("-passwordHash")
    .populate("role", "name")
    .lean();
};

// Delete a user.
export const deleteUser = async (userId) => {
  return User.findByIdAndDelete(userId);
};
