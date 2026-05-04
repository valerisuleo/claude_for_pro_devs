import { useState } from 'react';

import { TableCell, TableRow } from '@/components/ui/table';

import _ from 'lodash';

import { Column, Config } from '../interfaces';

function useTable<T>(data: T[], columns: Column[], config: Config) {
    const [dataSource, setDataSource] = useState<T[]>(data);
    const [order, setOrder] = useState(config.defaultSortOrder);

    function renderRow() {
        const preparedRows = dataSource.map((row) => {
            return columns.map((column) => {
                return row[column.name];
            });
        });

        if (config.mode === 'default') {
            return preparedRows.map((row, rowIndex) => {
                return (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <TableCell key={`${rowIndex}-${cellIndex}`}>
                                {typeof cell === 'function'
                                    ? cell(dataSource[rowIndex])
                                    : _.startCase(cell)}
                            </TableCell>
                        ))}
                    </TableRow>
                );
            });
        } else {
            return preparedRows;
        }
    }

    const handleSort = (current) => {
        if (config.sortable) {
            const { name } = current;
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            setOrder(newOrder);

            const sortedList = _.orderBy(
                dataSource,
                [
                    (item) => {
                        const value = item[name];
                        return typeof value === 'string' ? value.toLowerCase() : value;
                    },
                ],
                [newOrder]
            );

            setDataSource(sortedList);
        }
    };

    const updateTable = (newData: T[]) => {
        setDataSource(newData);
    };

    return { columns, tableBody: renderRow, updateTable, handleSort };
}

export default useTable;
