import React from 'react';
interface GloomyTagsProps {
    name?: string;
    placeHolder?: string;
    state: string[];
    setState: React.Dispatch<any>;
    onChange?: (value: string[]) => void;
    onBlur?: () => void;
    separators?: string[];
    disableBackspaceRemove?: boolean;
    onExisting?: (text: string) => void;
    onRemoved?: (text: string) => void;
    disabled?: boolean;
    isEditOnRemove?: boolean;
    beforeAddValidate?: (input: string, state: string[]) => boolean;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    classNames?: {
        tag?: string;
        input?: string;
    };
    style?: Record<string, string | number>;
    throttleTime?: number;
}
export default function GloomyTags({ name, placeHolder, state, setState, onChange, onBlur, separators, disableBackspaceRemove, onExisting, onRemoved, disabled, isEditOnRemove, beforeAddValidate, onKeyUp, classNames, style, throttleTime, }: GloomyTagsProps): React.JSX.Element;
export {};
