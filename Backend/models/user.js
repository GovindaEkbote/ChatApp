import mongoose,{ Schema, model } from "mongoose";
import {hash} from 'bcrypt'

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      requierd: true,
      unique: true,
    },
    password: {
      type: String,
      requierd: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        requierd: true,
      },
      url: {
        type: String,
        requierd: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save",async function(next) {
  if(!this.isModified("password")) return next();
  this.password = await hash(this.password,10)
  next();
});

export const User = mongoose.models.User || model("User", schema);
