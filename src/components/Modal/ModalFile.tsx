import { useContext } from "react";
import { useForm } from "react-hook-form"

import { X } from "phosphor-react";

import { ButtonPositive, DialogClose, DialogContent, DialogBody, DialogOverlay, DialogTitle, DialogBodyActions } from './ModalStyle';
import { CyclesContext } from '../../contexts/CyclesContext';
import { InputFile, SwitchLabel, SwitchRoot, SwitchThumb } from "./styles";

interface HistoryFile {

  file: FileList
}

interface ModalSubmitProps {

  titleModal: string;
  titleButton: string;  
  handleSubmitModal: ( responseCycles: string ) => void;
  handleClose: () => void;
}

export function ModalFile( { titleModal, titleButton, handleSubmitModal, handleClose }: ModalSubmitProps ) {

  const {refreshCyclesLoaded} = useContext(CyclesContext)

  const { register, handleSubmit } = useForm<HistoryFile>();  

  function onSubmitFile(data: HistoryFile) {    
    const fileReader = new FileReader();
    fileReader.readAsText(data.file[0]);
    fileReader.onload = (e) => {
      const historyJSON = JSON.stringify(e.target?.result).replace(/\\/g,"").replace('""', "").replace('""', "")
      handleSubmitModal(historyJSON)

      // localStorage.setItem('@Ignite-Timer:cyclesState', historyJSON)
      // const cycleState: CycleState = JSON.parse(historyJSON)
      // refreshCyclesLoaded(cycleState)
      // handleSubmitModal()
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
          
            <InputFile 
              type="file"
              required
              {...register("file")}
            />

            <SwitchLabel> Subscrever registros atuais? </SwitchLabel>
            <SwitchRoot id="undersignToggle">
              <SwitchThumb />
            </SwitchRoot>

          </DialogBody>
          <DialogBodyActions>
            <ButtonPositive type="submit"> {titleButton} </ButtonPositive>
          </DialogBodyActions>
        </form>
      </DialogContent>
    </>    
  )
}