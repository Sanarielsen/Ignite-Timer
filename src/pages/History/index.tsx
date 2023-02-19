import { useContext, useEffect, useRef, useState } from "react";

import { CyclesContext } from "../../contexts/CyclesContext";
import { 
  HistoryButtonReset, 
  HistoryContainer, 
  HistoryContainerHeader, 
  HistoryList, 
  HistoryTitleHeader, 
} from "./styles";
import { ModalConfirmation } from "../../components/Modal/ModalConfirmation";
import { ModalStructure } from "../../components/Modal/ModalStructure";
import { HistoryData } from "./components/HistoryData";
import { ScrolViewInfinite } from "./components/ScrollViewInfinite";

const headerHistoryList = [

  { id: "task", value: "Tarefa" },
  { id: "time", value: "Duração" },
  { id: "timePassed", value: "Início" },
  { id: "status", value: "Status" },
]

export function History() {
  const { cycles, deleteListOfCycles } = useContext(CyclesContext)  
  const ref = useRef<HTMLButtonElement>(null);

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);  

  const haveCycles = cycles.length;
  
  function handleCyclesRemove() {

    setOpenModalConfirm(false)
    deleteListOfCycles()      
  }

  useEffect(() => {
    
    ScrolViewInfinite();
  },[cycles])

  return (
    
    <HistoryContainer>

      <HistoryContainerHeader> 
        <HistoryTitleHeader> Meu histórico </HistoryTitleHeader>
        <ModalStructure open={openModalConfirm} handleOpenChange={setOpenModalConfirm} ref={ref}>
          <HistoryButtonReset                                             
              type="button"
              disabled={!(haveCycles > 0)}
              onClick={() => setOpenModalConfirm(true)}                     
          >
            Reset History
          </HistoryButtonReset>
          <ModalConfirmation            
            title="Excluir histórico" 
            message="Tem certeza que gostaria de apagar seu histórico? Essa operação é irreversivel" 
            handleClose={() => setOpenModalConfirm(false)}
            handleSubmit={() => handleCyclesRemove()}
          />
        </ModalStructure>
      </HistoryContainerHeader>      
      
      <HistoryList>
        <table>
            <thead>
              <tr>
                {headerHistoryList.map((option) => {
                  return (
                    <th key={option.id}> {option.value} </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="cycleContainer">              
              {cycles.map((cycle) => {
                return (
                  <HistoryData key={cycle.id} cycle={cycle} />
                )
              })}             
            </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}