import React, { useEffect, useState } from "react";
import axios from "axios";
import Group from "../containers/Group";

export default function Groups({ HOST_IP, API_KEY }) {
  const [config, setConfig] = useState({
    config: {},
    lights: {},
    groups: {},
    scenes: {},
  });

  useEffect(() => {
    const fetchConfig = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/api/${API_KEY}`)
          .then((fetchedData) => {
            console.log(fetchedData.data);
            setConfig(fetchedData.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    fetchConfig();
    const interval = setInterval(() => {
      fetchConfig();
    }, 2000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);

  return (
    <>
    <div className="scenepicker">
      <div className="header">
        <div className="headline">Scene Picker</div>
        <div className="iconbox"><i className="fas fa-times"></i></div>
      </div>
      <div className="scenecontainer">
        <div className="scene selected" >
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="name">Nightsky</div>
          <div className="dynamiccontrol"><i className="far fa-play-circle"></i></div>
        </div>
        <div className="scene">
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="name">Galaxy</div>
        </div>
        <div className="scene" >
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="name">sunset</div>
        </div>
      </div>
    </div>
    <div className="inner">
      <div className="cardGrid">
        {Object.entries(config.groups)
          .filter((group) => group[1].type !== "Entertainment")
          .map(([id, group]) => (
            <Group
              key={id}
              api_key={API_KEY}
              HOST_IP={HOST_IP}
              id={id}
              group={group}
              lights={config.lights}
              scenes={config.scenes}
            />
          ))}
      </div>
    </div>
    </>
  );
}
