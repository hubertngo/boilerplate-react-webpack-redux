/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0867185407
*
* Created: 2020-03-01 17:15:11
*------------------------------------------------------- */

import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Layout, Avatar, Popover, Menu } from 'antd';
import {
	MailOutlined,
	AppstoreOutlined,
	PhoneOutlined,
} from '@ant-design/icons';
import Logo from 'src/assets/images/logo.svg';
import classes from './style.less';

const Header = (props) => {
	const Router = useHistory();
	const location = useLocation();
	const [current, setKey] = useState(location.pathname);
	const content = (
		<div className={classes.content}>
			<div className={classes.itemWrapper}>
				<div className={classes.item}>
					<MailOutlined />
					<span className="ml-2">ninh.uit@gmail.com</span>
				</div>
				<div className={classes.item}>
					<PhoneOutlined />
					<span className="ml-2">0867 185 407</span>
				</div>
			</div>
		</div>
	);

	const handleClick = (e) => {
		switch (e.key) {
			case '/about':
				Router.push('/about');
				break;
			default:
				Router.push('/');
		}
		setKey(e.key);
	};

	return (
		<div className={classes.headerWrapper}>
			<Layout.Header className={classes.header}>
				<Link to="/">
					<div className={classes.logoCenter}>
						<img src={Logo} alt="logo" height="25" />
						<span>Boilerplate</span>
					</div>
				</Link>
				<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
					<Menu.Item key="/" icon={<MailOutlined />}>
						Home
					</Menu.Item>
					<Menu.Item key="/about" icon={<AppstoreOutlined />}>
						About
					</Menu.Item>
				</Menu>
				<div className={classes.headerRight}>
					<Popover
						content={content}
						title="Hubert Ngo"
						trigger="click"
						placement="bottomRight"
					>
						<Avatar
							style={{ marginLeft: '80px' }}
							src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						/>
					</Popover>
				</div>
			</Layout.Header>
		</div>
	);
};

export default Header;
