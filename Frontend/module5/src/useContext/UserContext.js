import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [checkUser, setCheckUser] = useState(true);
  const [userUpdated, setUserUpdated] = useState(false);

  useEffect(() => {
    if (!user || userUpdated) {
      // fetchUserData();
    }
    console.log(user)
  }, [user, userUpdated]);

  const fetchUserData = async () => {
    try {
      setCheckUser(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/user/read/logged`,
        { withCredentials: true }
      );
      setUser(response.data.user);
      setUserUpdated(false);
    } catch (err) {
      setUser(null);
      console.log(err);
    } finally {
      setCheckUser(false);
    }
  };

  const logOut = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND}/logout`);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logOut,
        fetchUserData,
        checkUser,
        setUserUpdated,
      }}>
      {children}
    </UserContext.Provider>
  );
};