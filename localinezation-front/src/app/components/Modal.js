const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1000
        }}>
            {children}
            <button onClick={onClose}>OK</button>
        </div>
    );
};

export default Modal;