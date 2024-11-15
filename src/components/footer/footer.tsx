import { scrollToTop } from "../../utils/scrollToTop";

const Footer: React.FC = () => {
  return (
    <footer className="pt-4 pb-5 mt-5">
      <p className="text-center scroll-up-icon" onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#28b6cf" viewBox="0 0 256 256">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-101.66a8,8,0,0,1-11.32,11.32L136,107.31V168a8,8,0,0,1-16,0V107.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0Z"></path>
        </svg>
      </p>
      <p className="text-center small">
        © 2024. Data provided by TMDB
        <br />
        All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
