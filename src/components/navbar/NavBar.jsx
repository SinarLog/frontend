/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../app/context/auth";
import { NAVBAR_MAPPER } from "../../app/utils/constants";
import { getFirstAndLastName } from "../../app/utils/strings";
import { ThemeContext } from "../../app/context/theme";

// Assets
import sinarLogLogo from "../../assets/icons/sinarlog-logo.svg";
import sinarLogLogoDark from "../../assets/icons/sinarlog-logo-dark.svg";
import { CgSun } from "react-icons/cg";
import { MdNightlight } from "react-icons/md";

// Components
import TableAvatar from "../avatars/TableAvatar";
import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";

export default function NavBar() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const { changeTheme } = useContext(ThemeContext);
  const currentUser = useSelector((state) => state.currentUser);
  const currentTheme = useSelector((state) => state.theme);
  const [isDarkTheme, toggleDarkTheme] = useState(currentTheme === "dark");

  /**
   * Checks which is the active link in the dashboard
   * @param {string} link
   * @returns {boolean}
   */
  const isActive = (link) => {
    return location.pathname.includes(link);
  };

  const handleChangeTheme = () => {
    if (isDarkTheme) {
      changeTheme("light");
      toggleDarkTheme(false);
    } else {
      changeTheme("dark");
      toggleDarkTheme(true);
    }
  };

  return (
    <div className="drawer z-50">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* NAVBAR */}
        <div className="navbar-container">
          <div className="flex-none lg:hidden">
            <label htmlFor="navbar-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="navbar-start flex-1">
            {isDarkTheme ? (
              <img src={sinarLogLogoDark} alt="SinarLog Logo" />
            ) : (
              <img src={sinarLogLogo} alt="SinarLog Logo" />
            )}
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="flex flex-row gap-5">
              {NAVBAR_MAPPER[currentUser.role.code].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className={`normal-case text-lg font-semibold hover:text-red-500 ${
                      isActive(item.link)
                        ? "text-red-500 dark:text-red-500"
                        : null
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end flex-1">
            <div className="flex gap-1 space-x-2 justify-center items-center">
              {/* TOOLTIP */}
              <div
                className="tooltip tooltip-bottom"
                data-tip={`Change from ${
                  isDarkTheme ? "dark to light theme" : "light to dark theme"
                }`}
              >
                {/* THEME CHANGER */}
                <button
                  onClick={handleChangeTheme}
                  className="mx-2 btn btn-ghost hover:bg-opacity-0"
                >
                  {isDarkTheme ? (
                    <CgSun className="text-2xl animate__animated animate__bounceIn animate__faster" />
                  ) : (
                    <MdNightlight className="text-2xl animate__animated animate__bounceIn animate__faster" />
                  )}
                </button>
              </div>
              {/* PROFILE */}
              <div className="flex flex-col">
                <h4 className="font-semibold">
                  {getFirstAndLastName(currentUser.fullName)}
                </h4>
                <p className="text-sm text-slate-500">
                  {currentUser.role.name}
                </p>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  {currentUser.avatar ? (
                    <TableAvatar circle={true}>
                      <img src={currentUser.avatar} alt="Avatar" />
                    </TableAvatar>
                  ) : (
                    <TablePlaceholderAvatar
                      role={currentUser.role.code}
                      fullName={currentUser.fullName}
                      circle={true}
                    />
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                  <li>
                    <a onClick={() => logout()}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200">
          {NAVBAR_MAPPER[currentUser.role.code].map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className={`normal-case text-xl font-semibold hover:text-red-500 ${
                  isActive(item.link) ? "text-red-500 dark:text-red-500" : null
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
