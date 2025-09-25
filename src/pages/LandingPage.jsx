import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Shield, Users, TrendingUp, BookOpen, ArrowRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Helper function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Dữ liệu giả lập (mock data) ---
const corruptionCases = [
  {
    id: 1,
    title: "Vụ án Việt Á",
    summary: "Vụ án liên quan đến việc nâng khống giá kit xét nghiệm COVID-19, gây thiệt hại nghiêm trọng cho ngân sách nhà nước.",
    image: "https://placehold.co/600x400/ef4444/white?text=Vụ+án+Việt+Á"
  },
  {
    id: 2,
    title: "Vụ án Chuyến bay giải cứu",
    summary: "Vụ án đưa và nhận hối lộ để cấp phép các chuyến bay đưa công dân Việt Nam về nước trong đại dịch COVID-19.",
    image: "https://placehold.co/600x400/dc2626/white?text=Chuyến+bay+giải+cứu"
  },
  {
    id: 3,
    title: "Vụ án Vạn Thịnh Phát",
    summary: "Vụ án lừa đảo chiếm đoạt tài sản thông qua phát hành trái phiếu, liên quan đến Tập đoàn Vạn Thịnh Phát và SCB.",
    image: "https://placehold.co/600x400/b91c1c/white?text=Vạn+Thịnh+Phát"
  },
  {
    id: 4,
    title: "Vụ án AIC",
    summary: "Vi phạm quy định về đấu thầu gây hậu quả nghiêm trọng tại Bệnh viện Đa khoa Đồng Nai, liên quan đến Công ty AIC.",
    image: "https://placehold.co/600x400/991b1b/white?text=Vụ+án+AIC"
  },
];

// --- Định nghĩa các Component bị thiếu ---

const Container = ({ className, children }) => (
  <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
    {children}
  </div>
);

const Button = forwardRef(({ className, as: Comp = 'button', variant = 'primary', size = 'md', ...props }, ref) => {
  const sizeClasses = {
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg font-semibold',
  };

  const variantClasses = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400'
  };

  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = 'Button';


const Card = ({ className, children, hover = false }) => (
  <div className={cn("bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300",
    hover && "hover:shadow-lg hover:-translate-y-1",
    className
  )}>
    {children}
  </div>
);

const CardContent = ({ className, children, padding = 'md' }) => {
  const paddingClasses = {
    md: 'p-6',
    lg: 'p-8',
  }
  return <div className={cn(paddingClasses[padding], className)}>{children}</div>;
}
const CardTitle = ({ className, children }) => <h3 className={cn("text-lg font-semibold text-gray-900", className)}>{children}</h3>;
const CardDescription = ({ className, children }) => <p className={cn("text-gray-600", className)}>{children}</p>;

const ScrollRevealSection = ({ children, direction = 'up', delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: '-translate-x-10',
    right: 'translate-x-10',
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionClasses[direction]}`
      )}
    >
      {children}
    </div>
  );
};

const CaseCarousel = ({ cases }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? cases.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === cases.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-4xl mx-auto relative group">
      <div className="relative h-80 w-full overflow-hidden rounded-lg">
        {cases.map((caseItem, index) => (
          <div
            key={caseItem.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end p-6"
              style={{ backgroundColor: "rgba(144, 17, 17, 0.5)" }}>
              <h3 className="text-2xl font-bold text-white">{caseItem.title}</h3>
              <p className="text-gray-200 mt-2">{caseItem.summary}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>
    </div>
  )
}

// --- Component chính: LandingPage ---
const LandingPage = () => {
  const backgroundImages = [
    '/landingpage1.jpg',
    '/landingpage2.jpg'
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 15000);
    return () => clearInterval(intervalId);
  }, [backgroundImages.length]);

  const features = [
    { icon: Shield, title: "Thông tin minh bạch", description: "Cung cấp thông tin chi tiết về các vụ án tham nhũng một cách minh bạch và chính xác" },
    { icon: Users, title: "Nâng cao nhận thức", description: "Giúp người dân hiểu rõ tác hại của tham nhũng và cách phòng chống" },
    { icon: TrendingUp, title: "Theo dõi tiến độ", description: "Cập nhật liên tục về tình hình xử lý các vụ án tham nhũng" },
    { icon: BookOpen, title: "Tài liệu tham khảo", description: "Cung cấp các tài liệu, văn bản pháp luật liên quan đến chống tham nhũng" }
  ];

  const stats = [
    { number: "20+", label: "Vụ án được theo dõi" },
    { number: "10+", label: "Tài liệu tham khảo" },
    { number: "20+", label: "Người dùng truy cập" },
    { number: "100%", label: "Độ chính xác thông tin" }
  ];

  const hoChiMinhQuotes = [
    { quote: "Tham ô là hành động xấu xa nhất, tội lỗi, đê tiện nhất trong xã hội. Tham ô là trộm cắp của công, chiếm của công làm của tư.", context: "Về bản chất của tham nhũng" },
    { quote: "Tham ô, lãng phí và bệnh quan liêu là kẻ thù của nhân dân, của bộ đội và của Chính phủ.", context: "Về tác hại của tham nhũng" },
    { quote: "Phải thực hành tự phê bình và phê bình nghiêm chỉnh trong Đảng... Kỷ luật của Đảng phải nghiêm minh.", context: "Về giải pháp chống tham nhũng" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>

        <Container className="relative py-20 z-10">
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight shadow-text">
                Phòng, chống tham nhũng
                <span className="block text-red-400 mt-2">góp phần củng cố niềm tin</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed shadow-text">
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

      <iframe
        allowFullScreen
        allow="clipboard-write"
        scrolling="no"
        className="fp-iframe"
        style={{ border: '1px solid lightgray', width: '100%', height: '400px' }}
        src="https://heyzine.com/flip-book/db96875239.html"
        title="Heyzine Flipbook">
      </iframe>

      <section className="py-24 bg-white" style={{ backgroundColor: "tan" }}>

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
                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300 h-full">
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

      <section className="py-24 bg-gray-50" style={{ backgroundColor: "wheat" }}>

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
                <Card hover className="text-center group h-full">
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
      <section className="py-24 bg-white" style={{ backgroundColor: "antiquewhite" }}>
        <Container>
          <ScrollRevealSection direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Các vụ án tham nhũng điển hình
              </h2>
              <div className="mt-8">
                <CaseCarousel cases={corruptionCases} />
              </div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-8">
                Công tác phòng, chống tham nhũng có ý nghĩa vô cùng quan trọng đối với sự tồn vong của chế độ
                và củng cố niềm tin của nhân dân.
              </p>
            </div>
          </ScrollRevealSection>

          {/* <ScrollRevealSection direction="up" delay={0.4}>
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
          </ScrollRevealSection> */}

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
              </CardContent>
            </Card>
          </ScrollRevealSection>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
