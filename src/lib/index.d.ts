import React from 'react';

interface GloomyTagsProps {
    name?: string;
    placeHolder?: string;
    state?: string[];
    setState: React.Dispatch<any>;
    onChange?: (tags: string[]) => void;
    onBlur?: any;
    separators?: string[];
    disableBackspaceRemove?: boolean;
    onExisting?: (tag: string) => void;
    onRemoved?: (tag: string) => void;
    disabled?: boolean;
    isEditOnRemove?: boolean;
    beforeAddValidate?: (tag: string, existingTags: string[]) => boolean;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    classNames?: {
        input?: string;
        tag?: string;
    };
    style?: Record<string, string | number>;
    throttleTime?: number;
}

declare const GloomyTags: (props: GloomyTagsProps) => JSX.Element;

export default GloomyTags; // 기본 내보내기로 수정
