import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDashboard, useDeletePost } from '../services/postServices';
import { useDeleteApplication, useMarkAsFavourite, useRequestInterview } from '../services/applyServices';
import Modal from '../components/Modal';
import LanguageSelectionModal from '../components/LanguageSelectionModal';
import InterviewResponseModal from '../components/InterviewResponseModal';
import useDisableScroll from '../hooks/useDisableScroll';

// Dashboard component to display and manage job applicants
function Dashboard() {
  const { dashboard } = useParams();
  // State variables for access token, search filters, and UI elements
  const [accessToken, setAccessToken] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchSkills, setSearchSkills] = useState('');
  const [minExperience, setMinExperience] = useState(0);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  const dropdownRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const { markAsFavourite } = useMarkAsFavourite();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedApplicantForInterview, setSelectedApplicantForInterview] = useState(null);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);
  const { requestInterview } = useRequestInterview();
  const [data, setData] = useState(null);

  // Sorting state for the applicants table
  const [sortConfig, setSortConfig] = useState({
    key: null, // 'skills_match', 'ai_score', 'experience'
    direction: 'desc', // 'asc' or 'desc'
  });

  // State for delete post confirmation modal
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);

  // Hook for deleting a post
  const { deletePost } = useDeletePost();

  // Disable body scroll when modals are open
  useDisableScroll(isLanguageModalOpen || isResponseModalOpen || isDeleteModalOpen || isDeletePostModalOpen);

  // Hooks for fetching dashboard data and deleting applications
  const { error, loading, getDashboard } = useGetDashboard(dashboard, accessToken);
  const { deleteApplication } = useDeleteApplication();

  // Effect to apply filters and sorting to applicants list
  useEffect(() => {
    if (data?.data?.applies) {
      let filtered = [...data.data.applies];

      // Filter by name
      if (searchName) {
        filtered = filtered.filter(applicant =>
          applicant.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      // Filter by skills
      if (searchSkills) {
        const skills = searchSkills.toLowerCase().split(',').map(s => s.trim());
        filtered = filtered.filter(applicant =>
          applicant.detail.skills.some(skill =>
            skills.some(s => skill.toLowerCase().includes(s))
          )
        );
      }

      // Filter by experience
      if (minExperience > 0) {
        filtered = filtered.filter(applicant =>
          applicant.detail.experience >= minExperience
        );
      }

      // Sorting
      if (sortConfig.key) {
        filtered.sort((a, b) => {
          let aValue, bValue;
          if (sortConfig.key === 'skills_match') {
            aValue = a.detail.skills_match;
            bValue = b.detail.skills_match;
          } else if (sortConfig.key === 'ai_score') {
            aValue = a.detail.ai_score;
            bValue = b.detail.ai_score;
          } else if (sortConfig.key === 'experience') {
            aValue = a.detail.experience;
            bValue = b.detail.experience;
          } else {
            return 0;
          }
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }

      setFilteredApplicants(filtered);
    }
  }, [data, searchName, searchSkills, minExperience, sortConfig]);

  // Options for education level filter (currently not used in UI)
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

  // Determines the color for the AI score badge based on the score
  const getScoreColor = (score) => {
    if (score >= 8.5) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Handles changes to the access token input
  const handleTokenChange = (e) => {
    setAccessToken(e.target.value);
    setData(null);
  };

  // Modify the button click handler
  const handleLoadDashboard = async () => {
    if (dashboard && accessToken && !fetchAttempted) {
      setFetchAttempted(true);
      const result = await getDashboard();
      if (result) {
        setData(result);
      } else {
        setFetchAttempted(false);
      }
    }
  };

  // Add a reset function when token changes
  useEffect(() => {
    setFetchAttempted(false);
  }, [accessToken]);

  // Opens the delete applicant confirmation modal
  const handleDeleteClick = (applyId) => {
    setSelectedApplicantId(applyId);
    setIsDeleteModalOpen(true);
  };

  // Confirms and executes applicant deletion
  const handleDeleteConfirm = async () => {
    if (selectedApplicantId) {
      await deleteApplication(selectedApplicantId);
      const result = await getDashboard(); // Refresh the dashboard data after deletion
      if (result) {
        setData(result); // Update the state with the refreshed data
      }
    }
    setIsDeleteModalOpen(false);
  };

  // Cancels applicant deletion
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  // Marks or unmarks an applicant as a favorite
  const handleMarkAsFavourite = async (applyId) => {
    await markAsFavourite(applyId);
    // Update the favorite status locally without refreshing
    setData(prevData => ({
      ...prevData,
      data: {
        ...prevData.data,
        applies: prevData.data.applies.map(applicant =>
          applicant.id === applyId
            ? { ...applicant, is_favorite: !applicant.is_favorite }
            : applicant
        )
      }
    }));
  };

  // Handles clicking the interview button for an applicant
  const handleInterviewClick = (applicant) => {
    setSelectedApplicantForInterview(applicant);
    if (applicant.detail.interview && Object.keys(applicant.detail.interview).length > 0) {
      setIsResponseModalOpen(true); // Show interview questions modal
    } else {
      setIsLanguageModalOpen(true); // Show language selection modal
    }
  };

  // REWRITE: After successful generation in LanguageSelectionModal, refresh then open InterviewResponseModal
  const handleGenerateInterview = async (languageCode) => {
    if (selectedApplicantForInterview && languageCode) {
      setIsGeneratingInterview(true);
      await requestInterview(selectedApplicantForInterview.id, languageCode);
      setIsGeneratingInterview(false);
      setIsLanguageModalOpen(false);

      // Refresh dashboard data and open InterviewResponseModal for the same applicant
      const refreshed = await getDashboard();
      if (refreshed) {
        setData(refreshed);

        // Find the updated applicant in the refreshed data
        const updatedApplicant = refreshed.data.applies.find(
          (a) => a.id === selectedApplicantForInterview.id
        );
        setSelectedApplicantForInterview(updatedApplicant || selectedApplicantForInterview);
      }
      setIsResponseModalOpen(true); // Open the interview questions modal after data is refreshed
    }
  };

  // Closes the language selection modal
  const handleCloseLanguageModal = () => {
    setIsLanguageModalOpen(false);
    setSelectedApplicantForInterview(null);
  };

  // Closes the interview response modal
  const handleCloseResponseModal = () => {
    setIsResponseModalOpen(false);
    setSelectedApplicantForInterview(null);
  };

  // Handles regenerating an interview, closes response modal and opens language modal
  const handleRegenerateInterview = () => {
    setIsResponseModalOpen(false); // Close the interview questions modal
    setIsLanguageModalOpen(true); // Open the language selection modal
  };

  // Callback for when interview generation loading finishes (legacy, might be removable)
  const handleLoadingFinish = () => {
    setIsResponseModalOpen(true); // Open the interview questions modal after loading finishes
  };

  // Confirms and executes post deletion
  const handleDeletePostConfirm = async () => {
    if (dashboard && accessToken) {
      const result = await deletePost(dashboard, accessToken);
      if (result) {
        setData(null); // Reset the dashboard data after deletion
        setAccessToken(''); // Clear the access token
      }
    }
    setIsDeletePostModalOpen(false); // Close the modal after deletion
  };

  // Cancels post deletion
  const handleDeletePostCancel = () => {
    setIsDeletePostModalOpen(false); // Close the modal without deleting
  };

  // Refresh handler
  const handleRefreshDashboard = async () => {
    if (dashboard && accessToken) {
      const result = await getDashboard();
      if (result) {
        setData(result);
      }
    }
  };

  // Placeholder for filter button click (filtering is reactive via useEffect)
  const handleFilter = () => {
    // Filtering is handled reactively in useEffect, so this is a no-op.
    // You may add custom sort/filter logic here if needed.
  };

  // Handles sorting the applicants table by a specific key
  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        // Toggle direction
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      } else {
        // Default to descending (high to low) when first clicked
        return {
          key,
          direction: 'desc'
        };
      }
    });
  };

  // Helper to show sort arrow
  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return (
      <span className="ml-1 inline-block align-middle">
        {sortConfig.direction === 'asc' ? (
          <svg className="w-3 h-3 inline" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6l-4 4h8l-4-4z" />
          </svg>
        ) : (
          <svg className="w-3 h-3 inline" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 14l4-4H6l4 4z" />
          </svg>
        )}
      </span>
    );
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6">
      {/* Access Token Input Section */}
      {!data && (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Access Token</label>
          <div className="flex">
            <input
              type="text"
              value={accessToken}
              onChange={handleTokenChange}
              className="flex-1 px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter your access token"
            />
            <button
              onClick={handleLoadDashboard}
              className="bg-[#015551] text-white px-4 py-2 rounded-r-lg hover:bg-[#01403d] transition-all hover:cursor-pointer"
            >
              Load Dashboard
            </button>
          </div>
        </div>
      )}

      {loading && <div className="text-center py-4">Loading dashboard data...</div>}
      {error && <div className="text-red-500 py-4">Error loading dashboard: {error.message}</div>}

      {data && (
        <>
          {/* Job Post Header Section */}
          <div className="bg-[#C1CFA1] p-4 sm:p-6 rounded-lg mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
              <h1 className="text-xl sm:text-3xl font-bold text-[#015551] mb-2 sm:mb-4 break-words text-center sm:text-left">
                {data.data.title}
              </h1>
              <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row">
                <button
                  onClick={handleRefreshDashboard}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-[#C1CFA1] text-[#015551] border border-[#015551] rounded-lg hover:bg-[#b2c18a] transition-all cursor-pointer text-base"
                >
                  Refresh
                </button>
                <button
                  onClick={() => setIsDeletePostModalOpen(true)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-all cursor-pointer text-base"
                >
                  Delete Post
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3 mt-2">
              {data.data.skills && JSON.parse(data.data.skills).map((skill, index) => (
                <div
                  key={index}
                  className="bg-[#015551] px-2 py-1 rounded-full text-white text-xs sm:text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
            <span className="block text-gray-600 text-xs sm:text-sm text-center sm:text-left">
              Posted: {new Date(data.data.created_at).toLocaleDateString()}
              {data.data.city ? ` / ${data.data.city}` : ''}
            </span>
          </div>

          {/* Metrics Display Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 overflow-x-auto">
            <div className="bg-white p-6 rounded-lg shadow min-w-[200px]">
              <h3 className="text-gray-500 text-sm font-medium">Total Applicants</h3>
              <p className="text-3xl font-bold text-[#015551]">{data.data.applies.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow min-w-[200px]">
              <h3 className="text-gray-500 text-sm font-medium">&gt; 7.5 AI Score</h3>
              <p className="text-3xl font-bold text-[#015551]">
                {data.data.applies.filter(app => app.detail.ai_score > 7.5).length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow min-w-[200px]">
              <h3 className="text-gray-500 text-sm font-medium">&gt; 60% Skill Match</h3>
              <p className="text-3xl font-bold text-[#015551]">
                {data.data.applies.filter(app => app.detail.skills_match > 0.6).length}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Delete Post Confirmation Modal */}
      <Modal
        isOpen={isDeletePostModalOpen}
        onClose={handleDeletePostCancel}
        onConfirm={handleDeletePostConfirm}
      >
        <p>Are you sure you want to delete this job post? This action cannot be undone.</p>
      </Modal>

      {data && data.data.applies && (
        <>
          {/* Filters Input Section */}
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
            <button
              onClick={handleFilter}
              className="bg-[#015551] text-white px-6 py-2 rounded-lg hover:bg-[#01403d] transition-all hover:cursor-pointer"
            >
              Sort & Filter
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer select-none"
                      onClick={() => handleSort('skills_match')}
                      title="Sort by Skills Match"
                    >
                      Skills Match
                      {renderSortArrow('skills_match')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer select-none"
                      onClick={() => handleSort('ai_score')}
                      title="Sort by AI Score"
                    >
                      AI Score
                      {renderSortArrow('ai_score')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer select-none"
                      onClick={() => handleSort('experience')}
                      title="Sort by Experience"
                    >
                      Experience
                      {renderSortArrow('experience')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">{applicant.name}</td>
                        <td className="px-6 py-4">{(applicant.detail.skills_match * 100).toFixed(0)}%</td>
                        <td className="px-6 py-4">
                          <span className={`${getScoreColor(applicant.detail.ai_score)} text-white px-3 py-1 rounded-full text-sm`}>
                            {applicant.detail.ai_score.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">{applicant.detail.experience} years</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <button
                            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                            onClick={() => window.open(`${import.meta.env.VITE_API}/storage/${applicant['resume-path']}`, '_blank')}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                            onClick={() => handleInterviewClick(applicant)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </button>
                          <button
                            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                            onClick={() => handleMarkAsFavourite(applicant.id)}
                          >
                            <svg
                              className="w-5 h-5"
                              fill={applicant.is_favorite ? 'yellow' : 'none'}
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          </button>
                          <button
                            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                            onClick={() => handleDeleteClick(applicant.id)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        {data.data.applies.length === 0 ? 'No applicants yet' : 'No applicants match your filters'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Language Selection Modal (only shown if interview = null or empty) */}
      <LanguageSelectionModal
        isOpen={isLanguageModalOpen}
        onClose={handleCloseLanguageModal}
        onGenerate={handleGenerateInterview}
        isLoading={isGeneratingInterview}
        onLoadingFinish={handleLoadingFinish}
      />

      {/* Interview Response Modal (only shown if interview != null and not empty) */}
      <InterviewResponseModal
        isOpen={isResponseModalOpen}
        onClose={handleCloseResponseModal}
        onRegenerate={handleRegenerateInterview}
        interview={selectedApplicantForInterview?.detail?.interview || { questions: [] }}
      />

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      >
        <p>Are you sure you want to delete this application?</p>
      </Modal>
    </div>
  );
}

export default Dashboard;