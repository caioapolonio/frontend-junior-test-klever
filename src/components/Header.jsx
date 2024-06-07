import logo from "../assets/logo.svg";
import shootingStar from "../assets/shooting-star.svg";

const Header = ({ children }) => {
  return (
    <div className=" flex flex-col gap-16 items-center justify-center w-full">
      <img src={logo} className="w-48" />
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <img src={shootingStar} className="w-14" />
          <span className="text-4xl text-white font-bold">Wish Wallet</span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Header;
