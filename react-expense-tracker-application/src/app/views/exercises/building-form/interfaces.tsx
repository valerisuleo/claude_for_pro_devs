export interface IExpense {
    description?: string;
    amount?: string;
    category?: string;
    actions?: (currentRow: IExpense) => React.ReactNode;
    // Add other fields as necessary
}

export interface IButtonAction {
    classes: string;
    label: string;
    name: string;
}
