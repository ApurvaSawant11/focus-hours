import "./header.css";
import { GithubIcon, logoDark, logoLight, MoonIcon } from "assets";
import { useNavigate } from "react-router-dom";
import { useTheme } from "context";

const Header = () => {
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();
  return (
    <header className="flex-row">
      <div className="flex-row logo">
        <img src={theme === "light" ? logoDark : logoLight} alt="" />
        <div
          className="logo-name cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Focus Hours
        </div>
      </div>

      <div>
        <a
          href="https://github.com/ApurvaSawant11"
          className="link mr-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon size={30} />
        </a>
        <MoonIcon className="link" size={30} onClick={() => changeTheme()} />
      </div>
    </header>
  );
};

export { Header };
