import { Cycle, CycleState } from "../reducers/cycles/reducer"
import { compareCycleStartedDate } from "./compareCycleStartedDate"

export function concatCyclesJSON(jsonInitial: string, jsonAdicional: string) {

  const jsonInitialConverted = JSON.parse(jsonInitial)  
  const jsonAdicionalConverted = JSON.parse(jsonAdicional)  
  
  const cycles = jsonInitialConverted.cycles.concat(jsonAdicionalConverted.cycles)  

  let uniqueCycles = []
  let uniqueIdentifiers = "";
  for ( let i=0; i < cycles.length; i++ ) {     
    if (!(uniqueIdentifiers.includes(cycles[i].id))) {      
      uniqueIdentifiers += cycles[i].id + " ";
      uniqueCycles.push(cycles[i])
    }
  }  

  const cycleState: CycleState = {

    cycles: uniqueCycles,
    activeCycleId: null
  }
  cycleState.cycles.sort( compareCycleStartedDate )

  return JSON.stringify(cycleState).trim()  
 }