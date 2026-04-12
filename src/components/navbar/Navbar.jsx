import React, { useState, useRef } from "react";
import "./Navbar.css";
// import Head-Logo from '.'
import "./sidenav.css";
import { useMediaQuery } from "react-responsive";
import DropDown from "../Commitments_Dropdown";
// import logo from "/logo.png";
import { NavLink } from "react-router-dom";
import Resources_Dropdown from "../Resources";

export default function Navbar({ navbarRef }) {
  const catMenu = useRef(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [commitmentsOpen, setCommitmentsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const toggleCommitmentsDropdown = () => {
    setCommitmentsOpen(!commitmentsOpen);
  };

  const toggleResourcesDropdown = () => {
    setResourcesOpen(!resourcesOpen);
  };
  const [openRes, setOpenRes] = useState(false);
  const closeOpenMenus = (e) => {
    console.log(e.target);
    if (
      catMenu.current &&
      openProfile &&
      !catMenu.current.contains(e.target) &&
      e.target.id != "dropdownNavbarComm" &&
      e.target.id != "arrow"
    ) {
      setOpenProfile(false);
    }
  };
  const closeOpenRes = (e) => {
    console.log(e.target);
    if (
      catMenu.current &&
      openRes &&
      !catMenu.current.contains(e.target) &&
      e.target.id != "dropdownNavbarRes" &&
      e.target.id != "arrow"
    ) {
      setOpenRes(false);
    }
  };
  document.addEventListener("mousedown", closeOpenMenus);
  document.addEventListener("mousedown", closeOpenRes);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });

  let menuToggler = document.getElementById("menuToggler");
  let menuTogglerLabel = document.getElementById("menuTogglerLabel");
  let sidebar = document.getElementById("sidebar");
  let menuItems = document.getElementsByClassName("menu__link");

  const [menu, setMenu] = useState(false);

  // menuToggler.addEventListener("change", function () {
  // if (menuToggler.checked) {
  //   menuTogglerLabel.setAttribute("aria-pressed", "true");
  //   sidebar.setAttribute("aria-hidden", "false");
  // } else {
  //   menuTogglerLabel.setAttribute("aria-pressed", "false");
  //   sidebar.setAttribute("aria-hidden", "true");
  // }

  // for (let menuItem of menuItems) {
  //   if (menuToggler.checked) {
  //     menuItem.setAttribute("tabindex", "0");
  //   } else {
  //     menuItem.setAttribute("tabindex", "-1");
  //   }
  // }
  // });

  function check() {
    setMenu(!menu);
    console.log(menu);
    // if (menuToggler.checked) {
    //   menuTogglerLabel.setAttribute("aria-pressed", "true");
    //   sidebar.setAttribute("aria-hidden", "false");
    // } else {
    //   menuTogglerLabel.setAttribute("aria-pressed", "false");
    //   sidebar.setAttribute("aria-hidden", "true");
    // }

    // for (let menuItem of menuItems) {
    //   if (menuToggler.checked) {
    //     menuItem.setAttribute("tabindex", "0");
    //   } else {
    //     menuItem.setAttribute("tabindex", "-1");
    //   }
    // }
    if (!menu) {
      document.body.style.overflow = "hidden";
      // menuToggler.style.filter="invert(1)"
      document.getElementsByClassName("menu-toggler")[0].style.filter =
        "invert(1)";
    }
    if (menu) {
      document.body.style.overflow = "auto";
      document.getElementsByClassName("menu-toggler")[0].style.filter = "none";
    }
  }

  return (
    <>
      {isDesktopOrLaptop && (
        <div className="nav-container" ref={navbarRef}>
          {/* <div className="nav-heading">UDGHOSH</div> */}
          <ul className="nav-links">
            {/* <ul> */}
            <li className="nav-item">
              <a href="/">
                <img className="logo" src="/logo.png" />
              </a>
            </li>
            <li className="nav-item">
              <a href="http://events.udghosh.org.in">Games & Registrations</a>
            </li>
            <li className="nav-item">
              <a href="/gallery">Gallery</a>
            </li>
            <li className="nav-item">
              <a href="/sponsors">Sponsors</a>
            </li>
            <li className="nav-item">
            <a href="/teams">Teams</a>
            </li>
            <li className="nav-item flex content-center">
              <button
                id="dropdownNavbarComm"
                data-dropdown-toggle="dropdownNavbar"
                className="flex content-center items-center justify-between w-full py-2 pl-3 pr-4 rounded md:p-0 md:w-auto leading-4 duration-300"
                onClick={() => setOpenProfile((prev) => !prev)}
              >
                Commitments{" "}
                <svg
                  id="arrow"
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    id="arrow"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </li>
            <li className="nav-item flex content-center">
              <button
                id="dropdownNavbarRes"
                data-dropdown-toggle="dropdownNavbar"
                className="flex content-center items-center justify-between w-full py-2 pl-3 pr-4 rounded md:p-0 md:w-auto leading-4 duration-300"
                onClick={() => setOpenRes((prev) => !prev)}
              >
                Resources{" "}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </li>

            {/* <li className="nav-item"><a href="/teams">Resources</a></li> */}
            <li className="nav-item">
              <a href="http://esports.udghosh.org.in">Esports</a>
            </li>

            {/* </ul> */}
          </ul>
        </div>
      )}
      {!isDesktopOrLaptop && (
        <>
          <div className="wrapper" ref={navbarRef}>
            <input
              type="checkbox"
              id="menuToggler"
              className="input-toggler"
              value="1"
              checked={menu}
              onChange={check}
              autoFocus={true}
            />
            <label
              htmlFor="menuToggler"
              id="menuTogglerLabel"
              className="menu-toggler"
              role="button"
              aria-pressed="false"
              aria-expanded="false"
              aria-label="Navigation button"
            >
              <span className="menu-toggler__line"></span>
              <span className="menu-toggler__line"></span>
              <span className="menu-toggler__line"></span>
            </label>
            <nav
              id="sidebar"
              className="sidebar"
              role="navigation"
              aria-labelledby="menuTogglerLabel"
              aria-hidden="true"
            >
              <ul
                id="menubar"
                className="menu"
                role="menubar"
                aria-orientation="vertical"
              >
                <li className="menu__item" role="none">
                  <NavLink
                    className="menu__link"
                    to="https://events.udghosh.org.in"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Competitions
                  </NavLink>
                </li>
                <li className="menu__item" role="none">
                  <NavLink
                    className="menu__link"
                    to="/gallery"
                    role="menuitem"
                    tabIndex="-1"
                    onClick={() =>{
                      setMenu(false)
                      check(menu)
                    } }
                  >
                    Gallery
                  </NavLink>
                </li>
                <li className="menu__item" role="none">
                  <NavLink
                    className="menu__link"
                    to="https://unosq.udghosh.org.in"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    UNOSQ
                  </NavLink>
                </li>
                <li className="menu__item" role="none">
                  <NavLink
                    className="menu__link"
                    to="https://ca.udghosh.org.in"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    CA Portal
                  </NavLink>
                </li>
                <li className="menu__item" role="none">
                  {/* Dropdown for Commitments */}
                  <div className={`dropdown ${commitmentsOpen ? "open" : ""}`}>
                    <a
                      className="menu__link"
                      href="#"
                      role="button"
                      tabIndex="-1"
                      onClick={toggleCommitmentsDropdown}
                    >
                      Commitments{" "}
                      {commitmentsOpen ? (
                        <i className="fa fa-light fa-chevron-up" />
                      ) : (
                        <i className="fa fa-light fa-chevron-down" />
                      )}
                    </a>
                    <div className="dropdown-content">
                      {/* Add Commitments submenu items here */}
                      <a className="sub-menu" href="/antique">
                        Antique
                      </a>
                      <br />
                      <a className="sub-menu" href="/social">
                        Social Initiatives
                      </a>
                      <br />
                      <a className="sub-menu" href="/vision">
                        Vision
                      </a>
                    </div>
                  </div>
                </li>
                <li className="menu__item" role="none">
                  {/* Dropdown for Resources */}
                  <div className={`dropdown ${resourcesOpen ? "open" : ""}`}>
                    <a
                      className="menu__link"
                      href="#"
                      role="button"
                      tabIndex="-1"
                      onClick={toggleResourcesDropdown}
                    >
                      Resources{" "}
                      {resourcesOpen ? (
                        <i className="fa fa-light fa-chevron-up" />
                      ) : (
                        <i className="fa fa-light fa-chevron-down" />
                      )}
                    </a>
                    <div className="dropdown-content">
                      {/* Add Resources submenu items here */}
                      <a className="sub-menu" href="/sponsors">
                        Sponsors
                      </a>
                      <br />
                      <a className="sub-menu" href="/teams">
                        Teams
                      </a>
                    </div>
                  </div>
                </li>
                <li className="menu__item" role="none">
                  <NavLink
                    className="menu__link"
                    to="https://esports.udghosh.org.in"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Esports
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
      {isDesktopOrLaptop && openProfile && (
        <div ref={catMenu}>
          <DropDown drop={openProfile} setDrop={setOpenProfile} />
        </div>
      )}
      {isDesktopOrLaptop && openRes && (
        <div ref={catMenu}>
          <Resources_Dropdown drop={openRes} setDrop={setOpenRes} />
        </div>
      )}
    </>
  );
}