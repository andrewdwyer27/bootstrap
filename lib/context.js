import React, {useState, useEffect, createContext} from "react";
import { useUserData } from "../lib/helpers";

export const UserDataContext = createContext({
    user: null,
    username: null
})

export const UserDataProvider = ({children}) => {
    //Makes the user and username context variables because the useUserData continues to update them
    const { user, username } = useUserData();

    return (
        <UserDataContext.Provider value={{
            user,
            username
        }}>
            {children}
        </UserDataContext.Provider>
    )
}