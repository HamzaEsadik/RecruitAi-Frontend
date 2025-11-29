import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetPostByShare } from '../post/services/postServices';
import ShareableLink from '../../components/common/ShareableLink/ShareableLink';

// Component to display links after a job post is created
function Links() {
  const location = useLocation();
  const { share } = useParams(); // Extract the share parameter from URL
  // State variables for post data and loading status
  const [postData, setPostData] = useState(null);
  const { data, error, getPost } = useGetPostByShare(share);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a local loading state
  
  // Effect to fetch post data based on location state or share parameter
  useEffect(() => {
    // If location state exists, use it
    if (location.state) {
      setPostData(location.state);
      setIsLoading(false); // Update local loading state
      setFetchAttempted(true);
    } else if (share && !fetchAttempted) {
      // Otherwise, fetch data using the share parameter
      setFetchAttempted(true);
      setIsLoading(true); // Set loading to true before fetch
      getPost().then(response => {
        if (response && response.data) {
          setPostData(response.data);
        }
        setIsLoading(false); // Update local loading state after fetch
      }).catch(err => {
        console.error('Error fetching data:', err);
        setIsLoading(false); // Update local loading state on error
      });
    }
  }, [location, share, fetchAttempted]); // Removed getPost from dependencies

  // Effect to set post data if available from the hook
  useEffect(() => {
    if (data && !postData) {
      setPostData(data);
      setIsLoading(false);
    }
  }, [data, postData]);

  // Skeleton loading component for a better user experience
  const Skeleton = () => (
    <div className="max-w-[1000px] mx-auto p-6">
      <div className="h-10 w-3/4 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded-md mb-8 animate-pulse"></div>
      
      <div className="space-y-8">
        <div>
          <div className="h-6 w-1/3 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        <div>
          <div className="h-6 w-1/3 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        <div>
          <div className="h-6 w-1/3 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  // Conditional rendering: Show skeleton if loading, error, or no data
  if (isLoading || error || !postData) {
    return <Skeleton />;
  }

  // Extract necessary values from postData
  const accessToken = postData.access_token || '';
  const shareId = postData.share || '';
  const dashboardId = postData.dashboard || '';
  
  // Format URLs for sharing and dashboard access
  const appUrl = window.location.origin; // Get the base URL of the application
  const shareLink = `${appUrl}/apply/${shareId}`;
  const dashboardLink = `${appUrl}/dashboard/${dashboardId}`;

  // JSX for the Links component display
  return (
    <div className="max-w-[1000px] mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#015551]">Job Created Successfully!</h1>
      <p className="text-sm text-gray-500 mb-8">
        Make sure to save this token along with the URLs in a secure location
      </p>
      <div className="space-y-8">
        <div>
          <ShareableLink
            url={shareLink}
            label="Share this Job"
            showOpenButton
          />
        </div>

        <div>
          <ShareableLink
            url={dashboardLink}
            label="View Analytics"
            showOpenButton
          />
        </div>

        <div>
          <ShareableLink
            url={accessToken}
            label="Access Token"
            showOpenButton={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Links;