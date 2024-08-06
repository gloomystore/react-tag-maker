"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GloomyTags;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function App() {
  const [state, setState] = (0, _react.useState)([]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GloomyTags, {
    state: state,
    setState: setState
  });
}
function useFirstRender(callback, deps) {
  const isFirstRender = (0, _react.useRef)(true);
  (0, _react.useEffect)(() => {
    if (isFirstRender.current) {
      callback();
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
function Tag(_ref) {
  let {
    text,
    remove,
    disabled,
    className
  } = _ref;
  const [disappearing, setDisappearing] = (0, _react.useState)(false);
  const handleClick = (0, _react.useCallback)(event => {
    event.stopPropagation();
    setDisappearing(true);
    setTimeout(() => {
      remove(text);
    }, 150);
  }, [remove, text]);
  const classNames = (0, _react.useCallback)(function () {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }
    return disappearing ? classes.filter(Boolean).join(' ') + ' disappearing' : classes.filter(Boolean).join(' ');
  }, [disappearing]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: classNames('gloomy-tag--tag', className),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: text
    }), !disabled && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      type: "button",
      onClick: handleClick,
      "aria-label": `remove ${text}`,
      children: "\u2715"
    })]
  });
}
let timeout;
function GloomyTags(_ref2) {
  let {
    name,
    placeHolder,
    state,
    setState,
    onChange,
    onBlur,
    separators = [],
    disableBackspaceRemove = false,
    onExisting,
    onRemoved,
    disabled = false,
    isEditOnRemove = false,
    beforeAddValidate,
    onKeyUp,
    classNames,
    style,
    throttleTime
  } = _ref2;
  const inputRef = (0, _react.useRef)(null);
  const [focusArray, setFocusArray] = (0, _react.useState)([]);
  useFirstRender(() => {
    setState && setState(state);
  }, [state]);
  (0, _react.useEffect)(() => {
    const tempFocusArray = typeof state === 'object' ? state.map(e => ({
      tag: e,
      focus: false
    })) : [];
    setFocusArray(tempFocusArray);
    onChange && onChange(state);
  }, [state, onChange]);
  const [throttle, setThrottle] = (0, _react.useState)(0);
  const ENTER_KEYS = ['Enter', ' ', ','];
  const [isFocus, setIsFocus] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (focusArray.find(e => e.focus)) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  }, [focusArray]);
  const handleKeyDown = event => {
    if (timeout) return;
    setTimeout(() => timeout = undefined, timeout);
    const inputValue = event.currentTarget.value.replace(/\s/gi, '');
    const key = event.key;
    if (inputValue && (separators.includes(key) || ENTER_KEYS.includes(key))) {
      event.preventDefault();
      if (beforeAddValidate && !beforeAddValidate(inputValue, state)) {
        return;
      }

      // 쓰로틀 상태에서는 안함
      if (!throttle) setThrottle(setTimeout(() => {
        setThrottle(0);
      }, throttleTime ?? 300));else return console.warn('react-tag-maker throttling!');
      if (!state.includes(inputValue)) {
        setState([...state, inputValue]);
        event.currentTarget.value = '';
      } else {
        onExisting && onExisting(inputValue);
      }
    }
    if (!inputValue && !disableBackspaceRemove && state.length && key === 'Backspace') {
      event.preventDefault();
      if (isEditOnRemove) {
        event.currentTarget.value = `${state.slice(-1)} `;
      } else if (isFocus) {
        setState([...state.slice(0, -1)]);
      } else if (!isFocus && state.length > 0) {
        const tempFocusArray = [...focusArray];
        if (tempFocusArray[tempFocusArray.length - 1]) {
          tempFocusArray[tempFocusArray.length - 1].focus = true;
          setFocusArray(tempFocusArray);
        }
      } else {}
    } else {
      const tempFocusArray = [...focusArray];
      if (tempFocusArray[tempFocusArray.length - 1]) {
        tempFocusArray[tempFocusArray.length - 1].focus = false;
        setFocusArray(tempFocusArray);
      }
    }
  };
  const handleTagRemove = tag => {
    setState(state.filter(t => t !== tag));
    onRemoved && onRemoved(tag);
  };
  const [originStyle, setOriginStyle] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (!originStyle && typeof document === 'object') {
      setOriginStyle(`
        .gloomy-tag--container {
          box-sizing: border-box;
          transition: all 0.2s ease;
          align-items: center;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          line-height: 1.4;
          padding: 8px;
          width: 375px;
          cursor: text;

          @media(max-width: 600px) {
            width: 100%;
          }

          &:focus-within {
            border-color: #1d77fe;
            box-shadow: #1d77fe 0 0 0 1px;
          }

          &,
          * {
            box-sizing: border-box;
            transition: all 0.2s ease;
          }
            .gloomy-tag--input {
              border: 0;
              outline: 0;
              font-size: inherit;
              line-height: inherit;
              width: 50%;
            }

            .gloomy-tag--tag {
              align-items: center;
              background: #dbe3eb;
              border: 1px solid #b6b5b5;
              border-radius: 10px;
              display: inline-flex;
              justify-content: center;
              padding: 2.5px 4px;
              opacity: 1;
              &:has(button:hover) {
                background: #ffe2e2;
              }
              &.gloomy-tag--focus {
                background: #ffe2e2;
              }
              button {
                background: none;
                border: 0;
                border-radius: 50%;
                cursor: pointer;
                line-height: inherit;
                padding: 0 8px;
                font-weight: 900;

                &:hover {
                  color: #e53e3e;
                }
              }
              &.disappearing {
                transition: 0.15s;
                opacity: 0;
                background: #ffaaaa;
              }
            }
          }
      `);
    }
  }, [originStyle]);
  const cursorToInput = (0, _react.useCallback)(e => {
    if (!inputRef.current || e.target.className !== 'gloomy-tag--container') return;
    inputRef.current.focus();
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "gloomy-tag--container",
    onClick: cursorToInput,
    style: style,
    children: [focusArray.map(item => /*#__PURE__*/(0, _jsxRuntime.jsx)(Tag, {
      className: `${classNames?.tag} ${item.focus && 'gloomy-tag--focus'}`,
      text: item.tag,
      remove: handleTagRemove,
      disabled: disabled
    }, item.tag)), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      className: `gloomy-tag--input ${classNames?.input}`,
      type: "text",
      name: name,
      placeholder: placeHolder,
      onKeyDown: handleKeyDown,
      onBlur: onBlur,
      disabled: disabled,
      onKeyUp: onKeyUp,
      ref: inputRef
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
      children: originStyle
    })]
  });
}