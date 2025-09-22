import { ExternalLink, Shield, Newspaper, BookOpen, Microscope, Globe, Scale, Tv } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

const ResourceList = ({ resources }) => {
  const getIcon = (iconName) => {
    const iconMap = {
      'shield-check': Shield,
      'newspaper': Newspaper,
      'book-open': BookOpen,
      'microscope': Microscope,
      'globe': Globe,
      'scale': Scale,
      'tv': Tv,
      'badge': Shield
    };
    
    const IconComponent = iconMap[iconName] || Shield;
    return <IconComponent className="h-5 w-5" />;
  };

  const getTypeVariant = (type) => {
    switch (type) {
      case 'Cơ quan nhà nước':
        return 'info';
      case 'Truyền thông nhà nước':
        return 'primary';
      case 'Báo chí':
        return 'success';
      case 'Văn bản pháp luật':
        return 'warning';
      case 'Tổ chức quốc tế':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <Card key={resource.id} hover className="group">
          <CardContent padding="default">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-200 transition-colors duration-200">
                  {getIcon(resource.icon)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant={getTypeVariant(resource.type)} size="sm">
                    {resource.type}
                  </Badge>
                </div>
                
                <CardTitle className="line-clamp-2 mb-3 text-base">
                  {resource.title}
                </CardTitle>
                
                <CardDescription className="line-clamp-3 mb-4 text-sm">
                  {resource.description}
                </CardDescription>
                
                <Button
                  as="a"
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <span>Truy cập tài nguyên</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceList;
