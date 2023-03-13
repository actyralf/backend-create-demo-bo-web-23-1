import dbConnect from "../../../db/connect.js";
import Joke from "../../../db/models/Joke.js";

export default async function handler(request, response) {
  if (request.method === "GET") {
    try {
      await dbConnect();
      const jokes = await Joke.find();
      return response.status(200).json(jokes);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "internal server error" });
    }
  } else if (request.method === "POST") {
    try {
      console.log("POST REQUEST");
      console.log(request.body);
      const newJoke = request.body;
      const joke = new Joke(newJoke);
      await joke.save();
      return response.status(200).json({ message: "I created a new joke" });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "internal server error" });
    }
  } else {
    return response.status(405).json({ message: "method not allowed" });
  }
}
