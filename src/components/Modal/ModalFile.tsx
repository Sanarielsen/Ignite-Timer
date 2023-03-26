import { ReactElement, useContext } from "react";
import { useForm, Controller, Control } from "react-hook-form";

import { X } from "phosphor-react";

import { ButtonPositive, DialogClose, DialogContent, DialogBody, DialogOverlay, DialogTitle, DialogBodyActions } from './ModalStyle';
import { CyclesContext } from '../../contexts/CyclesContext';
import { InputFile, SwitchLabel, SwitchRoot, SwitchThumb } from "./styles";
import { CycleState } from "../../reducers/cycles/reducer";
import { concatCyclesJSON } from "../../utils/concatCyclesJSON";

interface HistoryFile {

  file: FileList;
  undersign: string;
}

const Switch = (props) => (

  <Controller
    {...props}
    render={({ field }) => (      
      <SwitchRoot
        {...field}
        value={undefined}
        checked={field.value}
        onCheckedChange={field.onChange}
      >
        <SwitchThumb />
      </SwitchRoot>
    )}
  />
)

interface ModalSubmitProps {

  titleModal: string;
  titleButton: string;  
  handleSubmitModal: ( responseCycles: string ) => void;
  handleClose: () => void;
}

export function ModalFile( { titleModal, titleButton, handleSubmitModal, handleClose }: ModalSubmitProps ) {

  const {cycles, refreshCyclesLoaded} = useContext(CyclesContext)

  const { register, handleSubmit, control } = useForm<HistoryFile>();

  const haveCycles = cycles.length > 0;

  function onSubmitFile(data: HistoryFile) {        
    const fileReader = new FileReader();
    fileReader.readAsText(data.file[0]);
    fileReader.onload = (e) => {
      const historyJSON = JSON.stringify(e.target?.result).replace(/\\/g,"").replace('""', "").replace('""', "")      
      if (!data.undersign && haveCycles) {
        const storagedCycles = localStorage.getItem('@Ignite-Timer:cyclesState')
        const uniqueCycles = concatCyclesJSON(historyJSON, storagedCycles!)           
        // localStorage.setItem('@Ignite-Timer:cyclesState', uniqueCycles)
      } else {
        // localStorage.setItem('@Ignite-Timer:cyclesState', historyJSON)
      }    
      // const cycleState: CycleState = JSON.parse(localStorage.getItem('@Ignite-Timer:cyclesState')!)
      // refreshCyclesLoaded(cycleState)
      // handleSubmitModal(historyJSON)
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
        
            { haveCycles ? (
              <>
                <SwitchLabel> Subscrever registros atuais? </SwitchLabel>
                <Switch name="undersign" control={control} /> 
              </>
              ) : null
            }
            
          </DialogBody>
          <DialogBodyActions>
            <ButtonPositive type="submit"> {titleButton} </ButtonPositive>
          </DialogBodyActions>
        </form>
      </DialogContent>
    </>    
  )
}