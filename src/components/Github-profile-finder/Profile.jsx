import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import Loading from "../Loading";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const inputref = useRef("");
  const handelOnSearch = () => {
    setUserName(inputref.current.value);
  };
  async function fetchData() {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    if (data) {
      setUserData(data);
      setLoading(false);
      setUserName("");
    }
  }
  useEffect(() => {
    fetchData();
  }, [userName]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="snap-start bg-teal-400 h-full">
      <h1 className="font-semibold text-5xl text-center p-10 ">
        GitHub Profile api
      </h1>
      <div className="flex gap-10 justify-center">
        <input
          type="text"
          className="bg-teal-800 text-white placeholder:text-white border-black border-2 rounded-2xl h-10 text-xl p-2 outline-none"
          placeholder="Search Profile"
          ref={inputref}
        />
        <button
          className="text-2xl font-semibold bg-red-200 px-2 py-1 rounded-3xl"
          onClick={handelOnSearch}
        >
          Search
        </button>
      </div>
      {userData !== null ? <Card userData={userData} /> : null}
    </div>
  );
};

export default Profile;
