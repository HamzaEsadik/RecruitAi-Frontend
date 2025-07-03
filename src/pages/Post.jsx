import React, { useState, useRef, useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../services/postServices';

// Component for creating a new job post
function Post() {
  const navigate = useNavigate();
  // State variables for form inputs and UI
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [city, setCity] = useState('');
  const [minExperience, setMinExperience] = useState(0);
  const [showTokenTooltip, setShowTokenTooltip] = useState(false);

  // API integration hook for creating a post
  const { loading, error, createPost } = useCreatePost();

  // Handles adding a skill when Enter is pressed
  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault(); // Prevent form submission
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  // Removes a skill from the list
  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Handles form submission to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare post data for API submission
    const postData = {
      token,
      title,
      description,
      skills: JSON.stringify(skills),
      city,
      min_experience: minExperience
    };

    try {
      const response = await createPost(postData);
      if (response) {
        // Navigate to links page with the share parameter in the URL
        navigate(`/links/${response.data.share}`);
      }
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  // JSX for the Post component form
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#015551] mb-2">Create New Post</h1>
        <p className="text-gray-600 mb-6">
          Fill out the form below to create a new job posting. Make sure to provide accurate and detailed information.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center gap-2">
              API key
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
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter your token"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              rows="6"
              placeholder="Enter job description"
              required
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter city"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Minimum Experience</label>
              <input
                type="number"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                min="0"
                placeholder="Years of experience"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#015551] text-white py-3 px-6 rounded-lg hover:bg-[#01403d] hover:cursor-pointer transition-all font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Job Post'}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              Error: {error.message || 'Failed to create job post'}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Post;