import {
  CHANGE_PERIOD,
  CHANGE_PROGRAM,
  CHANGE_STATUS
} from '../constants/action-types'

export const changePeriod = year => {
  return {
    type: CHANGE_PERIOD,
    payload: year
  }
}

export const changeProgram = program => {
  return {
    type: CHANGE_PROGRAM,
    payload: program
  }
}

export const changeStatus = status => {
  return {
    type: CHANGE_STATUS,
    payload: status
  }
}
