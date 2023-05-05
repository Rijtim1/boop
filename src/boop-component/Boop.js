import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Avatar = React.lazy(() => import("../static-files/user.png"));
const LikeButton = React.lazy(() => import("./Like"));
const DislikeButton = React.lazy(() => import("./Dislike"));
const FaFlag = React.lazy(() => import("react-icons/fa"));

function Boop() {
  // boop is a 3x4 table, where 0,0 will have the avatar, 0,1 and 0,2 will merge and that will display the user name,
  // 1,0 and 1,1 and 1,2 will merge and that will display the message,
  // 2,0 likes
  // 2,1 dislikes
  // 2,3 report
  // 3,0, 3,1 and 3,2 will merge and that will display the time

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
    <>
      {boops.map((boop) => (
        <React.Suspense key={boop.id} fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 flex justify-center items-center">
              <img
                className="rounded-full w-10 h-10"
                src={boop.avatar ? boop.avatar : Avatar}
                alt="avatar"
              />
            </div>
            <div className="col-span-2 flex flex-col justify-center">
              <div className="text-lg font-medium text-gray-700">
                {boop?.username}
              </div>
              <div className="text-base text-gray-900">{boop?.message}</div>
              <div className="flex items-center mt-2">
                <LikeButton boopId={boop.id} count={boop?.likes} />
                <DislikeButton boopId={boop.id} count={boop?.dislikes} />
                {boop?.report ? (
                  <div className="flex items-center">
                    <FaFlag className="text-red-500 mr-1" />
                    <span className="text-red-500">{boop.report}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </React.Suspense>
      ))}
    </>
  );
}

export default Boop;
