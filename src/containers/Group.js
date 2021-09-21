import {
  FaCouch,
  FaChevronDown,
  FaChevronUp,
  FaImages,
  FaLightbulb,
  FaPalette,
} from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { MdInvertColors } from "react-icons/md";
import { useState, useCallback } from "react";
import axios from "axios";
import Scenes from "./Scenes";
import Light from "./GroupLight";
import ColorPicker from "./ColorPicker";
import ColorTempPicker from "./ColorTempPicker";
import debounce from "lodash.debounce";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { cieToRgb, colorTemperatureToRgb } from "../color";

const Group = ({ HOST_IP, api_key, id, group, lights, scenes }) => {
  const [showContainer, setShowContainer] = useState("closed");
  const [sceneModal, setSceneModal] = useState(false);
  const [lightsCapabilities, setLightsCapabilities] = useState([]);

  const barIconVariants = {
    opened: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    }
  }

  const inspectLightsCapabilities = () => {
    for (const [index, light] of group.lights.entries()) {
      if ("xy" in lights[light]["state"] && !lightsCapabilities.includes('xy')) {
        setLightsCapabilities([...lightsCapabilities, "xy"]);
      }
      if ("ct" in lights[light]["state"] && !lightsCapabilities.includes('ct')) {
        setLightsCapabilities([...lightsCapabilities, "ct"]);
      }
    };
  }
  inspectLightsCapabilities();
  console.log(lightsCapabilities);

  const defaultContainerView = () => {
    if (showContainer === "closed") {
      if (lightsCapabilities.includes('xy')) {
        setShowContainer("colorPicker");
      }
      else if (lightsCapabilities.includes('ct')) {
        setShowContainer("colorTempPicker");
      }
      else {
        setShowContainer("lights");
      }
    } else {
      setShowContainer("closed");
    }
  }

  const handleToggleChange = (state) => {
    const newState = {
      on: state,
    };
    group.state["any_on"] = state;
    if (!state)
      setShowContainer("closed");
    console.log("Apply state " + JSON.stringify(newState));
    axios.put(`${HOST_IP}/api/${api_key}/groups/${id}/action`, newState);
  };

  const handleBriChange = (state) => {
    group.action["bri"] = state;
    const newState = {
      bri: state,
    };
    console.log("Apply state " + JSON.stringify(newState));
    axios.put(`${HOST_IP}/api/${api_key}/groups/${id}/action`, newState);
  };

  const onlineLights = () => {
    let counter = 0;
    for (const [index, light] of group.lights.entries()) {
      if (lights[light]["state"]["reachable"] === true) counter = counter + 1;
    }
    return counter;
  };

  const debouncedChangeHandler = useCallback(
    debounce(handleBriChange, 300),
    []
  );

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
      return {
        background: lightBg.slice(0, -1) + ")",
      };
    }
  };

  return (
    <div className="groupCard">
      <Scenes
        HOST_IP={HOST_IP}
        api_key={api_key}
        groupId={id}
        scenes={scenes}
        sceneModal={sceneModal}
        setSceneModal={setSceneModal}
      />
      <div className="row top">
        <div className="gradient" style={getStyle()}>

          {group["type"] === "Zone" ? (
            <FaCouch
              style={{
                color: "#8400FF",
              }}
            />
          ) : (
              <BsFillHouseDoorFill style={{ color: "#8400FF" }} />
            )}
        </div>
        <div className="text">
          <p className="name"> {group.name} </p>
          <p className="subtext">
            {onlineLights()} lamps online
          </p>
        </div>
        <div className="switchContainer">
          <label className="switch">
            <input
              type="checkbox"
              defaultValue={group.state["any_on"]}
              defaultChecked={group.state["any_on"]}
              onChange={(e) => handleToggleChange(e.target.checked)}
            />
            <span className="slider"> </span>
          </label>
        </div>
      </div>
      <div className="row background">
        <AnimatePresence initial={false}>

          {group.state["any_on"] && (
            <motion.div className="sliderContainer"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: {
                  opacity: 1,
                  height: "auto",
                },
                collapsed: {
                  opacity: 0,
                  height: 0,
                },
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <input
                type="range"
                min="1"
                max="254"
                defaultValue={group.action["bri"]}
                step="1"
                className="slider"
                onChange={(e) => debouncedChangeHandler(parseInt(e.target.value))}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimateSharedLayout>
        <motion.div className="row colorpicker">
          <AnimatePresence initial={false}>

            {showContainer === "colorPicker" && (
              <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    opacity: 1,
                    scale: 1,
                    height: "auto",
                  },
                  collapsed: {
                    opacity: 0,
                    scale: .5,
                    height: 0,
                  },
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <ColorPicker
                  HOST_IP={HOST_IP}
                  api_key={api_key}
                  lights={lights}
                  groupLights={group.lights}
                />
              </motion.section>
            )}
            {showContainer === "colorTempPicker" && (
              <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    opacity: 1,
                    height: "auto",
                    scale: 1,
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                  },
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <ColorTempPicker
                  HOST_IP={HOST_IP}
                  api_key={api_key}
                  groupId={id}
                  group={group}
                />
              </motion.section>
            )}
            {showContainer === "lights" && (
              <motion.div
                className="lights"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    opacity: 1,
                    height: "auto",
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                  },
                }}
                transition={{
                  duration: 0.8,
                }}
              >

                {group.lights.map((light) => (
                  <Light
                    HOST_IP={HOST_IP}
                    api_key={api_key}
                    key={light}
                    id={light}
                    light={lights[light]}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimateSharedLayout>
        <AnimatePresence>
      <div className="row bottom">

          <motion.div className={`btn ${lightsCapabilities.includes('xy') ? "" : "disabled"}`}
            initial="closed"
            animate={showContainer === "closed" ? "closed" : "opened"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            variants={barIconVariants}>
            <FaPalette onClick={lightsCapabilities.includes('xy') ? () => setShowContainer("colorPicker") : false} />
          </motion.div>
          <motion.div className="btn"
            initial="closed"
            animate={showContainer === "closed" ? "closed" : "opened"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            variants={barIconVariants}>
            <FaImages onClick={() => setSceneModal(true)} />
          </motion.div>
          <motion.div className="expandbtn"
            initial="collapsed"
            animate={showContainer === "closed" ? "collapsed" : "open"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            variants={{
              open: {
                rotate: 180
              },
              collapsed: {
                rotate: 0
              },
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <FaChevronDown onClick={() => defaultContainerView()} />
          </motion.div>
          <motion.div className="btn"
            initial="closed"
            animate={showContainer === "closed" ? "closed" : "opened"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            variants={barIconVariants}>
            <FaLightbulb onClick={() => setShowContainer("lights")} />
          </motion.div>
          <motion.div className={`btn ${lightsCapabilities.includes('ct') ? "" : "disabled"}`}
            initial="closed"
            animate={showContainer === "closed" ? "closed" : "opened"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            variants={barIconVariants}>
            <MdInvertColors onClick={lightsCapabilities.includes('ct') ? () => setShowContainer("colorTempPicker") : false}/>
          </motion.div>
      </div>
      </AnimatePresence>
    </div>
  );
};

export default Group;
