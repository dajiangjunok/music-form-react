import * as actionType from './constants';
import { getSongDetail, getSongInfo, getSongLyric } from '../../../services/player';
import { message } from 'antd';

const getSongInfoAction = (res) => ({
  type: actionType.CHANGE_SONG_INFO,
  songInfo: res.data
});

// 改变歌单列表
export const changeSongListAction = (List) => ({
  type: actionType.CHANGE_SONG_LIST,
  songList: List
});


// 改变歌曲播放列表索引
const changeSongIndexAction = (index) => ({
  type: actionType.CHANGE_SONG_INDEX,
  songIndex: index
});

// 改变当前歌曲
const changeCurrentSongAction = (song) => ({
  type: actionType.CHANGE_CURRENT_SONG,
  currentSong: song
});
// 歌曲歌词
const changeSongLyricAction = (lrc) => {
  return {
    type: actionType.CHANGE_SONG_LYRIC,
    lyric: lrc.lyric
  }
}

// 1.获取歌曲详情列表
export const changeSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    const songList = getState().getIn(["player", "songList"]);
    const songIndex = songList.findIndex(song => song.id === ids);
    if (songIndex !== -1) { //含有这首歌
      const currentSong = songList[songIndex];
      dispatch(changeSongIndexAction(songIndex));
      dispatch(changeCurrentSongAction(currentSong))
      getSongLyric(ids).then(res => {
        dispatch(changeSongLyricAction(res.lrc))
      })

    } else {
      getSongDetail(ids).then(res => {
        const song = res.songs && res.songs[0];
        const newSongList = [...songList, song]

        dispatch(changeSongListAction(newSongList));
        dispatch(changeSongIndexAction(newSongList.length - 1));
        dispatch(changeCurrentSongAction(song));
      })
      getSongLyric(ids).then(res => {
        dispatch(changeSongLyricAction(res.lrc))
      })

    }
  }
}

// 2.获取歌曲的详细信息
export const changeSongInfoAction = (id) => {
  return dispatch => {
    getSongInfo(id).then(res => {
      dispatch(getSongInfoAction(res))
    })
  }
}

// 3.添加歌曲到播放列表【不改变currentSong , songIndex】
export const addSongListAction = (ids) => {
  return (dispatch, getState) => {
    const songList = getState().getIn(["player", "songList"]);
    const songIndex = songList.findIndex(song => song.id === ids);

    if (songIndex === -1) { //不含有这首歌
      getSongDetail(ids).then(res => {
        const song = res.songs && res.songs[0];
        const newSongList = [...songList, song]
        dispatch(changeSongListAction(newSongList));
      })
    } else {
      message.info(actionType.SAME_SONG);
    }
  }
}

// 4.修改打开播放歌词弹窗
export const showPanleAction = (flag) => ({
  type: actionType.SHOW_PANEL,
  showPanel: flag
})