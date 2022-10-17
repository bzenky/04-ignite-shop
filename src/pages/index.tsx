import {styled} from '../styles'

const Button = styled('button', {
  backgroundColor: '$green500',
  borderRadius: 4,
  border: 'none',
  padding: '4px 8px', 

  span: {
    fontWeight: 'bold'
  },

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})

export default function Home() {
  return (
    <Button>
      <span>Teste</span>
      Enviar
    </Button>
  )
}
