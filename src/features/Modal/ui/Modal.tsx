import { ReactNode, useRef, useEffect } from 'react';
import cls from './Modal.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../../shared/ui/Button/ui/Button';
import classNames from 'classnames';

interface ModalProps {
    classes?: string[];
    title: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
    const { classes = [], children, title, isOpen, onClose } = props;
    const cn = cnBind.bind(cls);
    const modalRef = useRef<HTMLDivElement>(null);

    const closeButtonClasses = classNames(
        'closeButton',
        'closeModalCross',
        'transparent'
    ).split(' ');

    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;

        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Проверяем, был ли клик на содержимом модального окна
            if (target === modalRef.current || !modalRef.current?.contains(target)) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                const rect = modal.getBoundingClientRect();
                offsetX = startX - rect.left - rect.width / 2;
                offsetY = startY - rect.top - rect.height / 2;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        };
        
        modal.addEventListener('mousedown', onMouseDown);
        

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            // Ограничение координат, чтобы окно не выходило за пределы экрана
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const modalRect = modal.getBoundingClientRect();
            
            const minLeft = modalRect.width/2 + 1;
            const maxLeft = windowWidth - modalRect.width/2 -1;
            const minTop = modalRect.height/2 + 1;
            const maxTop = windowHeight - modalRect.height/2 - 1;
            

            modal.style.left = `${Math.min(Math.max(newLeft, minLeft), maxLeft)}px`;
            modal.style.top =  `${Math.min(Math.max(newTop, minTop), maxTop)}px`;
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        modal.addEventListener('mousedown', onMouseDown);

        return () => {
            modal.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div
            ref={modalRef}
            className={cn(cls.modal, { [cls.open]: isOpen }, ...classes.map(clsName => cls[clsName] || clsName))}
        >
            {/* <div className={cls.buttons}>
                
            </div> */}
            <Button classes={closeButtonClasses} onClick={onClose}/>
            <span className={cls.modalHead}>{title}</span>
            <div className={cls.content}>
                {children}
            </div>
        </div>
    );
};
