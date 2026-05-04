/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
// 2. Custom hooks and utilities
import useReactiveForm from 'src/app/library/forms/hooks/useReactiveForm';
import { formMaker } from 'src/app/library/forms/hooks/utils';
import useTable from 'src/app/library/tables/hooks/useTable';
// 3. Component imports
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
        'min-w-0 [&_label]:mb-1.5 [&_label]:block [&_label]:text-[13px] [&_label]:font-medium [&_label]:text-foreground';

    return (
        <Fragment>
            {/* Hero Banner */}
            <div className="bg-[#f5f5f7] px-4 pb-16 pt-20 text-center">
                <h1 className="text-[52px] font-semibold leading-none tracking-tight text-[#1d1d1f]">
                    Expense Tracker.
                </h1>
                <p className="mt-4 text-[19px] text-[#6e6e73]">
                    Keep your finances beautifully organized.
                </p>
            </div>

            {/* Add Expense Form */}
            <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="border-b border-border px-8 py-5">
                        <h2 className="text-[19px] font-semibold tracking-tight text-foreground">
                            Add an Expense
                        </h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Fill in the details below to log your expense.
                        </p>
                    </div>
                    <div className="px-8 py-6">
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
                            <div className="pt-2 md:col-span-2">
                                <BtnComponent
                                    label="Add Expense"
                                    type="submit"
                                    variant="default"
                                    size="default"
                                    disabled={!isFormValid}
                                    onEmitEvent={() => undefined}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Expenses Section */}
            {expenses.length ? (
                <div className="bg-[#f5f5f7] px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-3xl flex-col gap-6">
                        {/* Spending Overview */}
                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                            <div className="border-b border-border px-8 py-5">
                                <h2 className="text-[17px] font-semibold tracking-tight text-foreground">
                                    Spending Overview
                                </h2>
                            </div>
                            <div className="px-8 py-6">
                                <SpendingChart expenses={expenses} />
                            </div>
                        </div>

                        {/* All Expenses */}
                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                            <div className="flex flex-col gap-4 border-b border-border px-8 py-5 sm:flex-row sm:items-end sm:justify-between">
                                <h2 className="text-[17px] font-semibold tracking-tight text-foreground">
                                    All Expenses
                                </h2>
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
                            </div>
                            <TableComponent
                                tableHeader={tableHeader}
                                tableBody={tableBody()}
                                onSort={handleSort}
                                className="rounded-none border-0"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <section className="mx-auto max-w-3xl px-4 pb-16 pt-2 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-border bg-card px-8 py-10 text-center shadow-sm">
                        <p className="text-[15px] text-muted-foreground">
                            No expenses yet. Add your first expense above.
                        </p>
                    </div>
                </section>
            )}
        </Fragment>
    );
};

export default ExpenseTracker;
