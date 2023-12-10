import { createContext, useState } from "react";

const storeContext = createContext()

export const StoreProvider = ({children})=>{
    const [login, setLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [filterCategory, setFilterCategory] = useState("wristwatch");



    const contextObj = {
        login,
        setLogin,
        isLoading,
        setIsLoading,
        filterCategory,
        setFilterCategory
    }

    return(
        <storeContext.Provider value={contextObj}>
            {children}
        </storeContext.Provider>
    )
}

export default storeContext