# react-tag-maker

`GloomyTags` is a custom tag input component for React. This component provides functionality to add and remove tags, enhancing the user experience with various options.

## Installation

You can install the package using npm or yarn.

```bash
npm install react-tag-maker
``` 

or

```bash
yarn add react-tag-maker
```

## Usage
![Usage Example](https://cdn.gloomy-store.com/react-tag-maker/use.gif)

You can use the `GloomyTags` component to create a tag input field. The basic usage is as follows:

### Basic Use

```jsx
import React, { useState } from 'react';
import GloomyTags from 'react-tag-maker';

function App() {
  const [state, setState] = useState([]);

  return (
    <GloomyTags
      state={state}
      setState={setState}
    />
  );
}

export default App;
```

### Use Options

```jsx
import React, { useState } from 'react';
import GloomyTags from 'react-tag-maker';

function App() {
  const [state, setState] = useState([]);

  return (
    <GloomyTags
      state={state}
      setState={setState}
      disableBackspaceRemove={false} // Whether to remove tags with Backspace
      isEditOnRemove={false} // Whether to switch to edit mode when a tag is removed
      throttleTime={300} // Input throttle time
    />
  );
}

export default App;
```



### Styling

The component includes basic styles and is provided in a CSS-in-JS manner. Use the `classNames` and `style` props to apply additional styles.

## Props

### `GloomyTags`

- **`name`** (optional): The name attribute of the `<input>` element.
- **`placeHolder`** (optional): The placeholder text for the `<input>` element.
- **`state`**: An array of strings representing the current tag state.
- **`setState`**: A function to update the tag state.
- **`onChange`** (optional): Callback function called when the tag state changes.
- **`onBlur`** (optional): Callback function called when the `<input>` element loses focus.
- **`separators`** (optional): Array of keys to separate tags (e.g., `[' ', ',']`).
- **`disableBackspaceRemove`** (optional): Whether to allow removing tags with the Backspace key.
- **`onExisting`** (optional): Callback function called when an existing tag is entered.
- **`onRemoved`** (optional): Callback function called when a tag is removed.
- **`disabled`** (optional): Whether to disable the component.
- **`isEditOnRemove`** (optional): Whether to switch to edit mode when a tag is removed.
- **`beforeAddValidate`** (optional): Function for validating before adding a tag.
- **`onKeyUp`** (optional): Keyup event handler for the `<input>` element.
- **`classNames`** (optional): Object to specify CSS class names. `{ tag?: string, input?: string }`.
- **`style`** (optional): Object to apply inline styles.
- **`throttleTime`** (optional): Input throttle time.

### `Tag`

- **`text`**: Text to display on the tag.
- **`remove`**: Function to remove the tag.
- **`disabled`** (optional): Whether to disable the remove button on the tag.
- **`className`** (optional): CSS class name for the tag.

## Contributing

If you wish to contribute, please submit a pull request after [documenting](CONTRIBUTING.md) or [reporting an issue](https://github.com/gloomystore/react-tag-maker/issues).

## License

[GPLv3 License](LICENSE)