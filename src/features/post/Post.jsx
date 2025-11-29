import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../post/services/postServices';
import FormField from '../../components/common/FormField/FormField';
import SkillsInput from '../../components/common/SkillsInput/SkillsInput';
import Tooltip from '../../components/common/Tooltip/Tooltip';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';

// Component for creating a new job post
function Post() {
  const navigate = useNavigate();
  // State variables for form inputs and UI
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [city, setCity] = useState('');
  const [minExperience, setMinExperience] = useState(0);

  // API integration hook for creating a post
  const { loading, error, createPost } = useCreatePost();

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
          <FormField
            label="API key"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your token"
            required
            tooltip={
              <Tooltip
                content={
                  <>
                    To get your API token, visit{' '}
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      https://aistudio.google.com/apikey
                    </a>
                    .<br /><br />
                    Sign in with your Google account, then click on create api key, then copy your API key from the page and paste it here.
                  </>
                }
                position="bottom"
              />
            }
          />

          <FormField
            label="Job Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter job title"
            required
          />

          <FormField
            label="Job Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter job description"
            required
            rows={6}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-2">Required Skills</label>
            <SkillsInput
              skills={skills}
              onChange={setSkills}
              placeholder="Type skill and press Enter"
              maxSkills={20}
            />
          </div>

          <FormField
            label="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />

          <FormField
            label="Minimum Experience"
            type="number"
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
            placeholder="Years of experience"
            min={0}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#015551] text-white py-3 px-6 rounded-lg hover:bg-[#01403d] hover:cursor-pointer transition-all font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Job Post'}
          </button>

          {error && (
            <ErrorMessage
              message={error.message || 'Failed to create job post'}
              type="error"
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Post;