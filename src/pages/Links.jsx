import React from 'react';

function Links() {
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  const shareLink = 'https://recruteai.com/apply/12345633';
  const dashboardLink = 'https://recruteai.com/dashboard/239252';

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#015551]">Job Created Successfully!</h1>
      <p className="text-sm text-gray-500 mb-8">
        Make sure to save this token along with the URLs in a secure location
      </p>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-[#015551] mb-4">Share this Job</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="w-full px-4 py-2 bg-gray-200 rounded-l-lg focus:ring-2 focus:ring-[#015551] transition-all"
            />
            <button
              onClick={() => handleCopyLink(shareLink)}
              className="bg-[#015551] text-white px-4 py-2 rounded-r-lg hover:bg-[#01403d] transition-all hover:cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#015551] mb-4">View Analytics</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={dashboardLink}
              readOnly
              className="w-full px-4 py-2 bg-gray-200 rounded-l-lg focus:ring-2 focus:ring-[#015551] transition-all"
            />
            <button
              onClick={() => handleCopyLink(dashboardLink)}
              className="bg-[#015551] text-white px-4 py-2 rounded-r-lg hover:bg-[#01403d] transition-all hover:cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#015551] mb-4">Access Token</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={accessToken}
              readOnly
              className="w-full px-4 py-2 bg-gray-200 rounded-l-lg focus:ring-2 focus:ring-[#015551] transition-all"
            />
            <button
              onClick={() => handleCopyLink(dashboardLink)}
              className="bg-[#015551] text-white px-4 py-2 rounded-r-lg hover:bg-[#01403d] transition-all hover:cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;