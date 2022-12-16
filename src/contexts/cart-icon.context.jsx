//React 
import { createContext, useState } from "react";

export const CartIconContext = createContext({
    cartToggle: false,
    setCartToggle: () => {},
    // itemCount: 0
});



export const CartIconProvider = ({children}) => {

    const [cartToggle, setCartToggle] = useState(false);
    const value = {cartToggle, setCartToggle};    

    return(
    <CartIconContext.Provider value={value} >
        {children}
    </CartIconContext.Provider>)
}