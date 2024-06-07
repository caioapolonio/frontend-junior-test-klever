import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Token from "../components/Token";
import Header from "../components/Header";

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
      <div className=" w-full max-w-2xl">
        <Header>
          <button
            onClick={() => navigate("/add-token")}
            className="bg-fuchsia-500 text-white px-4 py-2 font-medium rounded-md"
          >
            Add Token
          </button>
        </Header>
        <div className="w-full pt-16">
          <div className="flex items-center justify-between pl-10 w-full text-white font-bold text-lg">
            <span>Tokens</span>
            <span>Balance</span>
          </div>
          <ul>
            {savedTokens.map((token) => (
              <Token key={token.id} token={token} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
