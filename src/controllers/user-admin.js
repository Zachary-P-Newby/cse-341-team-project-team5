
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/users.js";

import mongoose from "mongoose";

// GET /api/users
export async function getUsers(req, res) {
  try {
    // Administrators can see every user.
    if (req.user.role === "admin") {
      const users = await getAllUsers();
      return res.status(200).json(users);
    }

    // Regular users can only see their own information.
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json([user]);
  } catch (error) {
    console.error("Error retrieving users:", error);

    return res.status(500).json({
      message: "Unable to retrieve users",
    });
  }
}

// PUT /api/users/:id
export async function updateUserById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const isAdmin = req.user.role === "admin";
    const isOwnAccount = req.user.id === id;

    // Only admins or the account owner can update.
    if (!isAdmin && !isOwnAccount) {
      return res.status(403).json({
        message: "You are not authorized to update this user",
      });
    }

    const { name, email } = req.body;

    if (
      (name !== undefined &&
        (typeof name !== "string" || !name.trim())) ||
      (email !== undefined &&
        (typeof email !== "string" ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())))
    ) {
      return res.status(400).json({
        message: "Please provide valid name and email values",
      });
    }

    if (name === undefined && email === undefined) {
      return res.status(400).json({
        message: "Provide at least one field to update",
      });
    }

    const updatedUser = await updateUser(id, { name, email });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "That email address is already in use",
      });
    }

    return res.status(500).json({
      message: "Unable to update user",
    });
  }
}

// DELETE /api/users/:id
export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const isAdmin = req.user.role === "admin";
    const isOwnAccount = req.user.id === id;

    // Only admins or the account owner can delete.
    if (!isAdmin && !isOwnAccount) {
      return res.status(403).json({
        message: "You are not authorized to delete this user",
      });
    }

    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // End the session if a user deletes their own account.
    if (isOwnAccount) {
      return req.session.destroy((error) => {
        if (error) {
          console.error("Session destruction error:", error);
          return res.status(500).json({
            message: "Account deleted, but session could not be closed",
          });
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
          message: "Account deleted successfully",
          deletedId: id,
        });
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    return res.status(500).json({
      message: "Unable to delete user",
    });
  }
}
