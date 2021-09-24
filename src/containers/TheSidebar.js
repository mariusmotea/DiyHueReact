import React from "react";
import {
  FaHome,
  FaLightbulb,
  FaLink,
  FaCog,
  FaSignOutAlt,
  FaInfo,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdSettingsRemote } from "react-icons/md";
import {Bridge } from "../icons/Bridge"
import {Zigbee } from "../icons/Zigbee"
import {Deconz } from "../icons/Deconz"
import {Diybridge } from "../icons/Diybridge"
import {Tradfri } from "../icons/Tradfri"
import logo from "../static/images/logo.svg";
import "../scss/sidebar.scss";

const TheSidebar = ({ showSidebar }) => {
  return (
    <div className={`columnLeft ${showSidebar ? "" : "active"}`}>
      <div className="topbarLeft">
        <div className="logo"><img src={logo} alt="diyHue Logo" /></div>
        <div className="headline">DiyHue</div>
      </div>
      <div className="sidebar">
      <ul>
        <a href="#home">
          <li>
            <FaHome style={{ color: "#0092FF" }} /> <p>Home</p>
          </li>
        </a>
        <a href="#lights">
          <li>
            <FaLightbulb style={{ color: "#FF9E00" }} /> <p>Lights</p>
          </li>
        </a>
        <a href="#linkbutton">
          <li>
            <FaLink style={{ color: "#9b59b6" }} /> <p>Link Button</p>
          </li>
        </a>
        <a href="#bridge">
          <li>
            <Diybridge style={{ color: "#92FFFF" }} /> <p>Bridge</p>
          </li>
        </a>
        <a href="#devices">
          <li>
            <MdSettingsRemote style={{ color: "#7f8c8d" }} /> <p>Devices</p>
          </li>
        </a>
        <a href="#mqtt">
          <li>
            <Zigbee style={{ color: "#0084FF" }} /> <p>MQTT</p>
          </li>
        </a>
        <a href="#deconz">
          <li>
            <Deconz style={{ color: "#42A138" }} /> <p>Deconz</p>
          </li>
        </a>
        <a href="#tradfri">
          <li>
            <Tradfri style={{ color: "#CCA138" }} />{" "}
            <p>Tradfri</p>
          </li>
        </a>
        <a href="#hue">
          <li>
            <Bridge style={{ color: "#8400FF" }} /> <p>Hue Bridge</p>
          </li>
        </a>
        <a href="#diyhue">
          <li>
            <Bridge style={{ color: "#16a085" }} /> <p>DiyHue Bridge</p>
          </li>
        </a>
        <a href="#alarm">
          <li>
            <FaExclamationTriangle style={{ color: "#c0392b" }} /> <p>Alarm</p>
          </li>
        </a>
        <a href="#settings">
          <li>
            <FaCog style={{ color: "#bdc3c7" }} /> <p>Settings</p>
          </li>
        </a>
        <a href="#about">
          <li>
            <FaInfo style={{ color: "#fff" }} /> <p>About</p>
          </li>
        </a>
        <a href="/logout">
          <li>
            <FaSignOutAlt style={{ color: "#fff" }} /> <p>Logout</p>
          </li>
        </a>
      </ul>
    </div>
    </div>
  );
};

export default React.memo(TheSidebar);
