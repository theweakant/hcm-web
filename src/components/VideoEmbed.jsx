import { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoEmbed = ({ videoUrl, title = "Video" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!videoId) {
    return (
      <div className="bg-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">Video không khả dụng</p>
      </div>
    );
  }

  return (
    <>
      {/* Video Thumbnail */}
      <div 
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-red-600 rounded-full p-4 group-hover:bg-red-700 transition-colors duration-200">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">{title}</p>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={title}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoEmbed;
