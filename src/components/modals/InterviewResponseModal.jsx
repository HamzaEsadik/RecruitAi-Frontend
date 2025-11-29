import { useEffect, useRef } from 'react';

/**
 * Modal to display interview questions and answers.
 * Allows users to view the interview and request regeneration.
 */
const InterviewResponseModal = ({ isOpen, onClose, onRegenerate, interview }) => {
    const modalRef = useRef(null);

    // Handles clicks outside the modal to close it.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener on component unmount or when isOpen changes.
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50"> {/* Ensure modal is on top */}
            {/* Modal Content */}
            <div 
                ref={modalRef} 
                className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10" // z-10 for content above overlay
            >
                <h3 className="text-xl font-bold text-[#015551] mb-6">Interview Questions</h3>
                <div className="space-y-4">
                    {interview && interview.questions && interview.questions.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700 mb-2">{item.question}</p>
                            <p className="text-gray-600">{item.answer}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onRegenerate}
                        className="px-5 py-2 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all cursor-pointer"
                    >
                        Regenerate
                    </button>
                </div>
            </div>
            {/* Modal Overlay */}
            <div className='w-full h-full bg-black opacity-75 fixed top-0 left-0 z-0'></div> {/* Ensure overlay is behind content */}
        </div>
    );
};

export default InterviewResponseModal;