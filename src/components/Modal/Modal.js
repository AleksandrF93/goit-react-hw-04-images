import React, { useEffect } from "react";
import { createPortal } from 'react-dom';
import s from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },
    );

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            props.onClose();
        }
    };

   const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            props.onClose();
        }
    }

        return createPortal(
            <div className={s.backdrop} onClick={handleBackdropClick}>
                <div className={s.content}>{props.children}</div>
            </div>, modalRoot,
        );
};