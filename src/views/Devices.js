import { useState, useEffect } from "react";
import axios from "axios";
import Device from "../containers/Device";
import Flash from "../containers/Flash";
import { 
  BsBrightnessHighFill,
  BsBrightnessHigh,
  BsPower,
} from "react-icons/bs";
import { IoColorFilterOutline } from "react-icons/io5"


const Devices = ({ HOST_IP, API_KEY }) => {
  const [devices, setDevices] = useState({});
  const [type, setType] = useState("none");
  const [message, setMessage] = useState("no message");

  useEffect(() => {
    const fetchDevices = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/sensors`)
          .then((fetchedData) => {
            console.log(fetchedData.data);
            setDevices(fetchedData.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    fetchDevices();
    const interval = setInterval(() => {
      fetchDevices();
    }, 2000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);

  return (
    <div className="content">
      <div className="inner">
        <div className="devicecontainer">
            
      {type !== "none" && (
        <Flash
          type={type}
          message={message}
          duration="5000"
          setType={setType}
        />
      )}
      <div className="devicecard">
        {Object.entries(devices).map(([id, device]) => (
          device["protocol"] !== "none" &&
          <Device
            key={id}
            HOST_IP={HOST_IP}
            api_key={API_KEY}
            id={id}
            device={device}
            setType={setType}
            setMessage={setMessage}
          />
        ))}
      </div>
    </div>
    </div>

    <div className="hueSwitch">
      <div className="inner">
        <div className="button top"><BsPower /></div>
        <div className="spacer"></div>
        <div className="button middle"><BsBrightnessHighFill /></div>
        <div className="button middle"><BsBrightnessHigh /></div>
        <div className="spacer"></div>
        <div className="button bottom"></div>
      </div>
    </div>

    <div className="genericSwitch">
      <div className="inner">
        <div className="row left">
          <div className="button"><BsPower /></div>
          <div className="button"></div>
        </div>
        <div className="row right">
          <div className="button"><BsBrightnessHighFill /></div>
          <div className="button"><IoColorFilterOutline /></div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Devices;
