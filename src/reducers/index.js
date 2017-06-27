import { combineReducers } from 'redux';
import {
  CHANGE_NAME_FILTER,
  CHANGE_COMPETITION,
  REQUEST_PLAYERS,
  RECEIVE_PLAYERS,
  SET_ERROR,
  RESET_ERROR
} from '../actions';

export const error = (state = null, action) => {
  switch(action.type) {
    case SET_ERROR:
      return action.error;
    case RESET_ERROR:
      return null;
    default:
      return state;
  }
};

export const competitionId = (state = '', action) => {
  switch(action.type) {
    case CHANGE_COMPETITION:
      return action.competitionId;
    default:
      return state;
  }
};

export const nameFilter = (state = '', action) => {
  switch(action.type) {
    case CHANGE_COMPETITION:
      return '';
    case CHANGE_NAME_FILTER:
      return action.nameFilter;
    default:
      return state;
  }
};

const players = (state = {isFetching: false, players: []}, action) => {
  switch(action.type) {
    case REQUEST_PLAYERS:
      return {...state, isFetching: true};
    case RECEIVE_PLAYERS:
      return {...state, isFetching: false, players: action.players};
    default:
      return state;
  }
};

export const playersByCompetition = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_PLAYERS:
    case REQUEST_PLAYERS:
      return {...state,
              [action.competitionId]: players(state[action.competitionId], action)};
    default:
      return state;
  }
};

const rootReducer = combineReducers({error,
                                     competitionId,
                                     nameFilter,
                                     playersByCompetition});

export default rootReducer;
