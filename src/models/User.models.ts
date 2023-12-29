import mongoose from "mongoose";
import chatSchema from "./Chats.models";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  isGoogleAccount: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: function () {
      return this.isGoogleAccount===false ;
    },
  },
  chats: [chatSchema],
});

export default mongoose.model("User", userSchema);