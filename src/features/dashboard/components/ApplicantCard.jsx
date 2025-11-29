import { memo } from 'react';
import { FiEye, FiPhone, FiStar, FiTrash2 } from 'react-icons/fi';

/**
 * ApplicantCard Component
 * Displays applicant information in a card format for the dashboard
 * Memoized for performance optimization
 * 
 * @param {Object} applicant - Applicant data object
 * @param {function} onViewResume - Handler for viewing resume
 * @param {function} onInterview - Handler for interview actions
 * @param {function} onToggleFavorite - Handler for toggling favorite status
 * @param {function} onDelete - Handler for deleting applicant
 * @param {string} className - Additional classes
 */
const ApplicantCard = memo(function ApplicantCard({
  applicant,
  onViewResume,
  onInterview,
  onToggleFavorite,
  onDelete,
  className = '',
}) {
  // Determine badge color based on AI score
  const getScoreColor = (score) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Determine text color based on skill match percentage
  const getSkillMatchColor = (match) => {
    if (match >= 0.7) return 'text-green-600';
    if (match >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {applicant.name}
          </h3>
          <p className="text-sm text-gray-600">{applicant.email}</p>
          {applicant.phone && (
            <p className="text-sm text-gray-600">{applicant.phone}</p>
          )}
        </div>
        
        {applicant.is_favorite && (
          <FiStar className="text-yellow-500 fill-yellow-500" size={24} />
        )}
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Skills Match</p>
          <p className={`text-lg font-bold ${getSkillMatchColor(applicant.detail.skills_match)}`}>
            {(applicant.detail.skills_match * 100).toFixed(0)}%
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">AI Score</p>
          <span className={`${getScoreColor(applicant.detail.ai_score)} text-white px-3 py-1 rounded-full text-sm font-semibold inline-block`}>
            {applicant.detail.ai_score.toFixed(1)}
          </span>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Experience</p>
          <p className="text-lg font-bold text-gray-700">
            {applicant.detail.experience}y
          </p>
        </div>
      </div>

      {/* Skills Section */}
      {applicant.detail.skills && applicant.detail.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {applicant.detail.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="bg-[#C1CFA1] text-gray-800 px-2 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
            {applicant.detail.skills.length > 5 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{applicant.detail.skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* AI Summary Section */}
      {applicant.detail.ai_summary && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-700 line-clamp-3">
            {applicant.detail.ai_summary}
          </p>
        </div>
      )}

      {/* Actions Section */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={onViewResume}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#015551] text-white rounded-lg hover:bg-[#01403d] transition-colors text-sm"
          title="View Resume"
        >
          <FiEye size={16} />
          <span className="hidden sm:inline">Resume</span>
        </button>
        
        <button
          onClick={onInterview}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          title="Interview"
        >
          <FiPhone size={16} />
          <span className="hidden sm:inline">Interview</span>
        </button>
        
        <button
          onClick={onToggleFavorite}
          className={`px-3 py-2 rounded-lg transition-colors ${
            applicant.is_favorite
              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={applicant.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiStar size={16} className={applicant.is_favorite ? 'fill-current' : ''} />
        </button>
        
        <button
          onClick={onDelete}
          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          title="Delete Applicant"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
});

export default ApplicantCard;
