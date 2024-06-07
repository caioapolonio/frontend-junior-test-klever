import { useForm } from "react-hook-form";
import logo from "../assets/logo.svg";
import shootingStar from "../assets/shooting-star.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const EditToken = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState("");
  const [currentToken, setCurrentToken] = useState({});
  const { tokenId } = useParams();

  useEffect(() => {
    loadTokens();
  }, []);

  useEffect(() => {
    if (tokens.length > 0) {
      const token = tokens.find((t) => t.id === tokenId);
      if (token) {
        setCurrentToken(token);
        setValue("token", token.token);
        setValue("balance", token.balance);
      }
    }
  }, [tokens]);

  const loadTokens = () => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      setTokens(JSON.parse(tokens));
    }
  };

  const editToken = (e) => {
    const { token, balance } = e;

    const tokenExists = tokens.some(
      (t) => t.token === token && t.id !== tokenId
    );

    if (tokenExists) {
      setError("Token already exists");
      return;
    }

    const updatedTokens = tokens.map((t) =>
      t.id === tokenId ? { ...t, token: token, balance: balance } : t
    );

    setTokensAndSave(updatedTokens);
    navigate("/");
  };

  const setTokensAndSave = (newTokens) => {
    setTokens(newTokens);
    localStorage.setItem("tokens", JSON.stringify(newTokens));
  };

  const removeToken = () => {
    const updatedTokens = tokens.filter((t) => t.id !== tokenId);
    setTokensAndSave(updatedTokens);
    navigate("/");
  };

  return (
    <div className="h-screen w-full bg-[#0F172A] pt-16 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        <Header />
        <div className="w-full px-16 pt-8">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl text-white font-bold">Edit Token</h1>
            <button
              onClick={() => navigate("/")}
              className="bg-neutral-500 text-white px-8 py-2 font-medium rounded-md"
            >
              Voltar
            </button>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(editToken)}
              className="flex flex-col pt-8"
            >
              <label className="text-white font-bold text-lg">Token</label>
              <input
                type="text"
                className="p-2 rounded-md font-bold text-2xl"
                defaultValue={currentToken.token}
                {...register("token", {
                  required: {
                    value: true,
                    message: "Token field is required",
                  },
                })}
              />
              {errors.token && (
                <p className="text-sm text-red-600">{errors.token.message}</p>
              )}

              <label className="text-white font-bold text-lg mt-8">
                Balance
              </label>
              <input
                type="text"
                className="p-2 rounded-md font-bold text-2xl"
                defaultValue={currentToken.balance}
                {...register("balance", {
                  required: {
                    value: true,
                    message: "Balance field is required",
                  },
                  pattern: {
                    value: /^[0-9,.]*$/,
                    message: "Only numbers, commas, and dots are allowed",
                  },
                })}
              />
              {errors.balance && (
                <p className="text-sm text-red-600">{errors.balance.message}</p>
              )}

              <div className="w-full flex justify-between">
                <button
                  className="bg-red-500 text-white px-8 py-2 font-medium rounded-md w-fit  mt-8"
                  onClick={removeToken}
                >
                  Remove
                </button>

                <button
                  type="submit"
                  className="bg-fuchsia-500 text-white px-8 py-2 font-medium rounded-md w-fit  mt-8"
                >
                  Save
                </button>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditToken;
