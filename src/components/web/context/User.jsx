import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let UserContext = createContext();


export default function UserContextProvider({children}){
    
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userOrders, setUserOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserData = async ()=> {
        if(userToken){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
            {headers:{Authorization:`Tariq__${userToken}`}})
            setUserData(data.user);
            setLoading(false);
        }
    }

    const getUserOrders = async ()=> {
        if(userToken){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
            {headers:{Authorization:`Tariq__${userToken}`}})
            console.log(data);
            setUserOrders(data);
            setLoading(false);
        }
    }

    useEffect (()=>{
        getUserData();
        getUserOrders();
    },[userToken])

    return <UserContext.Provider value={{userToken, setUserToken, userData, setUserData, loading, userOrders}}>
        {children}
    </UserContext.Provider>
}