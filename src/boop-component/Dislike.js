import React, { useState } from 'react';
import { FaThumbsDown } from 'react-icons/fa';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function DislikeButton({ boopId, count }) {
  const [dislikes, setDislikes] = useState(count);

  const handleDislikes = async () => {
    setDislikes(dislikes + 1);
    const boopRef = doc(db, "boops", boopId);
    await updateDoc(boopRef, { dislikes: dislikes + 1 });
  }

  return (
    <button className="flex items-center mr-4" onClick={handleDislikes}>
      <FaThumbsDown className="text-gray-500 mr-1" />
      <span className="text-gray-500">{dislikes}</span>
    </button>
  );
}

export default DislikeButton;