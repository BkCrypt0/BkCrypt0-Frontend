import "./styles.css";

export const FailAnimation = function () {
  return (
    <div class="wrapper">
      <svg
        class="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle class="checkmark_circle" cx="26" cy="26" r="25" fill="none" />
        <path
          class="checkmark_check"
          fill="none"
          d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8"
        />
      </svg>
    </div>
  );
};

export const SuccessAnimation = function () {
  return (
    <div class="wrapper">
      {" "}
      <svg
        class="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        {" "}
        <circle
          class="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />{" "}
        <path
          class="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
};
