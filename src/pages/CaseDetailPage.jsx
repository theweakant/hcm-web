"use client"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ScrollRevealSection from "../components/ScrollRevealSection"
import Timeline from "../components/Timeline"
import VideoEmbed from "../components/VideoEmbed"
import { corruptionCases } from "../data/corruptionCases"
import { Calendar, Tag, AlertTriangle, ExternalLink, Play } from "lucide-react"

const CaseDetailPage = () => {
  const { id } = useParams()
  const [caseData, setCaseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundCase = corruptionCases.find((caseItem) => caseItem.id === Number.parseInt(id))
    setCaseData(foundCase)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy vụ án</h1>
          <p className="text-gray-600 mb-6">Vụ án bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    )
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Nghiêm trọng":
        return "bg-red-100 text-red-800"
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800"
      case "Nhẹ":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mt-10">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-balance">
                  {caseData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold text-gray-700">{caseData.year}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full">
                    <Tag className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold text-gray-700">{caseData.category}</span>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${getSeverityColor(caseData.severity)}`}
                  >
                    {caseData.severity}
                  </span>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <ScrollRevealSection direction="up" delay={0.2}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1 h-8 bg-red-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Mô tả vụ án</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg text-pretty">{caseData.description}</p>
              </div>
            </ScrollRevealSection>

            {/* Video Section */}
            <ScrollRevealSection direction="up" delay={0.4}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-1 h-8 bg-red-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Video liên quan</h2>
                  <Play className="h-6 w-6 text-red-600" />
                </div>
                <VideoEmbed videoUrl={caseData.videoUrl} title={`Video về vụ án: ${caseData.title}`} />
              </div>
            </ScrollRevealSection>

            {/* Timeline */}
            <ScrollRevealSection direction="up" delay={0.6}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-1 h-8 bg-red-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Lịch sử vụ án</h2>
                </div>
                <Timeline events={caseData.timeline} />
              </div>
            </ScrollRevealSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Case Info */}
            <ScrollRevealSection direction="up" delay={0.3}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Thông tin vụ án</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 ">
                    <span className="text-gray-600 font-medium">Năm:</span>
                    <span className="font-bold text-gray-900">{caseData.year}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 ">
                    <span className="text-gray-600 font-medium">Danh mục:</span>
                    <span className="font-bold text-gray-900">{caseData.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 ">
                    <span className="text-gray-600 font-medium">Mức độ:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getSeverityColor(caseData.severity)}`}>
                      {caseData.severity}
                    </span>
                  </div>
                  {caseData.mainCharacter && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Nhân vật chính:</div>
                      <div className="text-sm font-bold text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {caseData.mainCharacter}
                      </div>
                    </div>
                  )}
                  {caseData.damage && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Thiệt hại:</div>
                      <div className="text-sm font-bold text-red-600 bg-red-50 p-3 rounded-lg">{caseData.damage}</div>
                    </div>
                  )}
                  {caseData.sentence && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Mức án:</div>
                      <div className="text-sm font-bold text-red-600 bg-red-50 p-3 rounded-lg">{caseData.sentence}</div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollRevealSection>

            {/* Related Cases */}
            <ScrollRevealSection direction="up" delay={0.5}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Vụ án liên quan</span>
                </h3>
                <div className="space-y-4">
                  {corruptionCases
                    .filter(
                      (caseItem) =>
                        caseItem.id !== caseData.id &&
                        (caseItem.category === caseData.category || caseItem.year === caseData.year),
                    )
                    .slice(0, 3)
                    .map((relatedCase) => (
                      <a
                        key={relatedCase.id}
                        href={`/cases/${relatedCase.id}`}
                        className="block p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 hover:shadow-md transition-all duration-200 group"
                      >
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-red-700 transition-colors duration-200">
                          {relatedCase.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-2 font-medium">
                          {relatedCase.year} • {relatedCase.category}
                        </p>
                      </a>
                    ))}
                </div>
              </div>
            </ScrollRevealSection>

            {/* Report Button */}
            <ScrollRevealSection direction="up" delay={0.7}>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center border border-red-200 shadow-lg">
                <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Báo cáo tham nhũng</h3>
                <p className="text-sm text-gray-600 mb-6 text-pretty">
                  Nếu bạn có thông tin về các hành vi tham nhũng, hãy báo cáo với cơ quan chức năng.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://thanhtra.gov.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-red-600 text-white py-3 px-6 rounded-xl text-sm font-bold hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <span>Báo cáo với Thanh tra Chính phủ</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                  <a
                    href="https://bocongan.gov.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-white text-red-600 border-2 border-red-600 py-3 px-6 rounded-xl text-sm font-bold hover:bg-red-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <span>Liên hệ Bộ Công an</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseDetailPage
