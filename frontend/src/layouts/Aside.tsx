import styled from 'styled-components';
import React from 'react';
import GroupMenu from '@/layouts/GroupMenu';
import { Typography } from '@mui/material';

const AsideStyle = styled.div`
  width: 250px;
  height: 100vh;
  overflow-x: hidden;
  background: #ffffff;
  border-right: 1px solid #dbe2e5;
  color: black;
  top: 0;
  left: 0;
  z-index: 100;
  position: fixed;

  .logo {
    padding: 30px 30px 10px 30px;
  }

  .app-menu {
    overflow-y: auto;
    height: calc(100vh - 160px);
    @media screen and (max-width: 850px) {
      //height: calc(100vh - 200px);
      margin-top: 60px;
    }
  }
`;

const menuList = [
  {
    name: 'Shop',
    url: '/',
    icon: '/icons/shop.svg',
    newTab: false,
  },
];

const Aside = () => {
  return (
    <>
      <AsideStyle>
        <div className="logo">
          <Typography variant="h6">TxVendor</Typography>
        </div>
        <div className="app-menu">
          <GroupMenu groups={menuList} />
        </div>
      </AsideStyle>
    </>
  );
};

export default Aside;
