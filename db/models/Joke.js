import mongoose from "mongoose";

const JokesSchema = new mongoose.Schema({
  joke: {
    type: String,
    required: true,
  },
});

const Joke =
  mongoose.models.Joke || new mongoose.model("Joke", JokesSchema, "jokes");
export default Joke;
