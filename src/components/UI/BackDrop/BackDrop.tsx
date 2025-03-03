import React from 'react';

interface Props {
    show: boolean;
    onClick: () => void;
}

const Backdrop: React.FC<Props> = ({ show, onClick }) => {
    return (
        <div
            className={`backdrop ${show ? 'backdrop-open' : 'backdrop-closed'}`}
            onClick={onClick}
        />
    );
};

export default Backdrop;