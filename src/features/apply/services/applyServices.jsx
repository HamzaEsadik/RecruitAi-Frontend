import useAxios from '../../../hooks/useAxios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * @typedef {Object} AxiosHookReturn
 * @property {any} data - The response data from the API call.
 * @property {any} error - The error object if the API call fails.
 * @property {boolean} loading - A boolean indicating if the API call is in progress.
 */

/**
 * Hook to submit a job application.
 * @returns {AxiosHookReturn & { submitApplication: (formData: FormData | Object) => Promise<any> }}
 */
export const useSubmitApplication = () => {
  const { data, error, loading, sendRequest } = useAxios({
    baseURL: API_URL,
    url: '/applies',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  /**
   * Submits the application data.
   * @param {FormData | Object} formData - The application data. Can be a FormData object or a plain object.
   * @returns {Promise<any>} The response from the API.
   */
  const submitApplication = async (formData) => {
    let applicationData = formData;
    if (!(formData instanceof FormData)) {
      applicationData = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        applicationData.append(key, value);
      }
    }
    return sendRequest({ data: applicationData });
  };

  return { data, error, loading, submitApplication };
};

/**
 * Hook to request an AI interview for an application.
 * @returns {AxiosHookReturn & { requestInterview: (applyId: string, language?: string) => Promise<any> }}
 */
export const useRequestInterview = () => {
  const { data, error, loading, sendRequest } = useAxios({
    baseURL: API_URL,
    method: 'POST',
  });

  /**
   * Requests an AI interview.
   * @param {string} applyId - The ID of the application.
   * @param {string} [language] - Optional language code for the interview.
   * @returns {Promise<any>} The response from the API.
   */
  const requestInterview = async (applyId, language = null) => {
    const url = language
      ? `/interview/${applyId}/${language}`
      : `/interview/${applyId}`;
    return sendRequest({ url });
  };

  return { data, error, loading, requestInterview };
};

/**
 * Hook to delete an application.
 * @returns {AxiosHookReturn & { deleteApplication: (applyId: string) => Promise<any> }}
 */
export const useDeleteApplication = () => {
  const { data, error, loading, sendRequest } = useAxios({
    baseURL: API_URL,
    method: 'DELETE',
  });

  /**
   * Deletes an application.
   * @param {string} applyId - The ID of the application to delete.
   * @returns {Promise<any>} The response from the API.
   */
  const deleteApplication = async (applyId) => {
    return sendRequest({ url: `/applies/${applyId}` });
  };

  return { data, error, loading, deleteApplication };
};

/**
 * Hook to mark an application as a favourite.
 * @returns {AxiosHookReturn & { markAsFavourite: (applyId: string) => Promise<any> }}
 */
export const useMarkAsFavourite = () => {
  const { data, error, loading, sendRequest } = useAxios({
    baseURL: API_URL,
    method: 'PUT',
  });

  /**
   * Marks an application as favourite.
   * @param {string} applyId - The ID of the application to mark as favourite.
   * @returns {Promise<any>} The response from the API.
   */
  const markAsFavourite = async (applyId) => {
    return sendRequest({ url: `/applies/${applyId}` }); // Assuming the body might be empty or handled by backend
  };

  return { data, error, loading, markAsFavourite };
};
