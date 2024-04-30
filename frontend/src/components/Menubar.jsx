import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd';
import { HomeOutlined, DiffOutlined } from '@ant-design/icons';

const Menubar = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key);
    };
    
    // Menu List
    const items = [
        {
          label: 'Home',
          key: '/',
          icon: <HomeOutlined />,
        },
        {
          label: 'Transaction',
          key: 'SubMenu',
          icon: <DiffOutlined />,
          children: [
            {
              type: 'Report',
              label: 'Report',
              children: [
                {
                  label: 'Daily Transaction',
                  key: 'dailyTnx',
                },
                {
                  label: 'Lot Wise Stock',
                  key: 'lotstock',
                },
                {
                  label: 'Model Wise Stock',
                  key: 'modelstock',
                },
              ],
            },
            {
              type: 'Issue',
              label: 'Issue',
              children: [
                {
                  label: 'RAW Material',
                  key: 'rmissue',
                },
                {
                  label: 'Buffer',
                  key: 'bufferissue',
                },
              ],
            },
            {
              type: 'Receive',
              label: 'Receive',
              children: [
                {
                  label: 'RAW Material',
                  key: 'rmtreceive',
                },
                {
                  label: 'Buffer',
                  key: 'bufferreceive',
                },
              ],
            },
          ],
        },
        {
          label: (
            <a href="#" target="_blank" rel="noopener noreferrer">
              Navigation Four - Link
            </a>
          ),
          key: 'alipay',
        },
      ];
  return (
      <>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </>
  )
}

export default Menubar