import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import shootingStar from "../assets/shooting-star.svg";
import squarePen from "../assets/square-pen.svg";

import { useEffect, useState } from "react";
const Home = () => {
  let navigate = useNavigate();
  const [savedTokens, setSavedTokens] = useState([]);

  const loadTokens = () => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      setSavedTokens(JSON.parse(tokens));
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  return (
    <div className="h-screen w-full bg-[#0F172A] pt-16 flex justify-center items-start">
      <div className="flex flex-col gap-16 items-center justify-center w-full max-w-2xl">
        <img src={logo} className="w-48" />
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <img src={shootingStar} className="w-14" />
            <span className="text-4xl text-white font-bold">Wish Wallet</span>
          </div>
          <div>
            <button
              onClick={() => navigate("/add-token")}
              className="bg-fuchsia-500 text-white px-4 py-2 font-medium rounded-md"
            >
              Add Token
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between pl-10 w-full text-white font-bold text-lg">
            <span>Tokens</span>
            <span>Balance</span>
          </div>
          <ul>
            {savedTokens.map((token) => (
              <li
                key={token.id}
                className=" flex flex-row justify-between pt-4 text-white font-bold text-4xl"
              >
                <div className="flex gap-4 items-center">
                  <button onClick={() => navigate(`/edit-token/${token.id}`)}>
                    <img src={squarePen} className="h-5" />
                  </button>
                  <h1>{token.token}</h1>
                </div>
                <h2>{token.balance}</h2>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
