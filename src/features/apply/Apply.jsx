import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByShare } from '../post/services/postServices';
import { useSubmitApplication } from '../apply/services/applyServices';
import FormField from '../../components/common/FormField/FormField';
import FileUploader from '../../components/common/FileUploader/FileUploader';
import Badge from '../../components/common/Badge/Badge';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';

// Component for submitting a job application
function Apply() {
  const { share } = useParams();
  // State variables for form inputs, file upload, and messages
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Hooks for fetching post data and submitting application
  const { data: postData, loading: postLoading, getPost } = useGetPostByShare(share);
  const { loading: submitLoading, error: submitError, submitApplication } = useSubmitApplication();

  // Effect to fetch post details when the component mounts or 'share' changes
  useEffect(() => {
    if (share) {
      getPost();
    }
  }, [share]);

  // Ensures only numbers are entered in the phone input
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Simple email regex
    return /^[\s\S]+@[\s\S]+\.[\s\S]+$/.test(email);
  };

  // Helper function to validate phone number format
  const isValidPhone = (phone) => {
    return /^\d{7,15}$/.test(phone);
  };

  // Handles form submission for the application
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation checks
    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate phone (only numbers, at least 7 digits)
    if (!isValidPhone(phone)) {
      setError('Please enter a valid phone number (numbers only, at least 7 digits).');
      return;
    }

    // Validate resume
    if (!resume || resume.size > 2 * 1024 * 1024) {
      setError('Please upload a valid resume (max 2MB)');
      return;
    }

    setError('');

    // Prepare form data for API submission
    const formData = new FormData();
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('resume', resume);
    formData.append('post_id', postData?.id);

    try {
      const response = await submitApplication(formData);
      if (response) {
        // Handle successful submission
        setSuccessMessage('Application submitted successfully!');
        setFullName('');
        setEmail('');
        setPhone('');
        setResume(null);
      }
    } catch (err) {
      console.error('Failed to submit application. Please try again.:', err);
    }
  };

  // JSX for the Apply component form and job details display
  return (
    <div className="max-w-[1000px] mx-auto p-6">
      <div className="space-y-6">
        {postLoading ? (
          <div>Loading job details...</div>
        ) : postData ? (
          <div className="bg-[#C1CFA1] p-6 rounded-lg mb-8">
            <h1 className="text-3xl font-bold text-[#015551] mb-4">{postData.title}</h1>
            <p className="text-[#015551] mb-4">{postData.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {postData.skills && JSON.parse(postData.skills).map((skill, index) => (
                <Badge
                  key={index}
                  text={skill}
                  color="#015551"
                  className="text-white text-sm"
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm">Posted: {new Date(postData.created_at).toLocaleDateString()}</span>
          </div>
        ) : (
          <div className="bg-[#C1CFA1] p-6 rounded-lg mb-8">
            <h1 className="text-3xl font-bold text-[#015551] mb-4">Senior Software Engineer</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge text="JavaScript" color="#015551" className="text-white text-sm" />
              <Badge text="React" color="#015551" className="text-white text-sm" />
              <Badge text="Node.js" color="#015551" className="text-white text-sm" />
              <Badge text="AWS" color="#015551" className="text-white text-sm" />
            </div>
            <span className="text-gray-600 text-sm">Posted: 2023-10-15</span>
          </div>
        )}

        <h2 className="text-2xl font-bold text-[#015551] mb-4">Submit Your Application</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
                placeholder="Enter your phone number"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
                minLength={7}
              />
            </div>
          </div>

          <FileUploader
            file={resume}
            onChange={setResume}
            acceptedTypes={['.pdf', '.doc', '.docx']}
            maxSizeMB={2}
            label="Resume"
          />

          <button
            type="submit"
            disabled={submitLoading}
            className="w-full bg-[#015551] text-white py-3 px-6 rounded-lg hover:bg-[#01403d] hover:cursor-pointer transition-all font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitLoading ? 'Submitting...' : 'Submit Application'}
          </button>

          {error && (
            <ErrorMessage message={error} type="error" />
          )}

          {successMessage && (
            <p className="text-green-600 text-sm mt-2 text-center font-medium">
              {successMessage}
            </p>
          )}

          {submitError && (
            <ErrorMessage
              message={submitError.message || 'Failed to submit application'}
              type="error"
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Apply;