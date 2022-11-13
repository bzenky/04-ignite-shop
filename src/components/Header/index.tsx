import Link from "next/link";
import Image from "next/image"
import { Cart } from "../Cart"

import logoImg from '../../assets/logo.svg'
import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <Link href='/'>
        <Image src={logoImg} alt="" />
      </Link>

      <Cart />
    </HeaderContainer>
  )
}