import apiInstance from "@/api/apiInstance";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(
    "Session is over, please login again..."
  );
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await apiInstance.get("/auth/current-user", {
          withCredentials: true,
        });

        const data = res.data;

        if (data.isSuccess) {
          const user = data.data.user;
          setUser(user);
        }
      } catch (error) {
        console.error(error);
        if (error.status === 401) {
          setAuthError("Session is over, please login again...");
          setIsAuthorized(false);
        }
      }
    }
    if (isAuthorized) fetchUser();
  }, [isAuthorized]);

  return (
    <authContext.Provider
      value={{ user, authError, isAuthorized, setIsAuthorized }}
    >
      {children}
    </authContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("Auth context used outside provider");

  return context;
};

export { AuthProvider, useUser };
