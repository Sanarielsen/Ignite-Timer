import { useContext, useEffect, useState } from 'react';
import { useFormContext } from "react-hook-form";

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {

  const { activeCycle, cycles } = useContext(CyclesContext);
  const { register } = useFormContext();

  const [cycleOptions, setCycleOptions] = useState<string[]>([])

  const haveCycles = cycles.length;

  function appendUniqueTasks(taskName: string) {    

    cycles.map((cycle) => {
      
      if ( cycle.task === taskName && !cycleOptions.includes(taskName) ) {
        
        setCycleOptions([...cycleOptions, taskName])
      }
    })    
  }

  useEffect(() => {

    cycles.map((cycle) => {
      appendUniqueTasks(cycle.task);
    })
    console.log(cycleOptions)
  },[cycleOptions, cycles])

  return (

    <FormContainer>
      <label htmlFor="task"> Vou trabalhar em </label>
      <TaskInput 
        id="task"
        list="task-suggestions" 
        placeholder='Dê um nome para o seu projeto'
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        { haveCycles > 0 &&
          cycleOptions.map(( taskName ) => {            
            return (<option key={taskName} value={taskName} />)                   
          })
        }
      </datalist>
      
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput 
        type="number" 
        id="minutesAmount"
        placeholder='00'
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span> minutos. </span>
    </FormContainer>
  )
}