/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
// 2. Custom hooks and utilities
import useReactiveForm from 'src/app/library/forms/hooks/useReactiveForm';
import { formMaker } from 'src/app/library/forms/hooks/utils';
import useTable from 'src/app/library/tables/hooks/useTable';
// 3. Component imports
import AlertsComponent from 'src/app/library/components/alerts/alerts';
import SelectComponent from 'src/app/library/forms/select/select';
import TableComponent from 'src/app/library/tables/table';
// 4. Interface imports
import { IButtonAction, IExpense } from './interfaces';
// 5. Configuration or mock data imports
import { actions, formControllers, mock, tableHeader } from './config';

const ExpenseTracker = () => {
    const defaultList = mock.map((item) => ({
        ...item,
        actions: (currentRow) => renderActions(currentRow),
    }));
    const [expenses, setExpenses] = useState<IExpense[]>(defaultList);
    const [controllers, setControllers] = useState(formControllers);
    const [category, setCategory] = useState<string>('');
    const [form, setForm] = useState(formMaker(formControllers));
    const {
        formGroup,
        errorMessages,
        resetForm,
        handleChange,
        handleSubmit,
        handleBlur,
        renderInput,
        renderSelect,
    } = useReactiveForm(form, formControllers, doSubmit, {
        resetOnSchemaChange: false,
    });

    const { tableBody, updateTable, handleSort } = useTable(expenses, tableHeader, {
        sortable: true,
        defaultSortOrder: 'asc',
        mode: 'default',
    });

    function doSubmit(): void {
        console.log('POST REQ', formGroup);
        createExpense();
        resetForm();
    }

    function createExpense(): void {
        setExpenses((currentExpenses) => {
            const newExpense: IExpense = {
                ...formGroup,
                actions: (currentRow) => renderActions(currentRow),
            };

            const updatedExpenses = [newExpense, ...currentExpenses];
            updateTable(updatedExpenses);

            return updatedExpenses;
        });
    }

    function deleteExpense(currentRow: IExpense): void {
        setExpenses((currentExpenses) => {
            const updatedExpenses = currentExpenses.filter(
                (item) => item.description !== currentRow.description
            );

            updateTable(updatedExpenses);
            return updatedExpenses;
        });
    }

    function renderActions(row: IExpense): React.ReactNode {
        return (
            <div className="d-flex justify-content-evenly">
                {actions.map((btn: IButtonAction, i) => (
                    <button
                        key={i}
                        className={`me-2 btn btn-sm btn-outline-${btn.classes}`}
                        onClick={() => handleActions(row, btn)}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        );
    }

    function getOptions(): { value: string; label: string }[] {
        return [
            { value: 'all', label: 'All categories' },
            ...formControllers
                .find((item) => item.name === 'category')
                .options.filter((el) => !!el.value),
        ];
    }

    const handleActions = (currentRow: IExpense, currentBtn: IButtonAction): void => {
        if (currentBtn.name === 'delete') {
            deleteExpense(currentRow);
        } else {
            console.log('edit');
        }
    };

    const handleBlurFilter = (): void => {};
    const handleInputChange = (e): void => {
        const { value } = e.target;
        const result =
            value && value !== 'all'
                ? expenses.filter((item) => item.category === value)
                : expenses;
        updateTable(result);
        setCategory(value);
    };

    return (
        <Fragment>
            <div className="row mt-5">
                <div className="col-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        {controllers.map((ctrl) => (
                            <Fragment key={ctrl.id}>
                                {ctrl.type === 'text' ? (
                                    <div>
                                        {renderInput(
                                            ctrl,
                                            handleChange,
                                            handleBlur,
                                            formGroup,
                                            errorMessages
                                        )}
                                    </div>
                                ) : null}
                                {ctrl.type === 'select' ? (
                                    <div>
                                        {renderSelect(
                                            ctrl,
                                            handleChange,
                                            handleBlur,
                                            formGroup,
                                            'value',
                                            'label',
                                            errorMessages
                                        )}
                                    </div>
                                ) : null}
                            </Fragment>
                        ))}
                        <button type="submit" className="btn btn-primary my-3">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6 mx-auto">
                    {expenses.length ? (
                        <Fragment>
                            <SelectComponent
                                options={getOptions()}
                                textProp="label"
                                valueProp="value"
                                onChange={handleInputChange}
                                onBlur={handleBlurFilter}
                                label="Filter by category"
                                name="filter"
                                value={category}
                                type={'select'}
                            />

                            <TableComponent
                                tableHeader={tableHeader}
                                tableBody={tableBody()}
                                onSort={handleSort}
                                classes="bordered"
                            />
                        </Fragment>
                    ) : (
                        <AlertsComponent classes="warning">
                            Oops! Fill the form to add an expense to the list...
                        </AlertsComponent>
                    )}
                </div>

                {/* <p>{JSON.stringify(expenses)}</p> */}
            </div>
        </Fragment>
    );
};

export default ExpenseTracker;
