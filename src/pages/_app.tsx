import { AppProps } from "next/app"
import { Container } from "../styles/pages/app"
import { globalStyles } from "../styles/global"
import { Header } from "../components/Header"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  )
}