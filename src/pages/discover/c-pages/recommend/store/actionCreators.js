import * as actionType from './constants';
import {
  getTopBanner,
  getHotRecommend,
  getNewAlbum,
  getTopRankings,
  getTopRankingMusicList
} from "@/services/recommend"

const changeTopBannerAction = res => ({
  type: actionType.CAHNGE_TOP_BANNERS,
  topBanners: res.banners
})

const changeHotRecommend = res => ({
  type: actionType.CHANGE_HOT_RECOMMENDS,
  hotRecommends: res.result
})

const changeNewAlbums = res => ({
  type: actionType.CHANGE_NEW_ALBUMS,
  newAlbums: res.monthData
})

const changeTopRankings = res => ({
  type: actionType.CHANGE_RANKINGS,
  topRankings: res.list.slice(0, 3)
})
// 三个排行榜的具体数据
const changeSrankings = res => ({
  type: actionType.CHANGE_S_RANKINGS,
  sRankings: res.playlist
})
const changeNrankings = res => ({
  type: actionType.CHANGE_N_RANKINGS,
  nRankings: res.playlist
})
const changeOrankings = res => ({
  type: actionType.CHANGE_O_RANKINGS,
  oRankings: res.playlist
})

// 1.轮播图 数据action
export const getTopBannersAction = () => {
  return dispatch => {
    getTopBanner().then(res => {
      dispatch(changeTopBannerAction(res));
    })
  }
}

// 2.热门推荐 数据action
export const getHotRecommendsAction = (limit) => {
  return dispatch => {
    getHotRecommend(limit).then(res => {
      dispatch(changeHotRecommend(res));
    })
  }
}

// 3.新碟上架 数据action
export const getNewAlbumsAction = (limit) => {
  return dispatch => {
    getNewAlbum(limit).then(res => {
      dispatch(changeNewAlbums(res))
    })
  }
}

// 4.榜单 数据action
export const getTopRankingsAction = () => {
  return dispatch => {
    getTopRankings().then(res => {
      dispatch(changeTopRankings(res))

    })
  }
}

// 5.榜单TOP具体音乐 数据action
export const getTopRankingsTopMusicAction = (id) => {
  return dispatch => {
    getTopRankingMusicList(id).then(res => {
      dispatch(changeSrankings(res))
    })
  }
}
// 5.榜单NEW具体音乐 数据action
export const getTopRankingsNewMusicAction = (id) => {
  return dispatch => {
    getTopRankingMusicList(id).then(res => {
      dispatch(changeNrankings(res))
    })
  }
}
// 5.榜单ORIGIN具体音乐 数据action
export const getTopRankingsOriginMusicAction = (id) => {
  return dispatch => {
    getTopRankingMusicList(id).then(res => {
      dispatch(changeOrankings(res))
    })
  }
}