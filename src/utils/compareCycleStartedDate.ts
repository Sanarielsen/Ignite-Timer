import { Cycle } from "../reducers/cycles/reducer";

export function compareCycleStartedDate(first: Cycle, second: Cycle) {

  if ( first.startDate < second.startDate ) {

    return -1
  } else if ( first.startDate > first.startDate ) {

    return 1
  }
  return 0
}