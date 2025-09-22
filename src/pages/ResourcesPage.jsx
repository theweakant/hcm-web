import { useState, useMemo } from 'react';
import ScrollRevealSection from '../components/ScrollRevealSection';
import ResourceList from '../components/ResourceList';
import FilterBar from '../components/FilterBar';
import { resources, resourceTypes } from '../data/resources';
import { BookOpen, ExternalLink, Search } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tất cả');

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'Tất cả' || resource.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  const handleSeverityFilter = () => {
    // Not used in resources page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <Container className="py-16">
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Tài liệu và nguồn tham khảo
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Tổng hợp các tài liệu, văn bản pháp luật, và nguồn thông tin chính thức 
                về phòng, chống tham nhũng tại Việt Nam.
              </p>
            </div>
          </ScrollRevealSection>
        </Container>
      </div>

      {/* Filter and Search */}
      <Container className="py-8">
        <FilterBar
          onSearch={handleSearch}
          onCategoryFilter={handleTypeFilter}
          onSeverityFilter={handleSeverityFilter}
          categories={resourceTypes}
          severityLevels={[]}
          searchPlaceholder="Tìm kiếm tài liệu..."
        />
      </Container>

      {/* Resources Grid */}
      <Container className="pb-20">
        {filteredResources.length > 0 ? (
          <>
            <ScrollRevealSection direction="up" delay={0.2}>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  Kết quả tìm kiếm ({filteredResources.length} tài liệu)
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <BookOpen className="h-5 w-5" />
                  <span>Tài liệu được cập nhật thường xuyên</span>
                </div>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection direction="up" delay={0.4}>
              <ResourceList resources={filteredResources} />
            </ScrollRevealSection>
          </>
        ) : (
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center py-24">
              <Search className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Không tìm thấy tài liệu nào
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Không có tài liệu nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('Tất cả');
                }}
                size="lg"
              >
                Xóa bộ lọc
              </Button>
            </div>
          </ScrollRevealSection>
        )}
      </Container>

      {/* Additional Resources Section */}
      <div className="bg-white py-20">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tài nguyên bổ sung
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Các liên kết hữu ích khác để tìm hiểu về chống tham nhũng
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollRevealSection direction="up" delay={0.3}>
              <Card hover className="group">
                <CardContent padding="lg">
                  <CardTitle className="text-xl mb-4">
                    Luật pháp Việt Nam
                  </CardTitle>
                  <CardDescription className="mb-6">
                    Các văn bản pháp luật về chống tham nhũng
                  </CardDescription>
                  <Button
                    as="a"
                    href="https://thuvienphapluat.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <span>Truy cập thư viện pháp luật</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </ScrollRevealSection>

            <ScrollRevealSection direction="up" delay={0.4}>
              <Card hover className="group">
                <CardContent padding="lg">
                  <CardTitle className="text-xl mb-4">
                    Tổ chức quốc tế
                  </CardTitle>
                  <CardDescription className="mb-6">
                    Các tổ chức quốc tế về chống tham nhũng
                  </CardDescription>
                  <Button
                    as="a"
                    href="https://transparency.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <span>Transparency International</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </ScrollRevealSection>

            <ScrollRevealSection direction="up" delay={0.5}>
              <Card hover className="group">
                <CardContent padding="lg">
                  <CardTitle className="text-xl mb-4">
                    Nghiên cứu và báo cáo
                  </CardTitle>
                  <CardDescription className="mb-6">
                    Các báo cáo nghiên cứu về tham nhũng
                  </CardDescription>
                  <Button
                    as="a"
                    href="https://worldbank.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <span>Ngân hàng Thế giới</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </ScrollRevealSection>
          </div>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="bg-red-600 text-white py-20">
        <Container className="text-center">
          <ScrollRevealSection direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cần thêm tài liệu?
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
              Nếu bạn có tài liệu hoặc nguồn thông tin hữu ích về chống tham nhũng, 
              hãy liên hệ với chúng tôi.
            </p>
            <Button
              as="a"
              href="mailto:contact@chongthamnhung.vn"
              variant="secondary"
              size="xl"
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Liên hệ với chúng tôi
            </Button>
          </ScrollRevealSection>
        </Container>
      </div>
    </div>
  );
};

export default ResourcesPage;
