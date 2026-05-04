# README: useReactiveForm Custom Hook

Welcome to the useReactiveForm custom hook repository! This custom React hook is designed to simplify form management in your React applications. It integrates seamlessly with the Zod library to handle form validations, making it easier to manage form states and perform validations.

## Features

- **Dynamic Form Setup:** Easily configure different form elements.
- **Built-in Validation:** Leverage Zod for powerful schema validations.
- **Error Handling:** Automate the display and management of error messages.
- **Customizable and Reusable:** Use with various input types and customize as per your needs.

## Consuming `useReactiveForm`

### Prerequisites

Ensure that you have the following installed in your project:

- React
- Zod

You can install them using npm or yarn if you haven't already:

```bash
npm install react zod
```
or
```bash
yarn add react zod
```

### Installation

Copy the `useReactiveForm` hook into your project or clone this repository to get started.

### Usage

Here’s a step-by-step guide to integrate the `useReactiveForm` hook in your React component.

1. **Define Your Form Controllers:**

	```javascript
	const formControllers = [
	    {
	        type: "text",
	        name: "username",
	        label: "Username",
	        validators: [z.string().min(1)],
	        id: "6435bff3d16ecfa79bdcf3d9",
	    },
	    {
	        type: "select",
	        name: "age",
	        label: "Age",
	        options: [
	            { value: "", label: "Choose category" },
	            { value: "16", label: "16 years" },
	            { value: "21", label: "21 years" },
	            { value: "40", label: "40 years" },
	        ],
	        validators: [z.string().min(1)],
	        id: "6435bff3d16ecfa79bdcf3ddasc",
	    },
	    {
	        type: "checkbox",
	        name: "liked",
	        label: "Liked",
	        validators: [],
	        id: "6435bff3d16ecfa79bdcf3dz",
	    },
	];
	```

2. **Set Up the Form Component:**

	Use the `useReactiveForm` within your functional component to manage form state, handle changes, validate on the fly, and submit the form.

	```
	const [controllers, setControllers] = useState([]);
    const [form, setForm] = useState(formMaker(formControllers));
    const {
        formGroup,
        errorMessages,
        handleChange,
        handleSubmit,
        handleBlur,
        renderInput,
        renderSelect,
    } = useReactiveForm(form, formControllers, doSubmit, {
        resetOnSchemaChange: false,
    });

    useEffect(() => {
        setControllers(formControllers);
    }, []);

    function doSubmit() {
        console.log('POST REQ');
        // console.log("errorMessages", errorMessages);
    }

    return (
        <Fragment>
            <div className="ms-3 mb-5">
                <h1>Form controls</h1>
                <p>
                    Examples and usage guidelines for form control styles,
                    layout options, and custom components.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {controllers.map((ctrl) => (
                    <Fragment key={ctrl.id}>
                        {ctrl.type === 'text' || ctrl.type === 'password' ? (
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
            </form>

            {JSON.stringify(formGroup)}
        </Fragment>
    );
    
    ```


## Understanding `useReactiveForm`

This guide provides an in-depth look at how the `useReactiveForm` hook is structured and functions, using code snippets to clarify each part of its operation.

### Initialization

When initializing the `useReactiveForm`, we start by setting up the state for `formGroup` and `errorMessages`.

```javascript
const [formGroup, setStateFormGroup] = useState<FormSchema>(schema);
const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
```

- **formGroup**: Holds the values of the form fields.
- **errorMessages**: Tracks validation errors for each field.

### useEffect for Schema Updates

If the form schema needs to be dynamic, you might want to reset the form when the schema changes. This is handled by a `useEffect` hook.

```javascript
useEffect(() => {
    if (config.resetOnSchemaChange) {
        setStateFormGroup(schema);
    }
}, [schema, config.resetOnSchemaChange]);
```

### Validation

The `validateField` function checks individual fields against their specified Zod validators and updates the error messages accordingly.

```javascript
const validateField = (name, value, validators, label) => {
    let error;
    for (const validator of validators) {
        try {
            validator.parse(value);
        } catch (validationError) {
            if (validationError instanceof ZodError) {
                error = processErrorMessages(validationError.errors, label);
                break;
            }
        }
    }
    setErrorMessages((prev) => ({ ...prev, [name]: error }));
};
```

### Event Handlers

#### handleChange

This handler updates the form values and triggers validation whenever a user types or changes a field.

```javascript
const handleChange = (e, validators, label) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    const updatedFormGroup = { ...formGroup, [name]: newValue };
    setStateFormGroup(updatedFormGroup);

    validateField(name, newValue, validators, label);
};
```

#### handleBlur

The blur event ensures fields are re-validated when a user navigates away from an input, confirming their entries are still valid.

```javascript
const handleBlur = (e, validators, label) => {
    const { name } = e.target;
    const value = formGroup[name];
    validateField(name, value, validators, label);
};
```

### Handling Form Submission

The `handleSubmit` function manages form submission, checking for validity before proceeding.

```javascript
const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrorMessages = {};

    controllers.forEach(({ name, validators, label }) => {
        validators.forEach((validator) => {
            try {
                validator.parse(formGroup[name]);
            } catch (error) {
                isValid = false;
                newErrorMessages[name] = processErrorMessages(error.errors, label);
            }
        });
    });

    setErrorMessages(newErrorMessages);

    if (isValid) {
        doSubmit();
    }
};
```

### Utility Functions

#### resetForm

Resets the form to initial states.

```javascript
const resetForm = () => {
    setStateFormGroup(schema);
    setErrorMessages({});
};
```

#### Render Functions

Functions like `renderInput` and `renderSelect` provide reusable JSX for form inputs.

```javascript
function renderInput(controller, handleChange, handleBlur, formGroup, errors) {
    const { label, name, type, validators, placeholder } = controller;
    return (
        <InputGroup
            label={label}
            name={name}
            value={formGroup[name]}
            onChange={(e) => handleChange(e, validators, label)}
            onBlur={(e) => handleBlur(e, validators, label)}
            type={type}
            placeholder={placeholder}
            error={errors[name]}
        />
    );
}
```

