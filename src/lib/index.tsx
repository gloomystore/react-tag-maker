/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
// src/lib/index.tsx - 라이브러리 메인 엔트리 파일

import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'

function useFirstRender(callback: () => void, deps: unknown[]) {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      callback();
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

interface TagProps {
  text: string
  remove: (text: string) => void
  disabled?: boolean
  className?: string
}

function Tag({ text, remove, disabled, className }: TagProps) {
  const [disappearing, setDisappearing] = useState(false)
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setDisappearing(true)
    setTimeout(() => {
      remove(text)
    }, 150)
  }, [remove, text])

  const classNames = useCallback((...classes: (string | undefined | null | false)[]) => {
    return disappearing ? classes.filter(Boolean).join(' ') + ' disappearing' : classes.filter(Boolean).join(' ')
  }, [disappearing])

  return (
    <span className={classNames('gloomy-tag--tag', className)}>
      <span>{text}</span>
      {!disabled && (
        <button type='button' onClick={handleClick} aria-label={`remove ${text}`}>
          &#10005;
        </button>
      )}
    </span>
  )
}

export interface GloomyTagsProps {
  name?: string
  placeHolder?: string
  state: string[]
  setState: React.Dispatch<string[]>
  onChange?: (value: string[]) => void
  onBlur?: () => void
  separators?: string[]
  disableBackspaceRemove?: boolean
  onExisting?: (text: string) => void
  onRemoved?: (text: string) => void
  disabled?: boolean
  isEditOnRemove?: boolean
  beforeAddValidate?: (input: string, state: string[]) => boolean
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  classNames?: {
    tag?: string
    input?: string
  }
  style?: Record<string, string | number>;
  throttleTime?: number;
}

let timeout: number | undefined;

export default function GloomyTags({
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
  throttleTime,
}: GloomyTagsProps) {

  const inputRef = useRef<HTMLInputElement>(null)
  const [focusArray, setFocusArray] = useState<any[]>([])
  useFirstRender(() => {
    setState && setState(state)
  }, [state])

  useEffect(() => {
    const tempFocusArray = typeof state === 'object' ? state.map((e:unknown) => ({
      tag: e,
      focus: false,
    })) : []
    setFocusArray(tempFocusArray)
    onChange && onChange(state)
  }, [state, onChange])
  
  const [throttle, setThrottle] = useState<unknown>(0)
  const ENTER_KEYS = ['Enter', ' ', ',']
  const [isFocus, setIsFocus] = useState(false)
  useEffect(() => {
    if(focusArray.find((e:any) => e && e.focus)) {
      setIsFocus(true)
    } else {
      setIsFocus(false)
    }
  }, [focusArray])
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if(timeout) return
    setTimeout(() => timeout = undefined , timeout)

    const inputValue = event.currentTarget.value.replace(/\s/gi, '')
    const key = event.key

    if (inputValue && (separators.includes(key) || ENTER_KEYS.includes(key))) {
      event.preventDefault()

      if (beforeAddValidate && !beforeAddValidate(inputValue, state)) {
        return
      }


      // 쓰로틀 상태에서는 안함
      if(!throttle) setThrottle(setTimeout(() => {setThrottle(0)}, throttleTime ?? 10))
      else return console.warn('react-tag-maker throttling!')

      if (!state.includes(inputValue)) {
        setState([...state, inputValue])
        event.currentTarget.value = ''
      } else {
        onExisting && onExisting(inputValue)
      }
    }

    if (!inputValue && !disableBackspaceRemove && state.length && key === 'Backspace') {
      event.preventDefault()
      if (isEditOnRemove) {
        event.currentTarget.value = `${state.slice(-1)} `
      } else if(isFocus) {
        setState([...state.slice(0, -1)])
      } else if(!isFocus && state.length > 0) {
        const tempFocusArray = [...focusArray]
        if(tempFocusArray[tempFocusArray.length-1]) {
          tempFocusArray[tempFocusArray.length-1].focus = true
          setFocusArray(tempFocusArray)
        }
      } else {
        console.log()
      }
    } else {
      const tempFocusArray = [...focusArray]
        if(tempFocusArray[tempFocusArray.length-1]) {
          tempFocusArray[tempFocusArray.length-1].focus = false
          setFocusArray(tempFocusArray)
        }
    }
  }

  const handleTagRemove = (tag: string) => {
    setState(state.filter((t) => t !== tag))
    onRemoved && onRemoved(tag)
  }

  const [originStyle, setOriginStyle] = useState<string | null>(null);
  useEffect(() => {
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
              background: #fff;
              color: #000;
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
              color: #000;
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
                color: #000;
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
  }, [originStyle])

  const cursorToInput = useCallback((e:any) => {
    if(!inputRef.current || e.target.className !== 'gloomy-tag--container') return
    inputRef.current.focus()
  }, [])

  return (
    <div className='gloomy-tag--container' onClick={cursorToInput} style={style}>
      {focusArray.map((item) => (
        <Tag
          key={item.tag}
          className={`${classNames?.tag} ${item.focus && 'gloomy-tag--focus'}`}
          text={item.tag}
          remove={handleTagRemove}
          disabled={disabled}
        />
      ))}
      <input
        className={`gloomy-tag--input ${classNames?.input}`}
        type='text'
        name={name}
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        disabled={disabled}
        onKeyUp={onKeyUp}
        ref={inputRef}
      />
      <style>{originStyle}</style>
    </div>
  )
}