import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CaseCarouselCard from "./CaseCarouselCard";
import Autoplay from "embla-carousel-autoplay";

const CaseCarousel = ({ cases }) => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  // Sort cases by id in ascending order
  const sortedCases = [...cases].sort((a, b) => a.id - b.id);

  return (
    <div className="relative w-full max-w-[90rem] mx-auto px-4 md:px-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "center",
          loop: true,
          dragFree: true
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sortedCases.map((caseData) => (
            <CarouselItem 
              key={caseData.id} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="flex justify-center">
                <CaseCarouselCard caseData={caseData} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <CarouselPrevious 
            className="pointer-events-auto relative opacity-70 hover:opacity-100 transition-opacity -ml-4 md:ml-2"
            variant="outline"
            size="sm"
            aria-label="View previous case"
          />
          <CarouselNext 
            className="pointer-events-auto relative opacity-70 hover:opacity-100 transition-opacity -mr-4 md:mr-2"
            variant="outline"
            size="sm"
            aria-label="View next case"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CaseCarousel;