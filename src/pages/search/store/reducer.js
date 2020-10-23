import * as actionType from './contants';
import { Map } from 'immutable';

const initialSearchState = Map({
  searchInfo: {}
})

export default (state = initialSearchState, action) => {
  switch (action.type) {
    case actionType.CHANGE_SEARCH_INFO:
      return state.set('searchInfo', action.searchInfo);
    default:
      return state;
  }
}

