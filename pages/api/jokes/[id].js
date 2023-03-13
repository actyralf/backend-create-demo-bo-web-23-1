import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  try {
    await dbConnect();
    const id = request.query.id;
    const joke = await Joke.findById(id);
    if (!joke) {
      return response.status(404).json({ msg: "not found" });
    }
    response.status(200).json(joke);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "internal server error" });
  }
}
