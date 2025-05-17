import React, { useState } from 'react';

function Apply() {
  const [resume, setResume] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
        setError('File size must be less than 2MB');
        setResume(null);
        setIsUploaded(false);
      } else {
        setResume(file);
        setIsUploaded(true);
        setError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resume) {
      if (resume.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      // Here you would typically send the resume to your backend
      console.log('Submitting resume:', resume);
      alert('Application submitted successfully!');
    } else {
      alert('Please upload your resume before submitting.');
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6">
      <div className="space-y-6">
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

        <h2 className="text-2xl font-bold text-[#015551] mb-4">Submit Your Application</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Resume</label>
            <div className="relative border-2 border-dashed rounded-lg p-6 h-48 flex flex-col items-center justify-center">
              {isUploaded ? (
                <div className="text-[#015551] font-medium">
                  ✓ {resume.name} uploaded successfully
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <p className="text-gray-600">Drag & drop your resume here or click to upload</p>
                  <p className="text-sm text-gray-500 mt-1">(PDF, DOC, DOCX, max 2MB)</p>
                </>
              )}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#015551] text-white py-3 px-6 rounded-lg hover:bg-[#01403d] hover:cursor-pointer transition-all font-medium"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default Apply;