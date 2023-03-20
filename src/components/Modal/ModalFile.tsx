import { ButtonNegative, ButtonPositive, DialogClose, DialogContent, DialogBody, DialogOverlay, DialogTitle, DialogBodyActions } from './ModalStyle';
import { X } from "phosphor-react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form"
import { formatCharacterSet } from '../../utils/formatCharacterSet';

interface HistoryFile {

  file: FileList
}

interface ModalSubmitProps {

  titleModal: string;
  titleButton: string;  
  handleSubmitModal: () => void;
  handleClose: () => void;
}

export function ModalFile( { titleModal, titleButton, handleSubmitModal, handleClose }: ModalSubmitProps ) {

  const { register, handleSubmit } = useForm<HistoryFile>();  

  function onSubmitFile(data: HistoryFile) {    
    const fileReader = new FileReader();
    fileReader.readAsText(data.file[0]);
    fileReader.onload = (e) => {
      const historyJSON = JSON.stringify(e.target?.result).replace(/\\/g,"").replace('""', "").replace('""', "")      
      localStorage.setItem('@Ignite-Timer:cyclesState', historyJSON)

      handleSubmitModal()
    };
  }

  return (
    <>
      <DialogOverlay />
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitFile)}>
          <DialogClose onClick={handleClose}>
            <X size={24} aria-label="Fechar" />
          </DialogClose>
          <DialogTitle>
            {titleModal}
          </DialogTitle>
          <DialogBody>

            <input 
              type="file"
              {...register("file")}
            />

          </DialogBody>
          <DialogBodyActions>
            <ButtonPositive type="submit"> {titleButton} </ButtonPositive>
          </DialogBodyActions>
        </form>
      </DialogContent>
    </>    
  )
}