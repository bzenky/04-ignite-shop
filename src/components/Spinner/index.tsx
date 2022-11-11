import { SpinnerContainer } from "./styles"
import SpinnerImg from '../../assets/spinner.svg'
import Image from "next/image"

export function Spinner() {
    return (
        <SpinnerContainer>
            <Image
                src={SpinnerImg}
                alt='spiner'
                width={40}
                height={40}
            />
        </SpinnerContainer>
    )
}