import { useForm } from "react-hook-form";
import logo from "../assets/logo.svg";
import shootingStar from "../assets/shooting-star.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AddToken = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = () => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      setTokens(JSON.parse(tokens));
    }
  };

  const addToken = (e) => {
    const { token, balance } = e;

    //Checando se já existe um token com o mesmo nome
    const tokenExists = tokens.some((t) => t.token === token);

    if (tokenExists) {
      setError("Token already exists");
      return;
    }

    setTokensAndSave([
      ...tokens,
      { id: crypto.randomUUID(), token: token, balance: balance },
    ]);

    setError("");
    navigate("/");
  };
  //Salvando os tokens no localStorage
  const setTokensAndSave = (newTokens) => {
    setTokens(newTokens);
    localStorage.setItem("tokens", JSON.stringify(newTokens));
  };

  return (
    <div className="h-screen w-full bg-[#0F172A] pt-16 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        <Header />
        <div className="w-full px-16 pt-8">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl text-white font-bold">Add Token</h1>
            <button
              onClick={() => navigate("/")}
              className="bg-neutral-500 text-white px-8 py-2 font-medium rounded-md"
            >
              Voltar
            </button>
          </div>

          <form
            onSubmit={handleSubmit(addToken)}
            className="flex flex-col pt-8"
          >
            <label className="text-white font-bold text-lg">Token</label>
            <input
              type="text"
              className="p-2 rounded-md font-bold text-2xl"
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

            <label className="text-white font-bold text-lg mt-8">Balance</label>
            <input
              type="text"
              className="p-2 rounded-md font-bold text-2xl"
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

            <button
              type="submit"
              className="bg-fuchsia-500 text-white px-8 py-2 font-medium rounded-md w-fit self-end mt-8"
            >
              Save
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddToken;
