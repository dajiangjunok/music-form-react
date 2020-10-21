import { Map } from 'immutable';
import * as actionType from './constants';


const initailState = Map({
  songInfo: [],
  songList: [],
  songIndex: 0,
  currentSong: {},
  lyric: "",
  showPanel: false
})

export default (state = initailState, action) => {
  switch (action.type) {
    case actionType.CHANGE_SONG_INFO:
      return state.set("songInfo", action.songInfo);
    case actionType.CHANGE_SONG_LIST:
      return state.set("songList", action.songList);
    case actionType.CHANGE_SONG_INDEX:
      return state.set("songIndex", action.songIndex);
    case actionType.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.currentSong);
    case actionType.CHANGE_SONG_LYRIC:
      return state.set("lyric", action.lyric);
    case actionType.SHOW_PANEL:
      return state.set("showPanel", action.showPanel);
    default:
      return state;
  }
}