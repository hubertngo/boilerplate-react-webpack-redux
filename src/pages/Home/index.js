/* eslint-disable jsx-a11y/alt-text */
/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-06-17 00:29:25
*------------------------------------------------------- */
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getList as getListPokemon } from 'src/redux/actions/pokemon';

import { Table } from 'antd';
import styles from './styles.less';

function mapStateToProps(state) {
	return {
		store: {
			pokemonList: state.get('pokemon').toJS().list,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getListPokemon,
		}, dispatch),
	};
};

const columns = [
	{
		title: 'name',
		key: 'name',
		dataIndex: 'name',
	},
	{
		title: 'url',
		key: 'url',
		dataIndex: 'url',
	},
];

const paginationConfig = {
	total: 0,
	showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
	defaultCurrent: 1,
};

const HomePage = ({ store: { pokemonList }, action }) => {
	const [filter, setFilter] = useState({
		offset: 0,
		limit: 10,
	});
	const handleGetPokemon = (filter = {}) => {
		action.getListPokemon(({ filter }), () => {
			// setPage(page + 1);
		});
	};

	useEffect(() => {
		handleGetPokemon();
	}, []);

	const handleTableChange = (pagination, filters, sorter) => {
		const newFilter = {
			...filter,
			offset: (pagination.current - 1) * filter.limit,
			limit: pagination.pageSize,
		};
		setFilter(newFilter);
		handleGetPokemon(newFilter);
	};

	return (
		<div className={styles.root}>
			<h1>Home</h1>
			<h2>Pokemon List Example load data from redux</h2>
			<Table
				columns={columns}
				size="small"
				bordered
				loading={pokemonList.loading}
				dataSource={pokemonList.data}
				rowKey={(record, i) => record.name + '_row' + i}
				onChange={handleTableChange}
				pagination={{
					...paginationConfig,
					total: pokemonList?.total,
					pageSize: filter.limit,
					current: (filter.offset / filter.limit) + 1,
				}}
			/>
		</div>
	);
};

HomePage.propTypes = {
	store: PropTypes.shape({
		pokemonList: PropTypes.object.isRequired,
	}).isRequired,
	action: PropTypes.shape({
		getListPokemon: PropTypes.func.isRequired,
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
