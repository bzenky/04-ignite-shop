import { styled } from ".."

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  '@container': {
    padding: '0 1rem'
  },

  '@notebook': {
    minHeight: 'calc(100vh - 120px)',
  },

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    color: '$green500',
    fontSize: '$lg',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300'
    }
  }
})

export const ImageSection = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '4rem'
})

export const ImageContainer = styled('div', {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.25rem',
  margin: '0 -26px',

  width: 140,
  height: 140,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465e4 100%)',
  borderRadius: '50%',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
})