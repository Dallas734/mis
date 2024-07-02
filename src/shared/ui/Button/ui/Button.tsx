import { ButtonHTMLAttributes, ReactNode } from 'react';
import cnBind from 'classnames/bind';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: ReactNode;
    classes?: string[];
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {children, classes = [], type = 'button', disabled = false, ...otherProps} = props;
    const cn = cnBind.bind(cls);
    return (
        <button
            type={type}
            className={cn(cls.Button, ...classes.map(clsName => cls[clsName] || clsName))}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
}
