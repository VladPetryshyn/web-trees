import { MONGO } from "@/helpers/config";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect(String(MONGO))
mongoose.Promise = global.Promise;


export const db = {
  User: userModel(),
  Tree: treeModel(),
  Link: linkModel()
}

function userModel() {
  const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    email: { type: String, unique: true, required: true }
  }, {
    timestamps: true
  })

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(_, ret) {
      delete ret._id;
      delete ret.hash;
    }
  })


  return mongoose.models.User || mongoose.model("User", schema)
}

function treeModel() {
  const schema = new Schema({
    uid: { type: String, required: true },
    handle: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String },
    links: { type: [String], required: true }
  }, {
    timestamps: true
  })

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false
  })

  return mongoose.models.Tree || mongoose.model("Tree", schema)
}

function linkModel() {
  const schema = new Schema({
    uid: { type: String, required: true },
    link: { type: String, required: true },
    handle: { type: String, required: true }
  })

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false
  })

  return mongoose.models.Link || mongoose.model("Link", schema)
}
