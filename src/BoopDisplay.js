import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import genericAvatar from "./static-files/user.png";

function BoopDisplay() {
  const [boops, setBoops] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "boops"), (snapshot) => {
      const boopData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      boopData.sort((a, b) => b.createdAt - a.createdAt);
      setBoops(boopData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="card">
      <ul>
        {boops.map((boop) => (
          <li key={boop.id}>
            {boop.avatar ? (
              <img width={50} height={50} src={boop.avatar} alt="avatar" />
            ) : (
              <img width={50} height={50} src={genericAvatar} alt="avatar" />
            )}
            <div class="card-body">
              <h2 className="card-title">{boop.username} </h2>
              <p className="card-text">{boop.message}</p>
            </div>

            <div class="card-stat">
              <span class="stat-value">{boop.likes} </span>
              <span class="stat-label">Likes</span>
            </div>
            <div class="card-stat">
              <span class="stat-value">{boop.dislikes} </span>
              <span class="stat-label">Dislikes </span>
            </div>
            {/* <div class="card-stat">
              <span class="stat-value">25</span>
              <span class="stat-label">Comments</span>
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoopDisplay;
