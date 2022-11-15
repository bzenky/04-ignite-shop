import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from 'next/link'
import { MouseEvent } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { ProductProps } from "../contexts/CartContext"
import { useCart } from "../hooks/useCart"

import { HomeContainer, Product } from "../styles/pages/home"
import { Handbag } from "phosphor-react"
import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: ProductProps[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    rubberband: false,
    breakpoints: {
      '(max-width: 1366px)': {
        slides: {
          perView: 2.1,
          spacing: 24,
        }
      },
      '(max-width: 768px)': {
        slides: {
          perView: 1.1,
          spacing: 12,
        }
      },
    },
  })

  const { addCart, checkIfAlreadyInCart } = useCart()

  function handleAddCart(event: MouseEvent<HTMLButtonElement>, product: ProductProps) {
    event.preventDefault()

    if (checkIfAlreadyInCart(product.id)) return

    addCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button
                    onClick={(event) => handleAddCart(event, product)}
                    disabled={checkIfAlreadyInCart(product.id)}
                  >
                    <Handbag size={32} color='#FFFFFF' weight='bold' />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return ({
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      priceNumber: price.unit_amount,
      defaultPriceId: price.id
    })
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}