import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

export const DialogOverlay = styled(Dialog.Overlay)`

  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  width: 100vw;
  height: 100vh;
  
  background-color: black;
  opacity: 0.4;
`;

export const DialogContent = styled(Dialog.Content)`

  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 28rem;

  padding: 2.5rem;
  border-radius: 1rem;  
  
  transform: translate(-50%, -50%);  

  background-color: #29292E;
`;

export const DialogClose = styled(Dialog.Close)`

  position: absolute;

  right: 1.5rem;
  top: 1.5rem;
  border-radius: 0.5rem;

  background: none;
  border: none;
  color: ${defaultTheme['zinc-400']};

  &:hover {

    color: ${defaultTheme['zinc-200']};    
  };

  &:focus {

    outline: 2px solid transparent;
    outline-offset: 2px;
  };
`;

export const DialogTitle = styled(Dialog.Title)`

  margin-bottom: 2rem;

  font-size: 1.875rem;
  font-weight: 800;
  line-height: 2.25rem;
`

export const DialogBody = styled.div`

  margin-bottom: 2rem;
`

export const DialogBodyActions = styled.div`

  display: flex;
`

export const DialogButton = styled.button`

  width: 100%;
  border: 0;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  color: ${props => props.theme['gray-100']};

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
`

export const ButtonPositive = styled(DialogButton)`

  background: ${props => props.theme['green-500']};

  &:hover {

    background: ${props => props.theme['green-700']};
  }
`

export const ButtonNegative = styled(DialogButton)`
  
  background: ${props => props.theme['red-500']};

  &:hover {

    background: ${props => props.theme['red-700']}
  }
`