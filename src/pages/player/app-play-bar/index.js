import React, { memo, useRef, useEffect, useState, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { formatMinuteSecond } from '@/utils/format-utils';
import { changeSongInfoAction, showPanleAction } from '../store/actionCreators'

import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';
import { NavLink } from 'react-router-dom';
import { Slider } from 'antd';
import YJPopup from '../c-cpns/popup';


export default memo(function YJPlayer () {
  // props and state

  //  redux hooks
  const dispatch = useDispatch();
  const { currentSong, songInfo, songList, showPanel } = useSelector(state => {
    return {
      currentSong: state.getIn(["player", "currentSong"]),
      songInfo: state.getIn(["player", "songInfo"]),
      songList: state.getIn(["player", "songList"]),
      showPanel: state.getIn(["player", "showPanel"])
    }
  }, shallowEqual);
  // 渲染数据
  const duration = (currentSong && currentSong.dt) || 0;
  const picUrl = (currentSong && currentSong.al && currentSong.al.picUrl) || '';
  const musicName = (currentSong && currentSong.name) || '未知音乐';
  const musician = (currentSong && currentSong.ar && currentSong.ar[0].name) || '未知歌手';
  const songListNum = songList.length;

  // 其他Hooks
  const audioRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const arr = Object.keys(currentSong);
    if (arr.length !== 0) {
      dispatch(changeSongInfoAction(currentSong.id));
    }
  }, [dispatch, currentSong])

  useEffect(() => {
    const arr = Object.keys(currentSong);
    if (arr.length !== 0) {
      setTimeout(() => {
        audioRef.current.play();
        setIsPlaying(true);
      }, 500)
    }
  }, [currentSong])

  // 其他业务
  const showPopup = () => {
    const flag = !showPanel
    dispatch(showPanleAction(flag))
  }
  const play = useCallback(() => {
    audioRef.current.play();
    setIsPlaying(true);
  }, [audioRef])

  const pause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, [audioRef])

  const playMusic = useCallback(() => {
    if (!isPlaying) {
      play();
      setIsPlaying(true);
    } else {
      pause();
      setIsPlaying(false);
    }
  }, [isPlaying, play, pause]);


  const timeUpdate = (e) => {
    const currentTimeNow = parseInt(e.target.currentTime * 1000) / 1000;

    if (!isChanging) {
      setCurrentTime(currentTimeNow);
      setProgress((currentTimeNow * 1000) / duration * 100);
    }
  }

  const sliderChange = useCallback((progress) => {
    setIsChanging(true);
    setProgress(progress);
    setCurrentTime((progress / 100) * (duration / 1000));
  }, [duration])


  const sliderAfterChange = useCallback(() => {
    setIsChanging(false);
    const currentTime = (progress / 100) * (duration / 1000);
    audioRef.current.currentTime = currentTime;
    audioRef.current.play();
    setIsPlaying(true);
  }, [duration, progress]);

  return (
    <PlaybarWrapper className="sprite_playbar" >
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar btn prev"></button>
          <button className="sprite_playbar btn play" onClick={e => playMusic()} ></button>
          <button className="sprite_playbar btn next"></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={picUrl + "?param=34y34"} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{musicName}</span>
              <span className="singer-name">{musician}</span>
            </div>
            <div className="progress">
              <Slider tipFormatter={null} value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{formatMinuteSecond(currentTime * 1000)}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatMinuteSecond(duration)}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator  >
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button className="sprite_playbar btn playlist" onClick={showPopup}>
              {songListNum}
            </button>
          </div>
        </Operator>
      </div>
      <audio src={songInfo && songInfo[0] && songInfo[0].url}
        ref={audioRef} onTimeUpdate={timeUpdate} />
      {showPanel && <YJPopup showPopup={showPopup} currentTime={currentTime} />}
    </PlaybarWrapper>
  )
})
