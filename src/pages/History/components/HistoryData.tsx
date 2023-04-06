import { formatDistanceToNow } from "date-fns"
import { Cycle, CycleState } from "../../../reducers/cycles/reducer"
import { ptBR } from "date-fns/locale"
import { Status } from "../styles"
import { MutableRefObject, RefObject, useRef, useState } from "react";

interface HistoryDataProps {
  cycle: Cycle;
}

export function HistoryData( { cycle }: HistoryDataProps ) {

  return (
    <>       
      <tr className="cycle">
        <td className="cycleTask">{cycle.task}</td>
        <td className="cycleTime">{cycle.minutesAmount} minutos</td>
        <td className="cycleTimePassed">{formatDistanceToNow(new Date(cycle.startDate), { 
          addSuffix: true, locale: ptBR 
        })}
        </td>
        <td className="cycleStatus">
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
    </>
  )
}