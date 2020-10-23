import React, { memo, useState } from 'react';

import { SearchBarWrapper } from './style';

export default memo(function YJSearchBar () {
  const [titleList] = useState([{
    id: 1,
    title: "单曲"
  }, {
    id: 2,
    title: "歌手"
  }, {
    id: 3,
    title: "专辑"
  }, {
    id: 4,
    title: "视频"
  }, {
    id: 5,
    title: "歌词"
  }, {
    id: 6,
    title: "歌单"
  }, {
    id: 7,
    title: "主播电台"
  }, {
    id: 8,
    title: "用户"
  }])

  return (
    <SearchBarWrapper>

    </SearchBarWrapper>
  )
})
