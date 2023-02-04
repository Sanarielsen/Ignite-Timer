import { Cycle } from "./reducer";

export enum ActionTypes {

  INITIALIZE_LIST_OF_CYCLES = 'INITIALIZE_LIST_OF_CYCLES',
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  DELETE_LIST_OF_CYCLES = 'DELETE_LIST_OF_CYCLES',
}

export function initializeListOfCycleAction() {

  const current = {
    cycles: [],
    activeCycleId: null,
  }   

  return {    
    type: ActionTypes.INITIALIZE_LIST_OF_CYCLES,
    payload: {
      current
    }
  }
}

export function addNewCycleAction(newCycle: Cycle) {

  return { 
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle
    }
  }
}

export function markCurrentCycleAsFinishedAction() {

  return { 
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function interruptCurrentCycleAction() {

  return { 
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function deleteListOfCyclesAction() {

  return {
    type: ActionTypes.DELETE_LIST_OF_CYCLES
  }
}

