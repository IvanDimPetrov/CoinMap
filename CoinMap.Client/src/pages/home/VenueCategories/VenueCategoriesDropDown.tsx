import React from 'react';
import './VenueCategoriesDropDown.css';
import { VenueCategory } from '../../../types/VenueCategory';

// interface Category {
//   id: number;
//   name: string;
// }

interface CategoriesDropdownProps {
  categories: VenueCategory[];
  onCategorySelect: (selectedCategory: VenueCategory) => void;
}

const VenueCategoriesDropDown: React.FC<CategoriesDropdownProps> = ({ categories, onCategorySelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedCategory = categories.find((cat) => cat.id === selectedId);
    if (selectedCategory) {
      onCategorySelect(selectedCategory);
    }
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="categoryDropdown" className="dropdown-label">
        Select a Venue Category:
      </label>
      <select id="categoryDropdown" className="dropdown-select" onChange={handleChange}>
        <option value="">-- Select a Category --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VenueCategoriesDropDown;
