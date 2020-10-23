import React, { memo, useCallback, useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { changeSearchSongsAction } from '../search/store/actioncreators';

import { SearchWrapper, SearchHeader, SearchContent } from './style';
import YJSearchBar from './c-cpn/tabble-bar';

export default memo(function YJSearch (props) {
  const { Search } = Input;
  // state props
  const search = props.location.state && props.location.state.search;
  const [searchInput, setsearchInput] = useState('');
  const [offset, setoffset] = useState(1);
  const [limit] = useState(10);
  const [data, setdata] = useState([]);
  const [totals, settotals] = useState(0);

  const columns = [
    {
      title: 'MusicName',
      dataIndex: 'MusicName',
      key: 'MusicName',
      render: () => <i className="iconfont icon-bofang"></i>,
      width: 0
    },
    {
      title: 'Lrc',
      dataIndex: 'Lrc',
      key: 'Lrc',
    },
    {
      title: 'AlName',
      dataIndex: 'AlName',
      key: 'AlName',
    },
    {
      title: 'Duration',
      key: 'Duration',
      dataIndex: 'Duration'
    }
  ];


  // redux hooks
  const dispatch = useDispatch()
  const { searchInfo } = useSelector(state => ({
    searchInfo: state.getIn(["search", "searchInfo"])
  }))

  // other handle
  const onSearch = useCallback(() => {
    dispatch(changeSearchSongsAction(searchInput, limit, offset))
  }, [dispatch, searchInput, limit, offset])

  const onChange = useCallback((e) => {
    setsearchInput(e.currentTarget.value)
  }, [setsearchInput])

  useEffect(() => {
    setsearchInput(search);
  }, [search])

  useEffect(() => {
    const searchInfoCopy = searchInfo.songs && [...searchInfo.songs]
    console.log(searchInfoCopy);
    const data = []
    searchInfoCopy && searchInfoCopy.forEach((item, index) => {
      const info = {
        key: index,
        MusicName: item.name,
        Lrc: item.artists[0].name,
        AlName: item.album.name,
        Duration: item.duration
      }
      data.push(info)
    })
    setdata(data)
    settotals(searchInfo.songCount)
  }, [searchInfo])


  // 其他操作
  const changePage = (current) => {
    dispatch(changeSearchSongsAction(searchInput, limit, current))
    setoffset(current)
  }

  return (
    <SearchWrapper className="wrap-v2">
      <SearchHeader>
        <Search className="search-input" onSearch={onSearch} onChange={e => onChange(e)} value={searchInput} />
      </SearchHeader>
      <SearchContent>
        <YJSearchBar />
        <Table showHeader={false} columns={columns} dataSource={data} pagination={{
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: () => `共${totals}条`,
          pageSize: limit,
          current: offset,
          total: totals,
          // onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
          onChange: (current) => changePage(current),
        }} />
      </SearchContent>
    </SearchWrapper>
  )
})
