import * as Dialog from '@radix-ui/react-dialog';
import {  ForwardedRef, ReactNode, RefAttributes, createRef, forwardRef } from 'react';

type Props = { 
  children: ReactNode[],
  // open: boolean,
  // onOpenChange: (open: boolean) => void,  
};
type Ref = HTMLButtonElement;

export const ModalStructure = forwardRef<Ref, Props>((props, ref) => {  

  return (

    <Dialog.Root>
      <Dialog.Trigger asChild ref={ref as ForwardedRef<HTMLButtonElement>}>
          
        {props.children[0]}
      </Dialog.Trigger>

      <Dialog.Portal>    

        <div ref={ref as ForwardedRef<HTMLDivElement>}>

          {props.children[1]}
        </div>        
      
      </Dialog.Portal>

    </Dialog.Root>
  )
})