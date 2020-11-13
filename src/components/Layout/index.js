/* eslint-disable no-nested-ternary */
/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0867185407
*
* Created: 2020-03-01 17:38:42
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';

import Header from 'src/components/Layout/Header';
import Footer from 'src/components/Layout/Footer';

import classes from './style.less';

const { Content } = Layout;

const propTypes = {
	children: PropTypes.any,
};

const defaultProps = {
	children: null,
};

const MainLayout = (props) => {
	const { children } = props;

	return (
		<Layout className={classes.wrapper}>
			<Layout className={classes.siteLayout}>
				<Header />
				<Content
					style={{
						padding: '50px',
					}}
				>
					{children}
				</Content>
				<Footer />
			</Layout>
		</Layout>
	);
};

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
