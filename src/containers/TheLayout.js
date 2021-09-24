import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TheContent, TheSidebar, TheHeader } from "./index";
import { motion } from "framer-motion";

const TheLayout = ({ HOST_IP, API_KEY }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [showSidebar, setShowSidebar] = useState(isMobile);


  return (
    <>
      <motion.section
        key="content"
        initial="collapsed"
        animate= {showSidebar ? "open" : "collapsed"}
      exit="collapsed"
        variants={{
        open: {
          opacity: 1,
          x: 0,
        },
        collapsed: {
          opacity: 0,
          x: -100,
        },
      }}
      transition={{
        duration: 0.5,
      }}
      >

        <TheSidebar showSidebar={showSidebar} />
    </motion.section>
    <div className="columnRight">
      <TheHeader
        HOST_IP={HOST_IP}
        API_KEY={API_KEY}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <TheContent HOST_IP={HOST_IP} API_KEY={API_KEY} />
    </div>
    </>
  );
};

export default TheLayout;
