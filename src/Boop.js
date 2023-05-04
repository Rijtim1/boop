import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { faker } from "@faker-js/faker";
import './static-files/index.css'

function Boop() {

  const [username, setUsername] = useState(faker.internet.userName());
  const [message, setMessage] = useState(faker.lorem.sentence());
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [avatar, setAvatar] = useState(faker.image.avatar());

  // Define a function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default form submission behavior

    // Add a new document with a generated ID to the "messages" collection
    const docRef = await addDoc(collection(db, "boops"), {
      username,
      message,
      likes,
      dislikes,
      avatar,
      createdAt: new Date(), // add a timestamp for the creation date
    });

    console.log("Document written with ID:", docRef.id);

    // Clear the input fields and reset the like/dislike counts
    setUsername(faker.internet.userName());
    setMessage(faker.lorem.sentence());
    setLikes(0);
    setDislikes(0);
    setAvatar(faker.image.avatar());
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Create a Boop</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="border rounded-lg py-2 px-3 w-full"
            type="text"
            id="username"
            placeholder={faker.internet.userName()}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="border rounded-lg py-2 px-3 w-full h-32 resize-none"
            id="message"
            placeholder={faker.commerce.productDescription()}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center mb-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-4"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Boop;
