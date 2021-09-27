import { memo, useState } from "react";
import { useLocation } from 'react-router-dom';
import {
  FaHome,
  FaLightbulb,
  FaLink,
  FaCog,
  FaSignOutAlt,
  FaInfoCircle,
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

  const [currentElement, setCurrentElement] = useState(window.location.hash.substring(2));
  return (
    <div className={`columnLeft ${showSidebar ? "" : "active"}`}>
      <div className="topbarLeft">
        <div className="logo"><img src={logo} alt="diyHue Logo" /></div>
        <div className="headline">DiyHue</div>
      </div>
      <div className="sidebar">
      <ul>
        <a href="#home">
          <li className={`${currentElement === "groups" ? "active" : ""}`}
          onClick={() => setCurrentElement("groups")}>
            <FaHome style={{ color: "#0092FF" }} /> <p>Groups</p>
          </li>
        </a>
        <a href="#lights">
          <li className={`${currentElement === "lights" ? "active" : ""}`}
          onClick={() => setCurrentElement("lights")}>
            <FaLightbulb style={{ color: "#FF9E00" }} /> <p>Lights</p>
          </li>
        </a>
        <a href="#linkbutton">
          <li className={`${currentElement === "linkbutton" ? "active" : ""}`}
          onClick={() => setCurrentElement("linkbutton")}>
            <FaLink style={{ color: "#9b59b6" }} /> <p>Link Button</p>
          </li>
        </a>
        <a href="#bridge">
          <li className={`${currentElement === "bridge" ? "active" : ""}`}
          onClick={() => setCurrentElement("bridge")}>
            <Diybridge style={{ color: "#92FFFF" }} /> <p>Bridge</p>
          </li>
        </a>
        <a href="#devices">
          <li className={`${currentElement === "devices" ? "active" : ""}`}
          onClick={() => setCurrentElement("devices")}>
            <MdSettingsRemote style={{ color: "#7f8c8d" }} /> <p>Devices</p>
          </li>
        </a>
        <a href="#mqtt">
          <li className={`${currentElement === "mqtt" ? "active" : ""}`}
          onClick={() => setCurrentElement("mqtt")}>
            <Zigbee style={{ color: "#0084FF" }} /> <p>MQTT</p>
          </li>
        </a>
        <a href="#deconz">
          <li className={`${currentElement === "deconz" ? "active" : ""}`}
          onClick={() => setCurrentElement("deconz")}>
            <Deconz style={{ color: "#42A138" }} /> <p>Deconz</p>
          </li>
        </a>
        <a href="#tradfri">
          <li className={`${currentElement === "tradfri" ? "active" : ""}`}
          onClick={() => setCurrentElement("tradfri")}>
            <Tradfri style={{ color: "#CCA138" }} />{" "}
            <p>Tradfri</p>
          </li>
        </a>
        <a href="#hue">
          <li className={`${currentElement === "hue" ? "active" : ""}`}
          onClick={() => setCurrentElement("hue")}>
            <Bridge style={{ color: "#8400FF" }} /> <p>Hue Bridge</p>
          </li>
        </a>
        <a href="#alarm">
          <li className={`${currentElement === "alarm" ? "active" : ""}`}
          onClick={() => setCurrentElement("alarm")}>
            <FaExclamationTriangle style={{ color: "#c0392b" }} /> <p>Alarm</p>
          </li>
        </a>
        <a href="#settings">
          <li className={`${currentElement === "settings" ? "active" : ""}`}
          onClick={() => setCurrentElement("settings")}>
            <FaCog style={{ color: "#bdc3c7" }} /> <p>Settings</p>
          </li>
        </a>
        <a href="#about">
          <li className={`${currentElement === "about" ? "active" : ""}`}
          onClick={() => setCurrentElement("about")}>
            <FaInfoCircle style={{ color: "#fff" }} /> <p>About</p>
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

export default memo(TheSidebar);
