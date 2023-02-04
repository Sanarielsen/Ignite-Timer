import { produce } from 'immer'

import { ActionTypes } from "./actions";

export interface Cycle {

  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export interface CycleState {

  cycles: Cycle[],
  activeCycleId: string | null,
}

export function cyclesReducer(state: CycleState, action: any) {

  switch( action.type ) {    

    case ActionTypes.INITIALIZE_LIST_OF_CYCLES: {

      const stateNull = {} as CycleState

      return produce(state, draft => {

        draft.cycles.splice(0,draft.cycles.length)
        draft.activeCycleId = null
      })
    }
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex( cycle => {
        return cycle.id === state.activeCycleId
      } )
      if (currentCycleIndex < 0) {

        return state;
      }
      return produce(state, (draft) => {

        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex( cycle => {
        return cycle.id === state.activeCycleId
      } )
      if (currentCycleIndex < 0) {

        return state;
      }
      return produce(state, (draft) => {

        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      })
    }
    case ActionTypes.DELETE_LIST_OF_CYCLES: {

      return produce(state, (draft) => {

        draft.cycles = [];
      })
    }
    default:
      return state
  }
}