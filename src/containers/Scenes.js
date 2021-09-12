import Modal from 'react-modal';
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import nightsky from "../static/images/nightsky.jpg";
import sunset from "../static/images/sunset.jpg";
import galaxy from "../static/images/galaxy.jpg";


const Scenes = ({ HOST_IP, api_key, groupId, scenes, sceneModal, setSceneModal }) => {
  const applyScene = (scene) => {
    axios.put(`${HOST_IP}/api/${api_key}/groups/0/action`, { scene: scene });
  };

  function openModal() {
    setSceneModal(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setSceneModal(false);
  }

  return (
    <Modal
      isOpen={sceneModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <div className="header">
        <div className="headline">Scene Picker</div>
        <div className="iconbox"><button onClick={closeModal}><FaTimes /></button></div>
      </div>
      <div className="scenecontainer">
        {Object.entries(scenes)
          .filter((scene) => scene[1].group === groupId)
          .map(([id, scene]) => (
            <div className="scene selected" style={{ background: `url(${nightsky})`, backgroundSize: 'cover', }}>
              <div className="color"></div>
              <div className="color"></div>
              <div className="color"></div>
              <div className="color"></div>
              <div className="color"></div>
              <div className="name">Nightsky</div>
              <div className="dynamiccontrol"><i className="far fa-play-circle"></i></div>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default Scenes;
