import { ForwardedRef, ReactNode, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

type Props = { 
  children: ReactNode[],
  open: boolean,
  handleOpenChange: React.Dispatch<React.SetStateAction<boolean>>,  
};
type Ref = HTMLButtonElement;

export const ModalStructure = forwardRef<Ref, Props>((props, ref) => {  

  return (

    <Dialog.Root open={props.open} onOpenChange={props.handleOpenChange}>
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