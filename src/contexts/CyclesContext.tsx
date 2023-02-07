import { ReactNode, createContext, useEffect, useReducer, useState } from 'react'
import { Cycle, CycleState, cyclesReducer } from '../reducers/cycles/reducer';
import { addNewCycleAction, deleteListOfCyclesAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

interface CreateCycleData {

  task: string;
  minutesAmount: number;
}

interface CyclesContextType {

  cycles: Cycle[],
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  amountSecondsPassed: number,
  markCurrentCycleAsFinished: () => void,
  setSecondsPassed: (seconds: number) => void,
  createNewCycle: (data: CreateCycleData) => void,
  interruptCurrentCycle: () => void,
  deleteListOfCycles: () => void,
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {

  children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, { 
    cycles: [], activeCycleId: null 
  }, () => {
    if (!Boolean(localStorage.getItem('@Ignite-Timer:cyclesState'))) {           
      const current = {
        cycles: [],
        activeCycleId: null
      } as CycleState 

      const stateJSON = JSON.stringify(current)
      localStorage.setItem('@Ignite-Timer:cyclesState', stateJSON)      
    }

    const storedStateAsJSON = localStorage.getItem('@Ignite-Timer:cyclesState')
    
    if (storedStateAsJSON) {
      
      return JSON.parse(storedStateAsJSON)
    }
  })

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {

      return differenceInSeconds(
        new Date(), 
        new Date(activeCycle.startDate)
      )
    }    

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@Ignite-Timer:cyclesState', stateJSON)
  }, [cyclesState])  

  function markCurrentCycleAsFinished() {

    dispatch(markCurrentCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
  
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {

    const newCycle: Cycle = {

      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {

    dispatch(interruptCurrentCycleAction());  
  }

  function deleteListOfCycles() {

    dispatch(deleteListOfCyclesAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,        
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        deleteListOfCycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}