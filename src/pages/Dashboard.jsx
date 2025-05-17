import React, { useState, useRef, useEffect } from 'react';

function Dashboard() {
  const [searchName, setSearchName] = useState('');
  const [searchSkills, setSearchSkills] = useState('');
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [minExperience, setMinExperience] = useState(0);
  const [isEducationDropdownOpen, setIsEducationDropdownOpen] = useState(false);
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

  const getScoreColor = (score) => {
    if (score >= 8.5) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6">
      {/* Job Post Header */}
      <div className="bg-[#C1CFA1] p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-[#015551] mb-4">Senior Software Engineer</h1>
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="bg-[#015551] px-2 py-1 rounded-full text-white text-sm">JavaScript</div>
          <div className="bg-[#015551] px-2 py-1 rounded-full text-white text-sm">React</div>
          <div className="bg-[#015551] px-2 py-1 rounded-full text-white text-sm">Node.js</div>
          <div className="bg-[#015551] px-2 py-1 rounded-full text-white text-sm">AWS</div>
        </div>
        <span className="text-gray-600 text-sm">Posted: 2023-10-15</span>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 overflow-x-auto">
        <div className="bg-white p-6 rounded-lg shadow min-w-[200px]">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-[#015551]">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow min-w-[200px]">
          <h3 className="text-gray-500 text-sm font-medium">&gt; 7.5 AI Score</h3>
          <p className="text-3xl font-bold text-[#015551]">567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow min-w-[200px]">
          <h3 className="text-gray-500 text-sm font-medium">&gt; 60% Skill Match</h3>
          <p className="text-3xl font-bold text-[#015551]">890</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex flex-col sm:flex-row gap-6 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Search by Name</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter name"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Search by Skills</label>
            <input
              type="text"
              value={searchSkills}
              onChange={(e) => setSearchSkills(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter skills"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 mb-4">
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
            <p className="text-sm text-gray-500 mt-1">Click to select multiple options</p>
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Min Experience</label>
            <input
              type="number"
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              min="0"
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
        </div>
        <button className="bg-[#015551] text-white px-6 py-2 rounded-lg hover:bg-[#01403d] transition-all hover:cursor-pointer">
          Sort & Filter
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skills Match</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Example Row */}
            <tr>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">75%</td>
              <td className="px-6 py-4">
                <span className={`${getScoreColor(8.5)} text-white px-3 py-1 rounded-full text-sm`}>
                  8.5
                </span>
              </td>
              <td className="px-6 py-4">May 7, 2025</td>
              <td className="px-6 py-4 flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            {/* Add more rows here as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;