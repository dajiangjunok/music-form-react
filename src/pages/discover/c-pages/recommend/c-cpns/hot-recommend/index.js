import React, { memo, useEffect } from 'react';

import YJThemeHeaderRCM from '@/components/theme-header-rcm';
import YJThemeCover from '@/components/theme-cover'

import { RecommendWrapper } from './style';
import { getHotRecommendsAction } from '../../store/actionCreators'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

export default memo(function YJHotRecommend () {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    hotRecommends: state.getIn(['recommend', 'hotRecommends'])
  }), shallowEqual)

  useEffect(() => {
    dispatch(getHotRecommendsAction(8))
  }, [dispatch])

  return (
    <RecommendWrapper>
      <YJThemeHeaderRCM title="热门推荐"
        keywords={["华语", "流行", "摇滚", "民谣", "电子"]}
        moreLink="/discover/songs/discover/songs"
      />
      <div className="recommend-list">
        {
          state.hotRecommends.map((item, index) => {
            return (
              <YJThemeCover info={item} key={item.id} />
            )
          })
        }
      </div>
    </RecommendWrapper>
  )
})
