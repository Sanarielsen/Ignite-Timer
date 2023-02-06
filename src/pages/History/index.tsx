import { createRef, useContext, useLayoutEffect, useRef } from "react";
import { HistoryButtonReset, HistoryContainer, HistoryContainerHeader, HistoryList, HistoryTitleHeader, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ModalConfirmation } from "../../components/Modal/ModalConfirmation";
import { ModalStructure } from "../../components/Modal/ModalStructure";

export function History() {
  const { cycles, deleteListOfCycles } = useContext(CyclesContext)
    
  const haveCycles = cycles.length;

  //const ref = createRef();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    
    <HistoryContainer>

      <HistoryContainerHeader> 
        <HistoryTitleHeader> Meu histórico </HistoryTitleHeader>

        {/* <ModalStructure        
          title="Excluir Histórico"
          triggerType={
            <HistoryButtonReset         
              type="button"
              disabled={!(haveCycles > 0)}          
            >
              Reset History
            </HistoryButtonReset>
          }
          modalType={
            <ModalConfirmation />
          }                             
        />              */}

        <ModalStructure>
          <HistoryButtonReset                       
              type="button"
              disabled={!(haveCycles > 0)}
              onClick={() => console.log("clicou")}         
            >
              Reset History
            </HistoryButtonReset>
          <ModalConfirmation />
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