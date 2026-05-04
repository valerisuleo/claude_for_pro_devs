import _ from 'lodash';
import type { FC } from 'react';

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { ITable } from './interfaces';

const TableComponent: FC<ITable> = ({
    tableHeader,
    tableBody,
    onSort,
    classes,
}) => {
    const cls = classes ?? '';
    const bordered = cls.includes('bordered');
    const striped = cls.includes('striped');
    const hover = cls.includes('hover');

    return (
        <Table
            className={cn(bordered && 'rounded-md border border-border')}
        >
            <TableHeader>
                <TableRow className="border-b border-border bg-muted/50 hover:bg-muted/50">
                    {tableHeader.map((item, index) => (
                        <TableHead
                            key={index}
                            className={cn(
                                item.name !== 'actions' &&
                                    'cursor-pointer select-none',
                            )}
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
            <TableBody
                className={cn(
                    striped && '[&_tr:nth-child(even)]:bg-muted/40',
                    '[&_tr]:transition-colors',
                    hover
                        ? '[&_tr:hover]:bg-muted/70'
                        : '[&_tr:hover]:bg-muted/50',
                )}
            >{tableBody}</TableBody>
        </Table>
    );
};

export default TableComponent;
