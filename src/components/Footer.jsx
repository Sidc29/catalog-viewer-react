export const Footer = ({ darkMode }) => {
  return (
    <footer
      style={{
        backgroundColor: darkMode && "#121212",
        color: darkMode && "white",
      }}
    >
      Credits to
      <a
        href="https://www.theguardian.com/lifeandstyle/2022/dec/28/the-best-photographs-of-2022-and-the-stories-behind-them"
        target="_blank"
      >
        &nbsp;The Guardian&nbsp;
      </a>
      for the Photographs.
      <p>
        Made by{" "}
        <a href="http://shiddharth-portfolio.vercel.app/" target="_blank">
          Siddharth.
        </a>
      </p>
    </footer>
  );
};
