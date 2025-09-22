import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CaseCard from '../components/CaseCard';
import FilterBar from '../components/FilterBar';
import ScrollRevealSection from '../components/ScrollRevealSection';
import { corruptionCases, categories, severityLevels } from '../data/corruptionCases';
import { AlertTriangle, Search } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

const CasesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedSeverity, setSelectedSeverity] = useState('Tất cả');

  const filteredCases = useMemo(() => {
    return corruptionCases.filter(caseData => {
      const matchesSearch = caseData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           caseData.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tất cả' || caseData.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'Tất cả' || caseData.severity === selectedSeverity;
      
      return matchesSearch && matchesCategory && matchesSeverity;
    });
  }, [searchTerm, selectedCategory, selectedSeverity]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleSeverityFilter = (severity) => {
    setSelectedSeverity(severity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <Container className="py-16">
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Các vụ án tham nhũng
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Tổng hợp các vụ án tham nhũng đã được xử lý và đang trong quá trình điều tra. 
                Thông tin được cập nhật liên tục để đảm bảo tính minh bạch.
              </p>
            </div>
          </ScrollRevealSection>
        </Container>
      </div>

      {/* Filter and Search */}
      <Container className="py-8">
        <FilterBar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          onSeverityFilter={handleSeverityFilter}
          categories={categories}
          severityLevels={severityLevels}
          searchPlaceholder="Tìm kiếm vụ án tham nhũng..."
        />
      </Container>

      {/* Results */}
      <Container className="pb-20">
        {filteredCases.length > 0 ? (
          <>
            <ScrollRevealSection direction="up" delay={0.2}>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  Kết quả tìm kiếm ({filteredCases.length} vụ án)
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Thông tin được cập nhật thường xuyên</span>
                </div>
              </div>
            </ScrollRevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseData, index) => (
                <ScrollRevealSection key={caseData.id} direction="up" delay={0.1 * index}>
                  <CaseCard case={caseData} />
                </ScrollRevealSection>
              ))}
            </div>
          </>
        ) : (
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center py-24">
              <Search className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Không tìm thấy vụ án nào
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Không có vụ án nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tất cả');
                  setSelectedSeverity('Tất cả');
                }}
                size="lg"
              >
                Xóa bộ lọc
              </Button>
            </div>
          </ScrollRevealSection>
        )}
      </Container>

      {/* Call to Action */}
      <div className="bg-red-600 text-white py-20">
        <Container className="text-center">
          <ScrollRevealSection direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bạn có thông tin về vụ án tham nhũng?
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
              Hãy liên hệ với cơ quan chức năng để báo cáo các hành vi tham nhũng
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                as="a"
                href="https://thanhtra.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="xl"
                className="bg-white text-red-600 hover:bg-gray-100"
              >
                Báo cáo với Thanh tra Chính phủ
              </Button>
              <Button
                as="a"
                href="https://bocongan.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="xl"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600"
              >
                Liên hệ Bộ Công an
              </Button>
            </div>
          </ScrollRevealSection>
        </Container>
      </div>
    </div>
  );
};

export default CasesPage;
