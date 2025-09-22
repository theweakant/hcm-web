import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Trang chủ', path: '/' },
      { name: 'Vụ án', path: '/cases' },
      { name: 'Tài liệu', path: '/resources' },
      { name: 'Giới thiệu', path: '/about' }
    ],
    resources: [
      { name: 'Thanh tra Chính phủ', url: 'https://thanhtra.gov.vn', external: true },
      { name: 'Viện Kiểm sát Nhân dân Tối cao', url: 'https://vksndtc.gov.vn', external: true },
      { name: 'Bộ Công an', url: 'https://bocongan.gov.vn', external: true }
    ],
    legal: [
      { name: 'Luật Phòng, chống tham nhũng', url: 'https://thuvienphapluat.vn', external: true },
      { name: 'Nghị quyết 04-NQ/TW', url: 'https://thuvienphapluat.vn', external: true }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold">Chống Tham Nhũng</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Trang web giáo dục về phòng, chống tham nhũng tại Việt Nam. 
              Cung cấp thông tin, tài liệu và các vụ án tham nhũng để nâng cao nhận thức cộng đồng.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>namnqse182628@fpt.edu.vn</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Điều hướng</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tài nguyên</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pháp luật</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Chống Tham Nhũng. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              HCM202
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
