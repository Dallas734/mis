import React, {
    InputHTMLAttributes,
    memo,
    useEffect,
    useRef,
} from 'react';
import cnBind from 'classnames/bind';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    classes?: string[];
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
}

export const Input = memo((props: InputProps) => {

    const cn = cnBind.bind(cls);
    const {
        classes = [],
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autofocus) {
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };
    
    return (
        <>
        <input
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        className={cn(cls.Input, ...classes.map(clsName => cls[clsName] || clsName))}
        readOnly={readonly}
        {...otherProps}
        />
        {type === 'checkbox' && <span className={cls.emulatorCheckBox}></span>}
        {type === 'radio' && <span className={cls.emulatorRadioButton}></span>}
        </>
    );
});
