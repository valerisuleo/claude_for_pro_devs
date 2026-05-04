export interface Column {
    name: string;
}

export interface Config {
    sortable: boolean;
    defaultSortOrder?: 'asc' | 'desc';
    mode: 'default' | 'custom';
}

export interface ITable {
    tableHeader: Column[];
    tableBody: React.ReactNode;
    onSort: (column: Column) => void;
    classes?: 'bordered' | 'striped' | 'striped table-hover' | 'hover';
}
