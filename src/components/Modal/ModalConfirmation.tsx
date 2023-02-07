import { X } from 'phosphor-react';
import { ButtonNegative, ButtonPositive, DialogClose, DialogContent, DialogBody, DialogOverlay, DialogTitle, DialogBodyActions } from './ModalStyle';

interface ModalConfirmationProps {

  title: string,
  message: string,
  handleClose: () => void;
  handleSubmit: () => void;
}

export function ModalConfirmation( {title, message, handleClose, handleSubmit}: ModalConfirmationProps ) {

  return (
    <>
      <DialogOverlay />
      <DialogContent>
        <DialogClose onClick={handleClose}>
          <X size={24} aria-label="Fechar" />
        </DialogClose>
        <DialogTitle>          
          {title}
        </DialogTitle>
        
        <DialogBody> {message} </DialogBody>

        <DialogBodyActions>                                
            <ButtonNegative type="button" onClick={handleClose}> Não </ButtonNegative>          
            <ButtonPositive type="button" onClick={handleSubmit}> Sim </ButtonPositive>
        </DialogBodyActions>        
      </DialogContent>
      </>
  )
}