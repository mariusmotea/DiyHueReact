import Modal from 'react-modal';
import {
  FaCouch,
  FaChevronDown,
  FaChevronUp,
  FaImages,
  FaLightbulb

} from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import Scenes from "./Scenes";
import Light from "./GroupLight";
import ColorPicker from "./ColorPicker";
import { cieToRgb, colorTemperatureToRgb } from "../color";

const Group = ({ HOST_IP, api_key, id, group, lights, scenes }) => {

  let subtitle;

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [showContainer, setShowContainer] = useState("closed");

  const handleToggleChange = (state) => {
    const newState = { on: state };
    group.state["any_on"] = state;
    console.log("Apply state " + JSON.stringify(newState));
    axios.put(`${HOST_IP}/api/${api_key}/groups/${id}/action`, newState);
  };

  const handleBriChange = (state) => {
    const newState = { bri: state };
    group.action["bri"] = state;
    console.log("Apply state " + JSON.stringify(newState));
    axios.put(`${HOST_IP}/api/${api_key}/groups/${id}/action`, newState);
  };

  const onlineLights = () => {
    let counter = 0;
    for (const [index, light] of group.lights.entries()) {
      if (lights[light]["state"]["reachable"] === true) 
      counter = counter + 1;
    }
    return counter;
  }

  const getStyle = () => {
    if (group.state["any_on"]) {
      let lightBg = "linear-gradient(45deg, ";
      let step = 100 / group["lights"].length;
      for (const [index, light] of group.lights.entries()) {
        if (lights[light]["state"]["colormode"] === "xy") {
          if (group["lights"].length === 1) {
            lightBg = lightBg + "rgba(200,200,200,1) 0%,";
          }
          lightBg =
            lightBg +
            cieToRgb(
              lights[light]["state"]["xy"][0],
              lights[light]["state"]["xy"][1],
              254
            ) +
            " " +
            Math.floor(step * (index + 1)) +
            "%,";
        } else if (lights[light]["state"]["colormode"] === "ct") {
          if (group["lights"].length === 1) {
            lightBg = lightBg + "rgba(200,200,200,1) 0%,";
          }
          lightBg =
            lightBg +
            colorTemperatureToRgb(lights[light]["state"]["ct"]) +
            " " +
            Math.floor(step * (index + 1)) +
            "%,";
        } else {
          if (group["lights"].length === 1) {
            lightBg = lightBg + "rgba(200,200,200,1) 0%,";
          }
          lightBg =
            lightBg +
            "rgba(255,212,93,1) " +
            Math.floor(step * (index + 1)) +
            "%,";
        }
      }
      return { background: lightBg.slice(0, -1) + ")" };
    }
  };

  return (
    <div className="groupCard">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      <div className="row top">
        <div className="gradient" style={getStyle()} >{group["type"] === "Zone" ? <FaCouch /> : <BsFillHouseDoorFill />}</div>
        <div className="text">
          <p className="name">{group.name}</p>
          <p className="subtext">{onlineLights()} lamps online</p></div>
        <div className="switchContainer">
          <label className="switch">
            <input
              type="checkbox"
              value={group.state["any_on"]}
              checked={group.state["any_on"]}
              onChange={(e) => handleToggleChange(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <div className="row background">
        <div className="sliderContainer">
          <input
            type="range"
            min="1"
            max="254"
            value={group.action["bri"]}
            step="1"
            className="slider"
            onChange={(e) => handleBriChange(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div class="row colorpicker">
          {showContainer === "colorPicker" && (
            <ColorPicker
              HOST_IP={HOST_IP}
              api_key={api_key}
              lights={lights}
              groupLights={group.lights}
            />
          )}
          {showContainer === "lights" && (
            <div className="lights">
              {group.lights.map((light) => (
                <Light
                  HOST_IP={HOST_IP}
                  api_key={api_key}
                  key={light}
                  id={light}
                  light={lights[light]}
                />
              ))}

            </div>
          )}
      </div>

      {showContainer === "closed" && (
        <div className="row bottom">
          <div className="expandbtn"><FaChevronDown
            onClick={() => setShowContainer("colorPicker")}
          /></div>
        </div>) ||
        (<div className="row bottom">
          <div className="expandbtn"><FaImages
            onClick={() => setIsOpen(true)}
          /></div>
          <div className="expandbtn"><FaChevronUp
            onClick={() => setShowContainer("closed")}
          /></div>
          <div className="expandbtn"><FaLightbulb
            onClick={() => setShowContainer("lights")}
          /></div>
        </div>)}



    </div>
  );
};

export default Group;



