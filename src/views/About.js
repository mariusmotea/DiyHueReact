import {
  FaGithub,
  FaTwitter,
  FaGlobeEurope,
  FaSlack
} from "react-icons/fa";

const About = () => {
  return (
    <div className="inner">
      <div className="contentContainer">
        <div className="headline">About</div>
        <div className="form-control">
            <label>Debug Information: (Copy and Paste in github issue)</label> 
            <textarea
              readOnly
              type="text"
              placeholder="bridgeid"
              value="Hue-Emulator Version: %Version%"
            />
          </div>
        <div className="supportsection">
          <p>Supported Devices:</p>
          <a href="https://diyhue.readthedocs.io/en/latest/">Link</a>
        </div>
        <div className="supportsection">
          <p>Support:</p>
          <a href="https://github.com/diyhue/diyhue"><FaGithub /></a>
          <a href="https://slackinvite.squishedmooo.com/"><FaSlack /></a>
        </div>
        Ko-Fi Button
      </div>


      <div className="creditGrid">
        

        <div className="contactCard">
          <div className="name">Marius</div>
          <div className="position">Main Developer & Mastermind of DiyHue</div>
          <div className="about">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</div>
          <div className="iconbox">
            <a href="https://github.com/mariusmotea"><FaGithub /></a>
            <a href=""><FaTwitter /></a>
            <a href=""><FaGlobeEurope /></a>
          </div>
        </div>

        <div className="contactCard">
          <div className="name">cheesemarathon</div>
          <div className="position">Contributor & </div>
          <div className="about">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</div>
          <div className="iconbox">
            <a href="https://github.com/cheesemarathon"><FaGithub /></a>
            <a href=""><FaTwitter /></a>
            <a href=""><FaGlobeEurope /></a>
          </div>
        </div>

        <div className="contactCard">
          <div className="name">Mevel</div>
          <div className="position">Maintainer & Support </div>
          <div className="about">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</div>
          <div className="iconbox">
            <a href="https://github.com"><FaGithub /></a>
            <a href=""><FaTwitter /></a>
            <a href=""><FaGlobeEurope /></a>
          </div>
        </div>

        <div className="contactCard">
          <div className="name">David</div>
          <div className="position">Designer - UI/UX</div>
          <div className="about">Music producing (<a href="https://spaceflightmemories.com">Spaceflight Memories Music</a>) and design is what my life is all about.</div>
          <div className="iconbox">
            <a href="https://github.com/fisico"><FaGithub /></a>
            <a href="https://twitter.com/sfmdavid"><FaTwitter /></a>
            <a href="https://spaceflightmemories.com"><FaGlobeEurope /></a>
          </div>
        </div>

        <div className="contactCard">
          <div className="name">Thank you!</div>
          <div className="position">Contributors:</div>
          contributor, contributor, contributor, contributor, contributor, contributor, contributor, contributor, contributor, contributor, contributor, contributor,
        </div>

      </div>
      </div>
      
  );
};

export default About;
