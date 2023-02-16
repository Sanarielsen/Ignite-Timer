import { useContext, useRef, useState } from "react";

import { CyclesContext } from "../../contexts/CyclesContext";
import { 
  HistoryButtonReset, 
  HistoryContainer, 
  HistoryContainerHeader, 
  HistoryList, 
  HistoryTable, 
  HistoryTableBody, 
  HistoryTitleHeader, 
} from "./styles";
import { ModalConfirmation } from "../../components/Modal/ModalConfirmation";
import { ModalStructure } from "../../components/Modal/ModalStructure";
import { HistoryData } from "./components/HistoryData";

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
        <HistoryTable>
          <thead>
            <tr>
              {headerHistoryList.map((option) => {
                return (
                  <th key={option.id}> {option.value} </th>
                )
              })}
            </tr>
          </thead>
          <HistoryTableBody>            
            {cycles.map((cycle) => {
              return (
                <HistoryData key={cycle.id} cycle={cycle} />
              )
            })}
            <tr id="panelReference" style={{width: "100%", height: "5px", backgroundColor: "red"}}> Teste </tr>             
          </HistoryTableBody>  
        </HistoryTable>
      </HistoryList>
    </HistoryContainer>
  )
}