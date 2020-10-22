import * as actionType from './contants';
import { Map } from 'immutable';

const initialSearchState = Map({
  searchList: []
})

export default (state = initialSearchState, action) => {
  switch (action.type) {
    case actionType.CHANGE_SEARCH_LIST:
      return state.set('searchList', action.searchList);
    default:
      return state;
  }
}

