import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { Component, ReactNode } from 'react';

interface ModalStructure {

  title: string,
  triggerType: ReactNode,
  modalType: ReactNode,
}

export function ModalStructure( props: ModalStructure ) {

  return (

    <Dialog.Root>
      <Dialog.Trigger asChild>
        {props.triggerType}
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay />

        <Dialog.Content>
          
          <Dialog.Close>
            <X size={24} aria-label="Fechar" />
          </Dialog.Close>

          <Dialog.Title>

            {props.title}
          </Dialog.Title>

        </Dialog.Content>

        {props.modalType}

      </Dialog.Portal>

    </Dialog.Root>
  )
}