const { createContext, useState } = require("react");

const ctx = createContext();

const Auth = ({ children }) => {
  const [token, setToken] = useState(document.cookie?.split(";")?.filter((item) => item.match(/token/))[0]?.split("=")[1]);

  return <ctx.Provider value={{ token, setToken }}>{children}</ctx.Provider>;
};

export { Auth, ctx };
