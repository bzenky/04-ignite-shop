import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails
} from '../../styles/pages/product'
import { useCart } from '../../hooks/useCart'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    priceNumber: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addCart, checkIfAlreadyInCart } = useCart()
  const isProductAlreadyInCart = checkIfAlreadyInCart(product.id)

  function handleBuyProduct() {
    if (checkIfAlreadyInCart(product.id)) return

    addCart(product)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isProductAlreadyInCart} onClick={handleBuyProduct}>
            {isProductAlreadyInCart
              ? 'Produto no carrinho'
              : 'Colocar na sacola'
            }
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MdhKzTBghl5KXo' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        priceNumber: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}