import request from "./axios";

export function getTopBanner () {
  return request({
    url: "/banner"
  })
}

export function getHotRecommend (num) {
  return request({
    url: "/personalized",
    params: {
      limit: num
    }
  })
}

export function getNewAlbum (limit) {
  return request({
    url: "/top/album",
    params: {
      limit
    }
  })
}

export function getTopRankings () {
  return request({
    url: "/toplist"
  })
}

export function getTopRankingMusicList (id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}

