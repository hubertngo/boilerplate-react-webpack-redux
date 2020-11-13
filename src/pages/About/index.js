/* eslint-disable jsx-a11y/alt-text */
/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-06-17 00:29:25
*------------------------------------------------------- */
import React, { useState } from 'react';
import { useAsyncRetry } from 'react-use';
import { useDispatch } from 'react-redux';
import { getListAsync as getListPokemon } from 'src/redux/actions/pokemon';

import { Table } from 'antd';
import styles from './styles.less';

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

const AboutPage = () => {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState({
		offset: 0,
		limit: 10,
	});
	const { value: pokemonList, loading, retry } = useAsyncRetry(async () => {
		const response = await dispatch(await getListPokemon({ filter }));
		return response;
	});

	const handleTableChange = (pagination, filters, sorter) => {
		const newFilter = {
			...filter,
			offset: (pagination.current - 1) * filter.limit,
			limit: pagination.pageSize,
		};
		setFilter(newFilter);
		retry();
	};

	return (
		<div className={styles.root}>
			<h1>With react use</h1>
			<h2>Pokemon List Example load data from API</h2>
			<Table
				columns={columns}
				size="small"
				bordered
				loading={loading}
				dataSource={pokemonList?.results}
				rowKey={(record, i) => record.name + '_row' + i}
				onChange={handleTableChange}
				pagination={{
					...paginationConfig,
					total: pokemonList?.count,
					pageSize: filter.limit,
					current: (filter.offset / filter.limit) + 1,
				}}
			/>
		</div>
	);
};

export default AboutPage;
