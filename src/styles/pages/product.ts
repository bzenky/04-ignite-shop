import { styled } from ".."

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',
  maxWidth: 1180,
  margin: '0 auto',

  '@md': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  '@container': {
    padding: '1rem',
  }
})

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 576,
  height: 656,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465e4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  '@md': {
    height: 400
  },

  img: {
    objectFit: 'cover'
  }
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300'
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    transition: 'background-color 0.2s ease-in-out',

    '@md': {
      marginTop: '1.5rem'
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300'
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  }
})