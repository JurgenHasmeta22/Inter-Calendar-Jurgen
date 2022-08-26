import "./FooterCommon.css";
import { motion } from "framer-motion";

export default function FooterCommon() {
  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: -50, marginTop: -200 }}
        animate={{ opacity: 1, y: 0, marginTop: 0, transition: { delay: 0.5 } }}
      >
        <footer className="footer-welcome">
          <span>Copyright © 2021 - 2022 !</span>
          <span>
            Disclaimer: This site does not store any files on its server! All
            contents are provided by non-affiliated third parties!
          </span>
        </footer>
      </motion.footer>
    </>
  );
}
