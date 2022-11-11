import { useState } from "react"
import Image from 'next/image'
import axios from "axios"
import { Spinner } from "../../Spinner"
import { useCart } from "../../../hooks/useCart"
import { ProductCart, ProductCartWrapper, ProductImage, ProductInfo, ProductsResume } from "./styles"

export function ContentCart() {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { cartItems, removeCart, cartTotalPrice } = useCart()

    const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(cartTotalPrice / 100)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                products: cartItems
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
            setIsCreatingCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return (
        <>
            <ProductCartWrapper>
                {cartItems.map((cartItem) => {
                    return (
                        <ProductCart key={cartItem.id}>
                            <ProductImage>
                                <Image src={cartItem.imageUrl} alt='' width={94} height={94} />
                            </ProductImage>
                            <ProductInfo>
                                <span>{cartItem.name}</span>
                                <strong>{cartItem.price}</strong>
                                <button onClick={() => removeCart(cartItem.id)}>Remover</button>
                            </ProductInfo>
                        </ProductCart>
                    )
                })}
            </ProductCartWrapper>

            <ProductsResume>
                <div>
                    <span>Quantidade</span>
                    <span>{cartItems.length}</span>
                </div>
                <div>
                    <strong>Valor Total</strong>
                    <strong>{formattedTotalPrice}</strong>
                </div>
                <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
                    {isCreatingCheckoutSession ? <Spinner /> : 'Finalizar compra'}
                </button>
            </ProductsResume>
        </>
    )
}