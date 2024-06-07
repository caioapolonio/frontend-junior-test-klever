import { useNavigate } from "react-router-dom";
import squarePen from "../assets/square-pen.svg";
const Token = ({ token }) => {
  let navigate = useNavigate();
  return (
    <li className=" flex flex-row justify-between pt-4 text-white font-bold text-4xl">
      <div className="flex gap-4 items-center">
        <button onClick={() => navigate(`/edit-token/${token.id}`)}>
          <img src={squarePen} className="h-5" />
        </button>
        <h1>{token.token}</h1>
      </div>
      <h2>{token.balance}</h2>
    </li>
  );
};

export default Token;
