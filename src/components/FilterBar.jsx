import { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import Badge from './ui/Badge';

const FilterBar = ({ 
  onSearch, 
  onCategoryFilter, 
  onSeverityFilter, 
  categories = [], 
  severityLevels = [],
  searchPlaceholder = "Tìm kiếm vụ án..."
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedSeverity, setSelectedSeverity] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryFilter(category);
  };

  const handleSeverityChange = (severity) => {
    setSelectedSeverity(severity);
    onSeverityFilter(severity);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedSeverity('Tất cả');
    onSearch('');
    onCategoryFilter('Tất cả');
    onSeverityFilter('Tất cả');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'Tất cả' || selectedSeverity !== 'Tất cả';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            icon={<Search className="h-4 w-4 text-gray-400" />}
            className="w-full"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Bộ lọc</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Danh mục
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200 bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mức độ nghiêm trọng
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => handleSeverityChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200 bg-white"
              >
                {severityLevels.map((severity) => (
                  <option key={severity} value={severity}>
                    {severity}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4" />
                <span>Xóa bộ lọc</span>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="border-t border-gray-200 pt-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Bộ lọc đang áp dụng:</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Xóa tất cả
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="primary" className="flex items-center space-x-1">
                <Search className="h-3 w-3" />
                <span>Tìm kiếm: "{searchTerm}"</span>
              </Badge>
            )}
            {selectedCategory !== 'Tất cả' && (
              <Badge variant="info" className="flex items-center space-x-1">
                <span>Danh mục: {selectedCategory}</span>
              </Badge>
            )}
            {selectedSeverity !== 'Tất cả' && (
              <Badge variant="warning" className="flex items-center space-x-1">
                <span>Mức độ: {selectedSeverity}</span>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
