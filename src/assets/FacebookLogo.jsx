const FacebookLogo = ({fillColor}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    style={{
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)",
      transform: "rotate(360deg)",
    }}
    viewBox="0 0 24 24"
  >
    <path
      className={`fill-${fillColor}`}
      fill="currentColor"
      fillRule="evenodd"
      d="M0 12.067C0 18.033 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067Z"
      clipRule="evenodd"
    />
    <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
  </svg>
)

export default FacebookLogo;
