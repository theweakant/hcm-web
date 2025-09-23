import ScrollRevealSection from '../components/ScrollRevealSection';
import { Shield, Users, TrendingUp, BookOpen, ArrowRight, CheckCircle, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import CaseCarousel from '../components/CaseCarousel';
import { corruptionCases } from '../data/corruptionCases';

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Thông tin minh bạch",
      description: "Cung cấp thông tin chi tiết về các vụ án tham nhũng một cách minh bạch và chính xác"
    },
    {
      icon: Users,
      title: "Nâng cao nhận thức",
      description: "Giúp người dân hiểu rõ tác hại của tham nhũng và cách phòng chống"
    },
    {
      icon: TrendingUp,
      title: "Theo dõi tiến độ",
      description: "Cập nhật liên tục về tình hình xử lý các vụ án tham nhũng"
    },
    {
      icon: BookOpen,
      title: "Tài liệu tham khảo",
      description: "Cung cấp các tài liệu, văn bản pháp luật liên quan đến chống tham nhũng"
    }
  ];

  const stats = [
    { number: "20+", label: "Vụ án được theo dõi" },
    { number: "10+", label: "Tài liệu tham khảo" },
    { number: "20+", label: "Người dùng truy cập" },
    { number: "100%", label: "Độ chính xác thông tin" }
  ];

  const hoChiMinhQuotes = [
    {
      quote: "Tham ô là hành động xấu xa nhất, tội lỗi, đê tiện nhất trong xã hội. Tham ô là trộm cắp của công, chiếm của công làm của tư.",
      context: "Về bản chất của tham nhũng"
    },
    {
      quote: "Tham ô, lãng phí và bệnh quan liêu là kẻ thù của nhân dân, của bộ đội và của Chính phủ.",
      context: "Về tác hại của tham nhũng"
    },
    {
      quote: "Phải thực hành tự phê bình và phê bình nghiêm chỉnh trong Đảng... Kỷ luật của Đảng phải nghiêm minh.",
      context: "Về giải pháp chống tham nhũng"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent"></div>
        <Container className="relative py-20">
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Phòng, chống tham nhũng
                <span className="block text-red-600 mt-2">góp phần củng cố niềm tin</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
                Vận dụng tư tưởng Hồ Chí Minh vào công tác xây dựng Đảng và Nhà nước. 
                Cung cấp thông tin minh bạch và nâng cao nhận thức cộng đồng.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  as={Link}
                  to="/cases"
                  size="xl"
                  className="group"
                >
                  <span>Xem các vụ án</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button
                  as={Link}
                  to="/resources"
                  variant="secondary"
                  size="xl"
                >
                  Tài liệu tham khảo
                </Button>
              </div>
            </div>
          </ScrollRevealSection>
        </Container>
      </section>

      {/* Hồ Chí Minh's View Section */}
      <section className="py-24 bg-white">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Quan điểm của Chủ tịch Hồ Chí Minh về chống tham nhũng
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Chủ tịch Hồ Chí Minh đã có những quan điểm sâu sắc về việc chống tham nhũng, 
                xây dựng một bộ máy nhà nước trong sạch và phục vụ nhân dân.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {hoChiMinhQuotes.map((item, index) => (
              <ScrollRevealSection key={index} direction="up" delay={0.3 + index * 0.1}>
                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
                  <CardContent padding="lg">
                    <Quote className="h-10 w-10 text-red-600 mb-6" />
                    <blockquote className="text-gray-800 italic mb-6 text-lg leading-relaxed">
                      "{item.quote}"
                    </blockquote>
                    <p className="text-sm text-red-600 font-semibold">
                      - {item.context}
                    </p>
                  </CardContent>
                </Card>
              </ScrollRevealSection>
            ))}
          </div>

          <ScrollRevealSection direction="up" delay={0.6}>
            <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0 text-white overflow-hidden">
              <CardContent padding="lg">
                <h3 className="text-3xl font-bold mb-8 text-center">
                  Nguồn gốc và hậu quả của tham nhũng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold mb-4">Nguồn gốc:</h4>
                    <p className="text-base leading-relaxed">
                      Chủ nghĩa cá nhân - "Họ mang nặng chủ nghĩa cá nhân, việc gì cũng nghĩ đến lợi ích riêng của mình trước hết"
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold mb-4">Hậu quả:</h4>
                    <p className="text-base leading-relaxed">
                      Làm suy giảm niềm tin của nhân dân đối với Đảng, ảnh hưởng đến tiền đồ của cách mạng
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollRevealSection>
        </Container>
      </section>

      {/* Solutions Today Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Vận dụng tư tưởng Hồ Chí Minh trong công tác phòng, chống tham nhũng hiện nay
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Cần thực hiện đồng bộ nhiều giải pháp, cả về tư tưởng, tổ chức, pháp luật và vai trò của quần chúng nhân dân.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollRevealSection key={index} direction="up" delay={0.2 + index * 0.1}>
                <Card hover className="text-center group">
                  <CardContent padding="lg">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-red-200 transition-colors duration-300">
                      <feature.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <CardTitle className="text-xl mb-4">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollRevealSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Impact on Public Trust Section */}
      <section className="py-24 bg-white">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Các vụ án tham nhũng điển hình
                <div className="mt-8">
                  <CaseCarousel cases={corruptionCases} />
                </div>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Công tác phòng, chống tham nhũng có ý nghĩa vô cùng quan trọng đối với sự tồn vong của chế độ 
                và củng cố niềm tin của nhân dân.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection direction="up" delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-red-600 mb-3">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection direction="up" delay={0.6}>
            <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0 text-white text-center overflow-hidden">
              <CardContent padding="lg">
                <h3 className="text-3xl md:text-4xl font-bold mb-8">
                  Cùng chung tay xây dựng một xã hội minh bạch
                </h3>
                <p className="text-xl mb-12 opacity-90 leading-relaxed max-w-4xl mx-auto">
                  Khi nhân dân thấy rằng Đảng và Nhà nước thực sự quyết tâm làm trong sạch bộ máy, 
                  xử lý nghiêm những "con sâu mọt" đục khoét của công, lòng tin của họ vào chế độ 
                  và tương lai của đất nước sẽ ngày càng được củng cố và nâng cao.
                </p>
                {/* <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    as={Link}
                    to="/about"
                    variant="secondary"
                    size="xl"
                    className="bg-white text-red-600 hover:bg-gray-100"
                  >
                    Tìm hiểu thêm
                  </Button>
                  <Button
                    as={Link}
                    to="/resources"
                    variant="outline"
                    size="xl"
                    className="border-2 border-white text-white hover:bg-white hover:text-red-600"
                  >
                    Tài liệu tham khảo
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </ScrollRevealSection>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
