import React, { memo, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";

import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { changeSearchSongsAction } from '../../pages/search/store/actioncreators';

import { NavLink } from 'react-router-dom';
import { headerLinks } from '@/common/local-data';
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight
} from './style';
import { useDispatch } from 'react-redux';

export default memo(function YJAppHeader () {
  const [searchText, setSearchText] = useState('')
  const [flag, setflag] = useState(false)

  const searchChange = (e) => {
    const value = e.currentTarget.value;
    setSearchText(value)
  }
  const dispatch = useDispatch();
  const searchSubmit = () => {
    dispatch(changeSearchSongsAction(searchText, 10, 1))
    setflag(true)
  }

  // HOOKS
  useEffect(() => {
    return () => {
      setflag(false)
    }
  }, [flag])

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft >
          <NavLink to="/">
            <span href="#/" className="logo sprite_01"> </span>
          </NavLink>
          <div className="nav-bar">
            {
              headerLinks.map((item, index) => {
                if (index < 3) {
                  return <NavLink activeClassName="nav-active" to={item.link} className="nav-item-container" key={item.title}>
                    {item.title}
                    <i className="select-icon"></i>
                  </NavLink>
                } else {
                  return <a href={item.link} target="_blank"
                    rel="noopener noreferrer" className="nav-item-container" key={item.title}>{item.title}
                    {
                      index === 5 && <i className="hot-icon"></i>
                    }
                    <i className="select-icon"></i>
                  </a>
                }
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight >
          <Input className="search-input" value={searchText} placeholder="音乐/视频/电台/用户" onPressEnter={searchSubmit} prefix={<SearchOutlined />}
            onChange={e => searchChange(e)} />
          <Button className="search-button" >创作者中心</Button>
          <a href="#/" className="search-login">登录</a>
        </HeaderRight>
      </div>
      <div className="divider"></div>
      {
        flag && <Redirect to={{ pathname: "/search", state: { search: searchText } }} />
      }
    </HeaderWrapper>
  )
})
