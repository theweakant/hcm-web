import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ScrollRevealSection from '../components/ScrollRevealSection';
import Timeline from '../components/Timeline';
import VideoEmbed from '../components/VideoEmbed';
import { corruptionCases } from '../data/corruptionCases';
import { ArrowLeft, Calendar, Tag, AlertTriangle, ExternalLink, Play } from 'lucide-react';

const CaseDetailPage = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCase = corruptionCases.find(caseItem => caseItem.id === parseInt(id));
    setCaseData(foundCase);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy vụ án</h1>
          <p className="text-gray-600 mb-6">Vụ án bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link
            to="/cases"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Nghiêm trọng':
        return 'bg-red-100 text-red-800';
      case 'Trung bình':
        return 'bg-yellow-100 text-yellow-800';
      case 'Nhẹ':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="flex items-center space-x-4 mb-6">
              <Link
                to="/cases"
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Quay lại danh sách</span>
              </Link>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {caseData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{caseData.year}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Tag className="h-4 w-4" />
                    <span>{caseData.category}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(caseData.severity)}`}>
                    {caseData.severity}
                  </span>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <ScrollRevealSection direction="up" delay={0.2}>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả vụ án</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {caseData.description}
                </p>
              </div>
            </ScrollRevealSection>

            {/* Video Section */}
            <ScrollRevealSection direction="up" delay={0.4}>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Video liên quan</h2>
                <VideoEmbed 
                  videoUrl={caseData.videoUrl} 
                  title={`Video về vụ án: ${caseData.title}`}
                />
              </div>
            </ScrollRevealSection>

            {/* Timeline */}
            <ScrollRevealSection direction="up" delay={0.6}>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử vụ án</h2>
                <Timeline events={caseData.timeline} />
              </div>
            </ScrollRevealSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Case Info */}
            <ScrollRevealSection direction="up" delay={0.3}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin vụ án</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Năm:</span>
                    <span className="font-medium">{caseData.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Danh mục:</span>
                    <span className="font-medium">{caseData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mức độ:</span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getSeverityColor(caseData.severity)}`}>
                      {caseData.severity}
                    </span>
                  </div>
                  {caseData.mainCharacter && (
                    <div className="pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-2">Nhân vật chính:</div>
                      <div className="text-sm font-medium text-gray-900">{caseData.mainCharacter}</div>
                    </div>
                  )}
                  {caseData.damage && (
                    <div className="pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-2">Thiệt hại:</div>
                      <div className="text-sm font-medium text-red-600">{caseData.damage}</div>
                    </div>
                  )}
                  {caseData.sentence && (
                    <div className="pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-2">Mức án:</div>
                      <div className="text-sm font-medium text-red-600">{caseData.sentence}</div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollRevealSection>

            {/* Related Cases */}
            <ScrollRevealSection direction="up" delay={0.5}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vụ án liên quan</h3>
                <div className="space-y-3">
                  {corruptionCases
                    .filter(caseItem => 
                      caseItem.id !== caseData.id && 
                      (caseItem.category === caseData.category || caseItem.year === caseData.year)
                    )
                    .slice(0, 3)
                    .map(relatedCase => (
                      <Link
                        key={relatedCase.id}
                        to={`/cases/${relatedCase.id}`}
                        className="block p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors duration-200"
                      >
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                          {relatedCase.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {relatedCase.year} • {relatedCase.category}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </ScrollRevealSection>

            {/* Report Button */}
            <ScrollRevealSection direction="up" delay={0.7}>
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Báo cáo tham nhũng
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Nếu bạn có thông tin về các hành vi tham nhũng, hãy báo cáo với cơ quan chức năng.
                </p>
                <div className="space-y-2">
                  <a
                    href="https://thanhtra.gov.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                  >
                    Báo cáo với Thanh tra Chính phủ
                  </a>
                  <a
                    href="https://bocongan.gov.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-red-600 border border-red-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-50 transition-colors duration-200"
                  >
                    Liên hệ Bộ Công an
                  </a>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailPage;
