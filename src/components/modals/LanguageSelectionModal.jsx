import { useState, useEffect, useRef } from 'react';

/**
 * Modal for selecting a language to generate interview questions.
 */
const LanguageSelectionModal = ({ isOpen, onClose, onGenerate, isLoading, onLoadingFinish, interviews }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const modalRef = useRef(null);
    const dropdownRef = useRef(null); // Ref for the dropdown menu

    // Language options
    const languageMap = {
        'fr': 'French',
        'en': 'English',
        'es': 'Spanish'
    };

    // Generates interview questions for the selected language.
    const handleGenerate = async () => {
        if (selectedLanguage) {
            await onGenerate(selectedLanguage);
            if (onLoadingFinish) {
                onLoadingFinish(); // Call if provided, e.g., to close modal after generation
            }
        }
    };

    // Sets the selected language and closes the dropdown.
    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsDropdownOpen(false);
    };

    // Handles clicks outside the modal or dropdown to close them.
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close modal if clicked outside and not loading
            if (modalRef.current && !modalRef.current.contains(event.target) && !isLoading) {
                onClose();
            }
            // Close dropdown if clicked outside the dropdown menu
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, isLoading]); 

    // Do not render if modal is not open or interviews exist
    if (!isOpen || interviews) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50"> 
            {/* Modal Content */}
            <div 
                ref={modalRef} 
                className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto relative z-10"
            >
                <h3 className="text-xl font-bold text-[#015551] mb-6">Generate Interview Questions</h3>
                
                {/* Language Selection Dropdown */}
                <div className="mb-6">
                    <label htmlFor="language-menu-button" className="block text-gray-700 font-medium mb-3">Select Language</label>
                    <div className="relative w-full" ref={dropdownRef}> {/* Attach ref to the dropdown container */}
                        <div>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex w-full justify-between items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                                id="language-menu-button"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                {selectedLanguage ? languageMap[selectedLanguage] : "Choose a language"}
                                <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <div className="py-1 overflow-y-auto max-h-48 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="menu" aria-orientation="vertical" aria-labelledby="language-menu-button">
                                    {Object.entries(languageMap).map(([code, name]) => (
                                        <button
                                            key={code}
                                            onClick={() => handleLanguageSelect(code)}
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                            role="menuitem"
                                        >
                                            {name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleGenerate}
                        className="px-5 py-2 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        disabled={!selectedLanguage || isLoading}
                    >
                        {isLoading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>
            {/* Modal Overlay */}
            <div className='w-full h-full bg-black opacity-75 fixed top-0 left-0 z-0'></div>
        </div>
    );
};

export default LanguageSelectionModal;