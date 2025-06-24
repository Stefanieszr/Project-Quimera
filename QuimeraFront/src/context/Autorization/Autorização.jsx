import { createContext, useState } from "react";

const ButtonContext = createContext();

const ButtonProvider = ({ children }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
    localStorage.setItem("buttonClicked", true);

    setTimeout(() => {
      setButtonClicked(false);
      localStorage.removeItem("buttonClicked");
    }, 30 * 60 * 1000);
  };

  return (
    <ButtonContext.Provider value={{ buttonClicked, handleButtonClick }}>
      {children}
    </ButtonContext.Provider>
  );
};

export { ButtonContext, ButtonProvider };
