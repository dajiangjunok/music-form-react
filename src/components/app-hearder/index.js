import React, { memo } from 'react';

import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

import { NavLink } from 'react-router-dom';
import { headerLinks } from '@/common/local-data';
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight
} from './style';

export default memo(function YJAppHeader () {
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
          <Input className="search-input" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
          <Button className="search-button" >创作者中心</Button>
          <a href="#/" className="search-login">登录</a>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
})
