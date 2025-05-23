import React, { useState, useRef, useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';

function Post() {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [isEducationDropdownOpen, setIsEducationDropdownOpen] = useState(false);
  const [showTokenTooltip, setShowTokenTooltip] = useState(false); // <-- Add this line
  const dropdownRef = useRef(null);

  const educationOptions = [
    { value: 'no_education', label: 'No Formal Education' },
    { value: 'primary', label: 'Primary Education' },
    { value: 'secondary', label: 'Secondary Education' },
    { value: 'high_school', label: 'High School Diploma' },
    { value: 'vocational', label: 'Vocational Training' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" },
    { value: 'professional', label: 'Professional Degree' },
    { value: 'phd', label: 'Doctorate (PhD)' },
    { value: 'postdoc', label: 'Postdoctoral Studies' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsEducationDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const toggleEducationOption = (value) => {
    if (selectedEducation.includes(value)) {
      setSelectedEducation(selectedEducation.filter(edu => edu !== value));
    } else {
      setSelectedEducation([...selectedEducation, value]);
    }
  };

  const removeEducation = (value) => {
    setSelectedEducation(selectedEducation.filter(edu => edu !== value));
  };

  const getSelectedEducationLabels = () => {
    return selectedEducation.map(value => 
      educationOptions.find(option => option.value === value)?.label
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#015551] mb-2">Create New Post</h1>
        <p className="text-gray-600 mb-6">
          Fill out the form below to create a new job posting. Make sure to provide accurate and detailed information.
        </p>

        <div className="space-y-6">

        <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              Token
              <span
                className="relative group"
                tabIndex={0}
                onClick={() => setShowTokenTooltip((prev) => !prev)}
                onBlur={() => setShowTokenTooltip(false)}
                onMouseEnter={() => setShowTokenTooltip(true)}
                onMouseLeave={() => setShowTokenTooltip(false)}
              >
                <FiInfo className="h-4 w-4 text-gray-400 cursor-pointer" />
                <div onMouseEnter={() => setShowTokenTooltip(true)} className={`absolute top-0 left-20 -translate-x-1/2 mt-2 w-64 bg-white text-gray-700 text-sm rounded shadow-lg p-4 z-20 transition-opacity ${showTokenTooltip ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                  To get your API token, visit <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://aistudio.google.com/apikey</a>.<br /><br />
                  Sign in with your Google account,then click on create api key, then copy your API key from the page and paste it here.
                </div>
              </span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter your token"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter job title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              rows="6"
              placeholder="Enter job description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Required Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-[#C1CFA1] px-3 py-1 rounded-full flex items-center">
                  <span className="mr-2">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all bg-gray-50"
              placeholder="Type skill and press Enter"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter city"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Minimum Experience</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                min="0"
                placeholder="Years of experience"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
            </div>

            <div className="flex-1" ref={dropdownRef}>
              <label className="block text-gray-700 font-medium mb-2">Education Level</label>
              
              {/* Custom Multi-Select Dropdown */}
              <div className="relative">
                {/* Selected items display */}
                <div 
                  className="w-full h-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all bg-gray-50 cursor-pointer flex flex-wrap gap-2 items-center overflow-hidden relative"
                  onClick={() => setIsEducationDropdownOpen(!isEducationDropdownOpen)}
                >
                  {selectedEducation.length > 0 ? (
                    selectedEducation.map(value => {
                      const option = educationOptions.find(opt => opt.value === value);
                      return (
                        <div key={value} className="bg-[#C1CFA1] px-3 py-1 rounded-full flex items-center text-sm">
                          <span className="mr-2">{option?.label}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeEducation(value);
                            }}
                            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-gray-400">Select education level(s)</span>
                  )}
                </div>

                {/* Dropdown options */}
                {isEducationDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-[#015551] rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {educationOptions.map(option => (
                      <div 
                        key={option.value}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                          selectedEducation.includes(option.value) ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => toggleEducationOption(option.value)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedEducation.includes(option.value)}
                          onChange={() => {}}
                          className="mr-2"
                        />
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#015551] text-white py-3 px-6 rounded-lg hover:bg-[#01403d] hover:cursor-pointer transition-all font-medium"
          >
            Create Job Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;