import "./header.css";
import { GithubIcon, logo } from "../../assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex-row">
      <div className="flex-row logo">
        <img src={logo} />
        <div
          className="logo-name cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Focus Hours
        </div>
      </div>
      <GithubIcon size={38} />
    </header>
  );
};

export { Header };
