import { useState } from 'react';
import { Search, X } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import Badge from './ui/Badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6 transition-all duration-200">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Bar */}
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

        {/* Category Filter */}
        <div className="w-full lg:w-64">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Danh mục</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Severity Filter */}
        <div className="w-full lg:w-64">
          <Select value={selectedSeverity} onValueChange={handleSeverityChange}>
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Chọn mức độ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Mức độ nghiêm trọng</SelectLabel>
                {severityLevels.map((severity) => (
                  <SelectItem key={severity} value={severity}>
                    {severity}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex items-center space-x-2 h-10 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
            <span>Xóa bộ lọc</span>
          </Button>
        )}
      </div>

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