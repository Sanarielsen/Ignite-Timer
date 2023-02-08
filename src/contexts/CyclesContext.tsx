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
  totalSeconds: number,
  amountSecondsPassed: number,
  minutes: String,
  seconds: String,
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

  const [ haveFinishedCycle, setHaveFinishedCycle ] = useState(false);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {

      return differenceInSeconds(
        new Date(), 
        new Date(activeCycle.startDate)
      )
    }    

    return 0
  })

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@Ignite-Timer:cyclesState', stateJSON)
  }, [cyclesState])  

  useEffect(() => {

    if (activeCycle)
      document.title = `Ignite Timer - ${minutes}:${seconds}`
    else if (haveFinishedCycle && minutesAmount === 0 && secondsAmount === 0 )
      document.title = `Ignite Timer - Finished!`
  }, [minutes, seconds])

  useEffect(() => {
    let interval: number;

    if (activeCycle) {

      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(), 
          new Date(activeCycle.startDate)
        )
        
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          setHaveFinishedCycle(true)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }                          
      }, 1000)
    }

    return () => {

      clearInterval(interval)
    }
  }, [activeCycle, 
    totalSeconds, 
    activeCycleId, 
    markCurrentCycleAsFinished, 
    setSecondsPassed
  ]);

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
        totalSeconds,
        amountSecondsPassed,
        minutes,
        seconds,
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