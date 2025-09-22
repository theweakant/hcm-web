import { Link } from 'react-router-dom';
import { Calendar, Tag, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

const CaseCard = ({ case: caseData }) => {
  const getSeverityVariant = (severity) => {
    switch (severity) {
      case 'Nghiêm trọng':
        return 'danger';
      case 'Trung bình':
        return 'warning';
      case 'Nhẹ':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card hover className="overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={caseData.image}
          alt={caseData.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
          <Badge variant={getSeverityVariant(caseData.severity)} size="sm">
            {caseData.severity}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent padding="default">
        {/* Metadata */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>{caseData.year}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Tag className="h-4 w-4" aria-hidden="true" />
            <span>{caseData.category}</span>
          </div>
        </div>

        {/* Title */}
        <CardTitle className="line-clamp-2 mb-3">
          {caseData.title}
        </CardTitle>

        {/* Description */}
        <CardDescription className="line-clamp-3 mb-6">
          {caseData.description}
        </CardDescription>

        {/* Footer */}
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-1 text-red-600 text-sm">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span>Chi tiết vụ án</span>
            </div>
            <Button
              as={Link}
              to={`/cases/${caseData.id}`}
              size="sm"
              className="group"
            >
              Xem chi tiết
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
