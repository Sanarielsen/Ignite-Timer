import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { Component, ReactNode, Ref, RefAttributes, createRef, forwardRef } from 'react';

interface ModalStructureProps {

  // title: string,
  // triggerType: ReactNode,
  // modalType: ReactNode,
  children: ReactNode[];  
}

//export const ModalStructure = forwardRef(({children, ...props}, forwardRef) => {
//export const ModalStructure = forwardRef(({children}: ModalStructureProps, ref: Ref<HTMLButtonElement> | undefined, ...props) => {
//export const ModalStructure = (({children}: ModalStructureProps) => {
export const ModalStructure = forwardRef(( props, ref) => {

  return (

    <Dialog.Root>
      <Dialog.Trigger asChild>
        
        {children[0]}
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay style={{backgroundColor: "black"}} />

        <Dialog.Content>
          
          <Dialog.Close>
            <X size={24} aria-label="Fechar" />
          </Dialog.Close>

          <Dialog.Title>
            TESTE
            {/* {props.title} */}
          </Dialog.Title>

        </Dialog.Content>

        {children[1]}

      </Dialog.Portal>

    </Dialog.Root>
  )
})