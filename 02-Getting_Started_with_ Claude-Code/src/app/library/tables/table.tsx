import _ from 'lodash';
import type { FC } from 'react';

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { ITable } from './interfaces';

const TableComponent: FC<ITable> = ({
    tableHeader,
    tableBody,
    onSort,
    className,
}) => {
    return (
        <Table className={className}>
            <TableHeader>
                <TableRow>
                    {tableHeader.map((item, index) => (
                        <TableHead
                            key={index}
                            onClick={() =>
                                item.name !== 'actions' && onSort(item)
                            }
                        >
                            {item.name === 'actions'
                                ? ''
                                : _.startCase(item.name)}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>{tableBody}</TableBody>
        </Table>
    );
};

export default TableComponent;
