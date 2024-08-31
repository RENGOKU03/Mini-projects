import React from "react";

const Card = ({ userData }) => {
  const {
    avatar_url,
    followers,
    following,
    public_repos,
    name,
    login,
    created_at,
  } = userData;
  const createdDate = new Date(created_at);
  return (
    <div className="h-[500px] bg-teal-900 text-white pt-5 text-2xl font-semibold mt-5">
      <div>
        <img
          src={
            avatar_url ||
            "https://avatars.githubusercontent.com/u/101349886?v=4&size=460"
          }
          alt="User-img"
          className="h-60 rounded-xl m-auto"
        />
      </div>
      <div className="flex justify-center gap-10 pt-5 items-center">
        <a
          href={`https://github.com/${login}`}
          className="text-3xl text-blue-500 hover:cursor-pointer"
        >
          {name || login || "Chetan"}
        </a>
        <p>
          User joined on{" "}
          {`${createdDate.getDate()} ${createdDate.toLocaleString("en-us", {
            month: "short",
          })} ${createdDate.getFullYear()}`}
        </p>
      </div>
      <div>
        <div className="flex justify-center gap-10 pt-5 ">
          <p>Public Repos</p>
          <p>{public_repos || 20}</p>
        </div>
        <div className="flex justify-center gap-10 pt-5 ">
          <p>Followers</p>
          <p>{followers || 20}</p>
        </div>
        <div className="flex justify-center gap-10 pt-5 ">
          <p>Following</p>
          <p>{following || 20}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
