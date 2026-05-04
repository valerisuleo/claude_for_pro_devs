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
import BtnComponent from 'src/app/library/components/button/button';
import SpendingChart from './spending-chart';

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
        isFormValid,
        resetForm,
        handleChange,
        handleSubmit,
        handleBlur,
        renderInput,
        renderSelect,
    } = useReactiveForm(form, formControllers, doSubmit, {
        resetOnSchemaChange: false,
    });

    const { tableBody, updateTable, handleSort } = useTable(
        expenses,
        tableHeader,
        {
            sortable: true,
            defaultSortOrder: 'asc',
            mode: 'default',
        }
    );

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
            <div className="flex flex-wrap items-center justify-end gap-2">
                {actions.map((btn: IButtonAction, i) => (
                    <BtnComponent
                        key={i}
                        label={btn.label}
                        type="button"
                        variant={btn.variant ?? 'outline'}
                        size={btn.size ?? 'sm'}
                        className={btn.className}
                        onEmitEvent={() => handleActions(row, btn)}
                    />
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

    const handleActions = (
        currentRow: IExpense,
        currentBtn: IButtonAction
    ): void => {
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

    const fieldShell =
        'min-w-0 [&_label]:mb-2 [&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-foreground';

    return (
        <Fragment>
            <section className="mx-auto max-w-4xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
                <form
                    className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2"
                    onSubmit={handleSubmit}
                >
                    {controllers.map((ctrl) => (
                        <Fragment key={ctrl.id}>
                            {ctrl.type === 'text' ? (
                                <div className={fieldShell}>
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
                                <div className={`${fieldShell} md:col-span-2`}>
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
                    <div className="md:col-span-2">
                        <BtnComponent
                            label="Submit"
                            type="submit"
                            variant="default"
                            size="default"
                            className="mt-2"
                            disabled={!isFormValid}
                            onEmitEvent={() => undefined}
                        />
                    </div>
                </form>
            </section>

            <section className="mx-auto max-w-4xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
                {expenses.length ? (
                    <div className="flex flex-col gap-8">
                        <SpendingChart expenses={expenses} />
                        <div className={fieldShell}>
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
                        </div>

                        <TableComponent
                            tableHeader={tableHeader}
                            tableBody={tableBody()}
                            onSort={handleSort}
                            className="rounded-md border border-border bg-card text-card-foreground shadow-xs"
                        />
                    </div>
                ) : (
                    <AlertsComponent variant="default">
                        Oops! Fill the form to add an expense to the list...
                    </AlertsComponent>
                )}
            </section>
            {JSON.stringify(errorMessages)}
        </Fragment>
    );
};

export default ExpenseTracker;
