import { Cycle, CycleState } from "./reducer";

export enum ActionTypes {

  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  REFRESH_CYCLES_LOADED = 'REFRESH_CYCLES_LOADED',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  DELETE_LIST_OF_CYCLES = 'DELETE_LIST_OF_CYCLES',
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

export function refreshCyclesLoadedAction(cyclesRefreshed: CycleState) {

  return { 
    type: ActionTypes.REFRESH_CYCLES_LOADED,
    payload: {
      cyclesRefreshed
    }
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

