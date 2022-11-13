import * as Dialog from '@radix-ui/react-dialog'
import { keyframes, styled } from '@stitches/react'

const fadeInAnimation = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
})

const fadeOutAnimation = keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
})

export const ButtonContainer = styled('div', {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    cursor: 'pointer',
    width: '56px',
    height: '56px',
    background: '$gray800',
    border: 'none'
})

export const ButtonCartLength = styled('div', {
    position: 'absolute',
    top: '-7px',
    right: '-7px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    background: '$green500',
    borderRadius: '50%',
    border: '3px solid $gray900',
    color: '$white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
})

export const ModalOverlay = styled(Dialog.Overlay, {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0 0 0 / 0.7)',
    backdropFilter: 'blur(4px)',

    "&[data-state='open']": {
        animation: `${fadeInAnimation} 0.1s ease-in`
    },

    "&[data-state='closed']": {
        animation: `${fadeOutAnimation} 0.1s ease-out`
    }
})

export const ModalTitle = styled(Dialog.Title, {
    fontSize: '1.25rem'
})

export const ModalContent = styled(Dialog.Content, {
    position: 'absolute',
    top: 0,
    right: '-100%',
    padding: '24px',
    width: '100%',
    maxWidth: '480px',
    height: '100%',
    maxHeight: '100vh',
    background: '$gray800',
    zIndex: '2',

    "&[data-state='open']": {
        right: 0,
    },
})

export const ModalDescription = styled(Dialog.Description, {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'calc(100vh - 80px)',
})

export const ModalClose = styled(Dialog.Close, {
    position: 'absolute',
    top: '24px',
    right: '24px',
    cursor: 'pointer'
})