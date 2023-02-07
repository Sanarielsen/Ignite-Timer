import { createRef, useContext, useLayoutEffect, useRef, useState } from "react";
import { HistoryButtonReset, HistoryContainer, HistoryContainerHeader, HistoryList, HistoryTitleHeader, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ModalConfirmation } from "../../components/Modal/ModalConfirmation";
import { ModalStructure } from "../../components/Modal/ModalStructure";
import { Dialog } from "@radix-ui/react-dialog";

export function History() {
  const { cycles, deleteListOfCycles } = useContext(CyclesContext)  
  const ref = useRef<HTMLButtonElement>(null);

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const haveCycles = cycles.length;
  
  function handleCyclesRemove() {

    setOpenModalConfirm(false)
    //deleteListOfCycles()      
  }

  return (
    
    <HistoryContainer>

      <HistoryContainerHeader> 
        <HistoryTitleHeader> Meu histórico </HistoryTitleHeader>
        <ModalStructure ref={ref}>
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

                <th>Tarefa</th>
                <th>Duração</th>
                <th>Início</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>              
              {cycles.map((cycle) => {

                return (

                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>{formatDistanceToNow(new Date(cycle.startDate), { 
                      addSuffix: true, locale: ptBR 
                    })}
                    </td>
                    <td>
                      { cycle.finishedDate && (
                        <Status statusColor="green">Concluído</Status> 
                      )}
                      { cycle.interruptedDate && (
                        <Status statusColor="red">Interrompido</Status> 
                      )}
                      { (!cycle.interruptedDate && !cycle.finishedDate) && (
                        <Status statusColor="yellow">Em andamento</Status> 
                      )}
                    </td>
                  </tr>   
                )
              })}             
            </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}