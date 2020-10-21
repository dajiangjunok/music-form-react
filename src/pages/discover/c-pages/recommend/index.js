import React, { memo } from 'react';

import { RecommendWrapper, Content, RecommendLeft, RecommendRight } from './style';
import TopBanners from './c-cpns/top-banners'
import YJHotRecommend from './c-cpns/hot-recommend'
import YJNewAlbum from './c-cpns/new-album'
import YJRanking from './c-cpns/ranking-recommend'

function YJRecommend (props) {

  return (
    <RecommendWrapper>
      <TopBanners />
      <Content className="wrap-v2">
        <RecommendLeft>
          <YJHotRecommend />
          <YJNewAlbum />
          <YJRanking />
        </RecommendLeft>
        <RecommendRight>

        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(YJRecommend)






// function Recommend (props) {
//   const { getBanners } = props

//   useEffect(() => {
//     getBanners();
//   }, [getBanners])

//   return (
//     <div>
//       Recommend
//     </div>
//   )
// }

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners
// })

// const mapDispatchToProps = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannersAction())
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend))
