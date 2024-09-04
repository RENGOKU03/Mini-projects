import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Suggestion from "./Suggestion";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, SetUsers] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredData, setfilteredData] = useState([]);

  function handleInput(event) {
    const query = event.target.value.toLowerCase();
    setSearchText(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setfilteredData(filteredData);
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }
  function handleClick(event) {
    setShowDropDown(false);
    setSearchText(event.target.innerText);
    setfilteredData([]);
  }
  async function fetchUserData() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      if (data && data.users && data.users.length) {
        SetUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="h-screen snap-start bg-gray-400 text-white ">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="font-semibold text-5xl text-center p-5">
            Search Auto Complete with Api Data
          </h1>
          <div className="w-full flex justify-center">
            <input
              type="text"
              value={searchText}
              className="text-2xl font-semibold px-3 py-2 bg-gray-900 text-gray-100 rounded-3xl "
              placeholder="Seach Names"
              onChange={handleInput}
            />
          </div>
          {showDropDown && (
            <Suggestion data={filteredData} handleClick={handleClick} />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
