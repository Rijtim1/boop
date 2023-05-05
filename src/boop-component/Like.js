import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function LikeButton({ boopId, count }) {
  const [likes, setLikes] = useState(count);

  const handleLike = async () => {
    setLikes(likes + 1);
    const boopRef = doc(db, "boops", boopId);
    await updateDoc(boopRef, { likes: likes + 1 });
  }

  return (
    <button className="flex items-center mr-4" onClick={handleLike}>
      <FaThumbsUp className="text-gray-500 mr-1" />
      <span className="text-gray-500">{likes}</span>
    </button>
  );
}


export default LikeButton;