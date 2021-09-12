import React from "react";
import {
  FaHome,
  FaLightbulb,
  FaLink,
  FaCog,
  FaSignOutAlt,
  FaInstagram,
  FaBars
} from "react-icons/fa";
import { SiZigbee } from "react-icons/si";
import {
  RiHomeWifiLine,
  RiAlarmWarningLine,
  RiMessage2Line,
  RiBubbleChartLine,
} from "react-icons/ri";
import { MdSettingsRemote } from "react-icons/md";
import { IoEllipsisVerticalCircleOutline } from "react-icons/io5";
import logo from "../static/images/logo.svg";
import "../scss/sidebar.scss";

const TheSidebar = ({ showSidebar }) => {
  return (
    <div id="left" className={`column ${showSidebar ? "" : "active"}`}>
      <div className="topbarLeft">
        <div className="logo"><img src={logo} alt="diyHue Logo" /></div>
        <div className="headline">DiyHue</div>
        <div className="hamburger"><FaBars/></div>
      </div>
      <div className="sidebar">
      <ul>
        <a href="#home">
          <li>
            <FaHome style={{ color: "#0092FF" }} /> Home
          </li>
        </a>
        <a href="#lights">
          <li>
            <FaLightbulb style={{ color: "#FF9E00" }} /> Lights
          </li>
        </a>
        <a href="#linkbutton">
          <li>
            <FaLink style={{ color: "#FF92FF" }} /> Link Button
          </li>
        </a>
        <a href="#bridge">
          <li>
            <MdSettingsRemote style={{ color: "#92FFFF" }} /> Bridge
          </li>
        </a>
        <a href="#devices">
          <li>
            <RiBubbleChartLine style={{ color: "#764600" }} /> Devices
          </li>
        </a>
        <a href="#mqtt">
          <li>
            <RiMessage2Line style={{ color: "#0084FF" }} /> MQTT
          </li>
        </a>
        <a href="#deconz">
          <li>
            <RiHomeWifiLine style={{ color: "#42A138" }} /> Deconz
          </li>
        </a>
        <a href="#tradfri">
          <li>
            <IoEllipsisVerticalCircleOutline style={{ color: "#CCA138" }} />{" "}
            Tradfri
          </li>
        </a>
        <a href="#hue">
          <li>
            <FaInstagram style={{ color: "#8400FF" }} /> Hue Bridge
          </li>
        </a>
        <a href="#diyhue">
          <li>
            <SiZigbee style={{ color: "#CCCCCC" }} /> DiyHue Bridge
          </li>
        </a>
        <a href="#alarm">
          <li>
            <RiAlarmWarningLine style={{ color: "#AE2D00" }} /> Alarm
          </li>
        </a>
        <a href="#settings">
          <li>
            <FaCog style={{ color: "#FFFF00" }} /> Settings
          </li>
        </a>
        <a href="/logout">
          <li>
            <FaSignOutAlt style={{ color: "#fff" }} /> Logout
          </li>
        </a>
      </ul>
    </div>
    </div>
  );
};

export default React.memo(TheSidebar);
