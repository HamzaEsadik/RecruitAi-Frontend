import React, { useEffect, useRef } from 'react';

/**
 * Generic Modal component.
 * Handles opening, closing, and displaying content.
 */
const Modal = ({ isOpen, onClose, onConfirm, children }) => {
    const modalRef = useRef(null); 

    // Handles closing the modal when clicking outside.
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the click is outside the modal content, call onClose
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Add event listener when the modal is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup: remove event listener when the component unmounts or isOpen/onClose changes
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // If the modal is not open, don't render anything
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4">
            {/* Modal content */}
            <div 
                ref={modalRef} 
                className="z-10 bg-white rounded-xl shadow-lg p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Children content */}
                <div className="mb-6">
                    {children}
                </div>
                {/* Action buttons */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onConfirm} // Confirmation action
                        className="px-5 py-2 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
            {/* Background overlay */}
            <div className='w-full h-dvh bg-black opacity-75 fixed'></div>
        </div>
    );
};

export default Modal;