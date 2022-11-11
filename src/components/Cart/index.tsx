import { useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { Handbag, X } from 'phosphor-react'
import axios from 'axios'
import { useCart } from '../../hooks/useCart'
import {
  ButtonCartLength,
  ButtonContainer,
  EmptyCart,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalOverlay,
  ProductCart,
  ProductCartWrapper,
  ProductImage,
  ProductInfo,
  ProductsResume
} from './styles'
import { Spinner } from '../Spinner'

export function Cart() {
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonContainer>
          <Handbag
            size={24}
            weight='bold'
            color='#8D8D99'
          />

          {cartItems.length > 0 && (
            <ButtonCartLength>
              {cartItems.length}
            </ButtonCartLength>
          )}
        </ButtonContainer>
      </Dialog.Trigger>

      <Dialog.Portal>
        <ModalOverlay />
        <ModalContent>
          <Dialog.Title>
            Sacola de compras
          </Dialog.Title>
          <ModalDescription>
            {cartItems.length >= 1
              ? (
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
              : (
                <EmptyCart>
                  <span>Você não possui produto no carrinho</span>
                </EmptyCart>
              )
            }

          </ModalDescription>
          <ModalClose asChild>
            <X size={24} color='#8D8D99' weight='bold' />
          </ModalClose>
        </ModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}