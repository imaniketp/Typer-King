import Select from "react-select";
import React from "react";
import { themeOptions } from "../theme/Theme";
import { useTheme } from "../context/ThemeContext";
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  const { setTheme, theme, defaultTheme } = useTheme();

  const handelThemeChange = (e) => {
    localStorage.setItem('theme',JSON.stringify(e.value));
    setTheme(e.value);
  };

  return (
    <div className="footer">

        <div className="intructions">
            <div className="hint">
                press <kbd>Tab</kbd> to open commands
            </div>
        </div>


      <div className="actual-footer">
        <div className="footer-links">
          <a href="https://github.com/imaniketp/Typer-King" target="_blank">
            <GitHubIcon />
          </a>
        </div>
        <div className="theme-options">
          <Select
            options={themeOptions}
            menuPlacement="top"
            onChange={handelThemeChange}
            defaultValue={{label:defaultTheme.label,value:defaultTheme}}
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: theme.background,
                cursor: "pointer",
                borderColor: theme.title,
              }),
              singleValue: (styles) => ({ ...styles, color: theme.title }),
              menu: (styles) => ({
                ...styles,
                backgroundColor: theme.background,
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
