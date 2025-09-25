import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import Badge from "./ui/Badge";
import { cn } from "@/lib/utils";
import { User, Coins } from 'lucide-react';

const CaseCarouselCard = ({ caseData }) => {
  const navigate = useNavigate();
  const { id, title, image, mainCharacter, damage, category } = caseData;

  const handleClick = () => {
    navigate(`/cases/${id}`);
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden cursor-pointer",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:scale-[1.02]",
        "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none",
        "w-[280px] h-[360px]"
      )}
      onClick={handleClick}
      tabIndex={0}
      role="article"
      aria-label={`Corruption case: ${title}`}
    >
      {/* Full-height image background */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Category Badge */}
      <div className="absolute top-3 right-3 z-10">
        <Badge 
          variant="outline"
          className="bg-white/95 text-primary-700 text-xs font-medium px-2.5 py-1"
        >
          {category}
        </Badge>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
        <h3 className="text-base font-bold mb-2 text-white line-clamp-2">
          {title}
        </h3>
        
        <div className="space-y-1.5">
          <div className="flex items-center text-white/90 text-xs">
            <User className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
            <span className="line-clamp-1">{mainCharacter}</span>
          </div>
          
          <div className="flex items-center text-white/90 text-xs">
            <Coins className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
            <span className="line-clamp-1">{damage}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CaseCarouselCard;