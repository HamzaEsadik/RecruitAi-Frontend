import React, { useState } from 'react';
import Badge from '../Badge/Badge';

/**
 * SkillsInput Component
 * Input field for adding/removing skills with tag display
 * 
 * @param {Array} skills - Array of skill strings
 * @param {function} onChange - Callback when skills change
 * @param {string} placeholder - Input placeholder text
 * @param {number} maxSkills - Maximum number of skills allowed
 * @param {string} className - Additional classes
 */
function SkillsInput({ 
  skills = [], 
  onChange, 
  placeholder = 'Type skill and press Enter',
  maxSkills = 20,
  className = '' 
}) {
  const [currentSkill, setCurrentSkill] = useState('');

  // Handle Enter key to add skill
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      
      // Check if skill already exists
      if (skills.includes(currentSkill.trim())) {
        alert('This skill has already been added');
        return;
      }

      // Check max skills limit
      if (skills.length >= maxSkills) {
        alert(`Maximum ${maxSkills} skills allowed`);
        return;
      }

      onChange([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  // Remove skill by index
  const removeSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div className={className}>
      {/* Display existing skills as badges */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              text={skill}
              variant="skill"
              onRemove={() => removeSkill(index)}
            />
          ))}
        </div>
      )}
      
      <input
        type="text"
        value={currentSkill}
        onChange={(e) => setCurrentSkill(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#015551] focus:border-[#015551] transition-all bg-gray-50"
        placeholder={placeholder}
      />
      
      {/* Show skill count */}
      {skills.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          {skills.length} / {maxSkills} skills added
        </p>
      )}
    </div>
  );
}

export default SkillsInput;
