import ScrollRevealSection from '../components/ScrollRevealSection';
import { Shield, Users, Target, BookOpen, Mail, ExternalLink } from 'lucide-react';
import Container from '../components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Nhóm nghiên cứu",
      role: "Nghiên cứu và phân tích",
      description: "Chuyên gia về pháp luật và chính sách chống tham nhũng"
    },
    {
      name: "Nhóm công nghệ",
      role: "Phát triển hệ thống",
      description: "Xây dựng và vận hành nền tảng công nghệ"
    },
    {
      name: "Nhóm nội dung",
      role: "Biên tập và kiểm duyệt",
      description: "Đảm bảo tính chính xác và cập nhật thông tin"
    }
  ];

  const objectives = [
    {
      icon: Shield,
      title: "Minh bạch thông tin",
      description: "Cung cấp thông tin minh bạch, chính xác về các vụ án tham nhũng"
    },
    {
      icon: Users,
      title: "Nâng cao nhận thức",
      description: "Giúp người dân hiểu rõ tác hại và cách phòng chống tham nhũng"
    },
    {
      icon: Target,
      title: "Giám sát hiệu quả",
      description: "Theo dõi và đánh giá hiệu quả công tác chống tham nhũng"
    },
    {
      icon: BookOpen,
      title: "Giáo dục cộng đồng",
      description: "Cung cấp tài liệu và kiến thức về pháp luật chống tham nhũng"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-red-50 py-24">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                Về dự án
              </h1>
              <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Trang web giáo dục về phòng, chống tham nhũng tại Việt Nam. 
                Mục tiêu nâng cao nhận thức cộng đồng và góp phần xây dựng một xã hội minh bạch.
              </p>
            </div>
          </ScrollRevealSection>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Chúng tôi cam kết cung cấp thông tin minh bạch, chính xác về các vụ án tham nhũng 
                và góp phần nâng cao nhận thức cộng đồng về tầm quan trọng của việc chống tham nhũng.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective, index) => (
              <ScrollRevealSection key={index} direction="up" delay={0.2 + index * 0.1}>
                <Card className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent padding="lg">
                    <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors duration-300">
                      <objective.icon className="h-10 w-10 text-red-600" />
                    </div>
                    <CardTitle className="text-xl mb-4">
                      {objective.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {objective.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollRevealSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Giá trị cốt lõi
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Chúng tôi hoạt động dựa trên những giá trị cốt lõi nhằm đảm bảo 
                tính minh bạch, chính xác và hữu ích của thông tin.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollRevealSection direction="up" delay={0.3}>
              <Card hover className="h-full">
                <CardContent padding="lg">
                  <CardTitle className="text-2xl mb-6">Minh bạch</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Tất cả thông tin được cung cấp một cách minh bạch, rõ ràng và dễ hiểu. 
                    Chúng tôi cam kết không che giấu hay bóp méo sự thật.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScrollRevealSection>

            <ScrollRevealSection direction="up" delay={0.4}>
              <Card hover className="h-full">
                <CardContent padding="lg">
                  <CardTitle className="text-2xl mb-6">Chính xác</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Mọi thông tin đều được kiểm chứng từ các nguồn chính thức và đáng tin cậy. 
                    Chúng tôi đảm bảo tính chính xác và cập nhật thường xuyên.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScrollRevealSection>

            <ScrollRevealSection direction="up" delay={0.5}>
              <Card hover className="h-full">
                <CardContent padding="lg">
                  <CardTitle className="text-2xl mb-6">Hữu ích</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Thông tin được trình bày một cách dễ hiểu, hữu ích cho việc nâng cao 
                    nhận thức và hiểu biết của cộng đồng về chống tham nhũng.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScrollRevealSection>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Đội ngũ
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Dự án được thực hiện bởi một đội ngũ chuyên gia có kinh nghiệm 
                trong các lĩnh vực pháp luật, công nghệ và truyền thông.
              </p>
            </div>
          </ScrollRevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollRevealSection key={index} direction="up" delay={0.3 + index * 0.1}>
                <Card className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent padding="lg">
                    <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors duration-300">
                      <Users className="h-12 w-12 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl mb-3">
                      {member.name}
                    </CardTitle>
                    <p className="text-red-600 font-semibold mb-4 text-lg">
                      {member.role}
                    </p>
                    <CardDescription className="text-base leading-relaxed">
                      {member.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollRevealSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-red-600 text-white">
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Liên hệ với chúng tôi
              </h2>
              <p className="text-2xl opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed">
                Nếu bạn có thông tin, góp ý hoặc muốn hợp tác với dự án, 
                hãy liên hệ với chúng tôi.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent padding="lg">
                    <Mail className="h-12 w-12 mb-6" />
                    <CardTitle className="text-2xl mb-4">Email</CardTitle>
                    <CardDescription className="text-lg opacity-90">contact@chongthamnhung.vn</CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent padding="lg">
                    <ExternalLink className="h-12 w-12 mb-6" />
                    <CardTitle className="text-2xl mb-4">Website</CardTitle>
                    <CardDescription className="text-lg opacity-90">www.chongthamnhung.vn</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollRevealSection>
        </Container>
      </section>

      {/* Footer Note */}
      <section className="py-16 bg-gray-900 text-white">
        <Container className="text-center">
          <ScrollRevealSection direction="up" delay={0.2}>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Dự án phi lợi nhuận nhằm mục đích giáo dục và nâng cao nhận thức cộng đồng. 
              Tất cả thông tin được cung cấp dựa trên các nguồn chính thức và đáng tin cậy.
            </p>
          </ScrollRevealSection>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
