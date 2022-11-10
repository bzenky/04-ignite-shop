import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { ImageContainer, ImageSection, SuccessContainer } from "../styles/pages/success"

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
  productsImages: string[]
}

export default function Success({ customerName, productsImages }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageSection>
          {productsImages.map((image, index) => {
            return (
              <ImageContainer key={index} >
                <Image src={image} width={140} height={140} alt='' />
              </ImageContainer>
            )
          })}
        </ImageSection>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {productsImages.length} camiseta{productsImages.length > 1 && 's'} já está a caminho da sua casa.
        </p>

        <Link href='/'>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const productsImages = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return product.images[0];
  });

  return {
    props: {
      customerName,
      productsImages
    }
  }
}