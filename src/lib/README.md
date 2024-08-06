# react-tag-maker

`GloomyTags` is a custom tag input component for React. This component provides functionality to add and remove tags, enhancing the user experience with various options.

## Installation

You can install the package using npm or yarn.

```bash
npm install gloomy-tags
```

or

```bash
yarn add gloomy-tags
```

## Usage

You can use the `GloomyTags` component to create a tag input field. The basic usage is as follows:

```jsx
import React, { useState } from 'react';
import GloomyTags from 'gloomy-tags';

function App() {
  const [state, setState] = useState([]);

  return (
    <GloomyTags
      state={state}
      setState={setState}
      separators={[' ', ',']} // Keys to separate tags
      disableBackspaceRemove={false} // Whether to remove tags with Backspace
      isEditOnRemove={false} // Whether to switch to edit mode when a tag is removed
      throttleTime={300} // Input throttle time
    />
  );
}

export default App;
```

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

## Examples

### Basic Example

```jsx
import React, { useState } from 'react';
import GloomyTags from 'gloomy-tags';

function Example() {
  const [tags, setTags] = useState([]);

  return (
    <GloomyTags
      state={tags}
      setState={setTags}
      separators={[' ', ',']}
      disableBackspaceRemove={false}
      isEditOnRemove={false}
      beforeAddValidate={(input, state) => input.length > 0 && !state.includes(input)}
    />
  );
}
```

### Styling

The component includes basic styles and is provided in a CSS-in-JS manner. Use the `classNames` and `style` props to apply additional styles.

## Contributing

If you wish to contribute, please submit a pull request after [documenting](CONTRIBUTING.md) or [reporting an issue](https://github.com/your-repo/issues).

## License

[GPLv3 License](LICENSE)
"
