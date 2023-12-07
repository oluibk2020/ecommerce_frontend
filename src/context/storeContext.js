import { createContext, useState } from "react";

const storeContext = createContext()

export const StoreProvider = ({children})=>{
    const [login, setLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const contextObj = {
        login,
        setLogin,
        isLoading,
        setIsLoading
    }

    return(
        <storeContext.Provider value={contextObj}>
            {children}
        </storeContext.Provider>
    )
}

export default storeContext