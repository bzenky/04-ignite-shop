import { createContext, ReactNode, useState } from "react"
import { addCartToast, removeCartToast } from "../components/Toast"
export interface ProductProps {
    id: string
    name: string
    imageUrl: string
    price: string
    priceNumber: number
    description: string
    defaultPriceId: string
}

interface CartContextProps {
    cartItems: ProductProps[]
    addCart: (product: ProductProps) => void
    removeCart: (productId: string) => void
    checkIfAlreadyInCart: (productId: string) => boolean
    cartTotalPrice: number
}

interface CartContextProviderProps {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [cartItems, setCartItems] = useState<ProductProps[]>([])

    const cartTotalPrice = cartItems.reduce((total, product) => {
        return total + product.priceNumber;
    }, 0);

    function addCart(product: ProductProps) {
        setCartItems((state) => [...state, product])
        addCartToast()
    }

    function checkIfAlreadyInCart(productId: string) {
        return cartItems.some((product) => product.id === productId)
    }

    function removeCart(productId: string) {
        const filteredCart = cartItems.filter((item) => item.id !== productId)
        setCartItems(filteredCart)
        removeCartToast()
    }

    return (
        <CartContext.Provider
            value={{ cartItems, addCart, removeCart, checkIfAlreadyInCart, cartTotalPrice }}
        >
            {children}
        </CartContext.Provider>
    )
}