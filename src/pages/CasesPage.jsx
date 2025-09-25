import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CaseCard from '../components/CaseCard';
import FilterBar from '../components/FilterBar';
import ScrollRevealSection from '../components/ScrollRevealSection';
import { corruptionCases, categories, severityLevels } from '../data/corruptionCases';
import { AlertTriangle, Search } from 'lucide-react';
import Container from '../components/ui/Container';

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

    <div className="min-h-screen" style={{ backgroundColor: "silver" }} >

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200" style={{ backgroundColor: "#rgb(215, 215, 215)" }}>
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
              <div className="mb-12">
                <h2 className="text-xl font-bold text-gray-900">
                  Kết quả tìm kiếm ({filteredCases.length} vụ án)
                </h2>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <AlertTriangle className="h-4 w-4 mr-1" />
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
            </div>
          </ScrollRevealSection>
        )}
      </Container>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-red-600 via-red-600 to-red-700 text-white py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <Container className="text-center relative z-8">
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Bạn có thông tin về vụ án tham nhũng?
              </h2>
              <p className="text-xl md:text-2xl mb-16 opacity-95 font-medium leading-relaxed">
                Hãy liên hệ với cơ quan chức năng để báo cáo các hành vi tham nhũng
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-3xl mx-auto">
                <a
                  href="https://thanhtra.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-red-600 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-red-100 min-w-[280px]"
                >
                  <span>Báo cáo với Thanh tra Chính phủ</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                
                <a
                  href="https://bocongan.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-xl hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[280px]"
                >
                  <span>Liên hệ Bộ Công an</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              <div className="mt-12 text-sm opacity-80">
                <p>Thông tin của bạn sẽ được bảo mật tuyệt đối</p>
              </div>
            </div>
          </ScrollRevealSection>
        </Container>
      </div>
    </div>
  );
};

export default CasesPage;