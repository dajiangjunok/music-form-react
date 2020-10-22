import React, { memo, useCallback, useEffect, useState } from 'react';
import { Input, Table } from 'antd';

import { SearchWrapper, SearchHeader, SearchContent } from './style';

import YJSearchBar from './c-cpn/tabble-bar'

export default memo(function YJSearch (props) {
  const { Search } = Input;
  // state props
  const search = props.location.state && props.location.state.search;
  const [searchInput, setsearchInput] = useState('');

  const columns = [
    {
      title: 'MusicName',
      dataIndex: 'MusicName',
      key: 'MusicName'
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

  const data = [
    {
      key: '1',
      MusicName: '有何不可',
      Lrc: 32,
      AlName: 'New York No. 1 Lake Park',
      Duration: '03：42'
    }, {
      key: '2',
      MusicName: 'John Brown',
      Lrc: 32,
      AlName: 'New York No. 1 Lake Park',
      Duration: '03：42'
    }, {
      key: '3',
      MusicName: 'John Brown',
      Lrc: 32,
      AlName: 'New York No. 1 Lake Park',
      Duration: '03：42'
    }, {
      key: '4',
      MusicName: 'John Brown',
      Lrc: 32,
      AlName: 'New York No. 1 Lake Park',
      Duration: '03：42'
    },

  ];

  // other handle
  const onSearch = useCallback(() => {
    console.log(111);
  }, [])

  const onChange = useCallback((e) => {
    setsearchInput(e.currentTarget.value)
  }, [setsearchInput])

  useEffect(() => {
    setsearchInput(search);
  }, [search])

  return (
    <SearchWrapper className="wrap-v2">
      <SearchHeader>
        <Search className="search-input" onSearch={onSearch} onChange={e => onChange(e)} value={searchInput} />
      </SearchHeader>
      <SearchContent>
        <YJSearchBar />
        <Table showHeader={false} columns={columns} dataSource={data} />
      </SearchContent>
    </SearchWrapper>
  )
})
