import React ,{ createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //New state to track loading


  useEffect(()=>{
    if(user) {
      console.debug("User already in context, skipping fetch");
      return;
    }

    const accessToken = localStorage.getItem("token");
    if(!accessToken){
      console.debug("No token found, skipping user fetch");
      setLoading(false);
      return;
    }

    console.debug("Token found, fetching user profile");
    const fetchUser = async()=>{
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PEOPLE);
        console.debug("User profile fetched successfully");
        setUser(response.data);
      } catch (error) {
        console.error("User profile fetch failed:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
        clearUser();
      }finally{
        setLoading(false);
      }
    }

    fetchUser();
  },[])



  const updateUser = (userData)=>{
    console.debug("Updating user context with:", userData._id);
    if (userData && userData.token) {
      localStorage.setItem("token", userData.token);
    }
    setUser(userData);
    setLoading(false);
  }

  const clearUser = ()=>{
    console.debug("Clearing user context");
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  }
  



  return(
    <UserContext.Provider value={{user,loading,updateUser,clearUser}}>
      {children}
    </UserContext.Provider>
  ) 
}

export default UserProvider;