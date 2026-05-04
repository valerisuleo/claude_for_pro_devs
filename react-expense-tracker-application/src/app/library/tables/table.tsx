import _ from 'lodash';
import { ITable } from './interfaces';

const TableComponent: React.FC<ITable> = ({ tableHeader, tableBody, onSort, classes }) => {
    return (
        <table className={`table ${classes && `table-${classes}`}`}>
            <thead>
                <tr>
                    {tableHeader.map((item, index) => (
                        <th key={index} onClick={() => item.name !== 'actions' && onSort(item)}>
                            {item.name === 'actions' ? '' : _.startCase(item.name)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{tableBody}</tbody>
        </table>
    );
};

export default TableComponent;
