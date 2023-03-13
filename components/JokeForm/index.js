import { useState } from "react";
import useSWR from "swr";

const JokeForm = () => {
  const { mutate } = useSWR("/api/jokes");
  const [newJoke, setNewJoke] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/jokes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ joke: newJoke }),
      });
      if (!response.ok) {
        throw new Error(`POST failed with status code ${response.status}`);
      }
      mutate();
      setNewJoke("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeValue(event) {
    setNewJoke(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke-input">Joke</label>
      <input
        onChange={handleChangeValue}
        value={newJoke}
        type="text"
        id="joke-input"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default JokeForm;
