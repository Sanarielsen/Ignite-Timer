import styled from 'styled-components';
import { Root, Thumb } from '@radix-ui/react-switch';

export const InputFile = styled.input`

  margin-bottom: 20px;
`

export const SwitchLabel = styled.label`

  margin-right: 10px;  
  color: white;
  font-size: 15px;
  line-height: 1;
`

export const SwitchRoot = styled(Root)`

  width: 42px;
  height: 25px;
  background-color: var(--blackA9);
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px var(--blackA7);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:focus {

    box-shadow: 0 0 0 2px black;
  }

  &[data-state='checked'] {

    background-color: black;
  }
`

export const SwitchThumb = styled(Thumb)`
  
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--blackA7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state='checked'] {

    transform: translateX(19px);
  }
`