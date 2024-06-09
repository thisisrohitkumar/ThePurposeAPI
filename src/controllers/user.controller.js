const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ msg: "Invalid User Id!" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ msg: "Invalid User Id!" });
    }
    const dataToUpdate = req.body;

    const result = await User.updateOne({ _id: user._id }, dataToUpdate);
    
    if(!result){
      return res.status(404).json({msg: "Failed to update user details"});
    }

    return res.status(200).json({msg: "User details updated successfully!"});

  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: "Internal server error!"})
  }
};

const deleteAUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ msg: "Invalid User Id!" });
    }

    const result = await User.deleteOne({ _id: user._id });
    
    if(!result){
      return res.status(404).json({msg: "Failed to delete user"});
    }

    return res.status(200).json({msg: "User deleted successfully!"});

  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: "Internal server error!"})
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserDetails,
  deleteAUser,
};
