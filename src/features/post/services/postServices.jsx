
import useAxios from '../../../hooks/useAxios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * @typedef {Object} AxiosHookReturn
 * @property {any} data - The response data from the API call.
 * @property {any} error - The error object if the API call fails.
 * @property {boolean} loading - A boolean indicating if the API call is in progress.
 */

/**
 * Hook to create a new job post.
 * @returns {AxiosHookReturn & { createPost: (postData: Object) => Promise<any> }}
 */
export const useCreatePost = () => {
  const { data, error, loading, sendRequest } = useAxios({
    baseURL: API_URL,
    url: '/posts',
    method: 'POST',
  });

  /**
   * Creates a new job post.
   * @param {Object} postData - The data for the new post.
   * @returns {Promise<any>} The response from the API.
   */
  const createPost = async (postData) => {
    return sendRequest({ data: postData });
  };

  return { data, error, loading, createPost };
};

/**
 * Hook to get a post by its share link.
 * @param {string} share - The share identifier of the post.
 * @returns {AxiosHookReturn & { getPost: () => Promise<any> }}
 */
export const useGetPostByShare = (share) => {
  // `share` is a parameter for the hook, not the request itself initially.
  // The actual request is triggered by calling getPost.
  const { data, error, loading, sendRequest } = useAxios({
    baseURL: API_URL,
    method: 'GET',
    // The URL will be set dynamically in the getPost function
  });

  /**
   * Fetches the post using the share link provided to the hook.
   * @returns {Promise<any>} The response from the API.
   */
  const getPost = async () => {
    if (!share) {
      // Handle case where share link is not provided, though TypeScript/PropTypes would help here.
      console.error('Share link is required to get a post.');
      return Promise.reject(new Error('Share link not provided.'));
    }
    return sendRequest({ url: `/share/${share}` });
  };

  return { data, error, loading, getPost };
};

/**
 * Hook to get dashboard data with an access token.
 * @param {string} dashboardId - The ID of the dashboard.
 * @param {string} accessToken - The access token for authorization.
 * @returns {AxiosHookReturn & { getDashboard: () => Promise<any> }}
 */
export const useGetDashboard = (dashboardId, accessToken) => {
  const { data, error, loading, sendRequest } = useAxios({
    baseURL: API_URL,
    method: 'GET',
    // URL and params will be set dynamically or can be pre-configured if they don't change per call
  });

  /**
   * Fetches the dashboard data.
   * @returns {Promise<any>} The response from the API.
   */
  const getDashboard = async () => {
    if (!dashboardId || !accessToken) {
      console.error('Dashboard ID and Access Token are required.');
      return Promise.reject(new Error('Dashboard ID or Access Token not provided.'));
    }
    return sendRequest({
      url: `/dashboard/${dashboardId}`,
      params: { access_token: accessToken },
    });
  };

  return { data, error, loading, getDashboard };
};

/**
 * Hook to delete a post with an access token.
 * @returns {AxiosHookReturn & { deletePost: (dashboardId: string, accessToken: string) => Promise<any> }}
 */
export const useDeletePost = () => {
  const { data, error, loading, sendRequest } = useAxios({
    baseURL: API_URL,
    method: 'DELETE',
  });

  /**
   * Deletes a post.
   * @param {string} dashboardId - The ID of the dashboard/post to delete.
   * @param {string} accessToken - The access token for authorization.
   * @returns {Promise<any>} The response from the API.
   */
  const deletePost = async (dashboardId, accessToken) => {
    if (!dashboardId || !accessToken) {
      console.error('Dashboard ID and Access Token are required for deletion.');
      return Promise.reject(new Error('Dashboard ID or Access Token not provided for deletion.'));
    }
    return sendRequest({
      url: `/dashboard/${dashboardId}`, // Assuming this is the correct endpoint for deleting a post
      params: { access_token: accessToken },
    });
  };

  return { data, error, loading, deletePost };
};