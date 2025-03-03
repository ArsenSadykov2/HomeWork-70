import React from 'react';
import Backdrop from "../BackDrop/BackDrop.tsx";

interface ModalProps {
    show: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, title, onClose, children }) => {
    return (
        <>
            <Backdrop show={show} onClick={onClose} />
            <div
                className={`modal ${show ? 'modal-open' : 'modal-closed'}`}
                style={{ display: show ? 'block' : 'none' }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;