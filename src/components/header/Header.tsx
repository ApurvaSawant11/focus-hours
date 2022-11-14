import "./header.css";
import { GithubIcon, logo } from "assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex-row">
      <div className="flex-row logo">
        <img src={logo} alt="" />
        <div
          className="logo-name cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Focus Hours
        </div>
      </div>

      <a
        href="https://github.com/ApurvaSawant11"
        className="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon size={38} />
      </a>
    </header>
  );
};

export { Header };
