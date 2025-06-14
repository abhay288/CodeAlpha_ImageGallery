import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { ImageData } from './ImageGallery';

interface LightboxProps {
  image: ImageData;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onDownload: () => void;
  currentIndex: number;
  totalImages: number;
}

export const Lightbox: React.FC<LightboxProps> = ({
  image,
  onClose,
  onNavigate,
  onDownload,
  currentIndex,
  totalImages
}) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onNavigate('prev');
          break;
        case 'ArrowRight':
          onNavigate('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNavigate]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <X size={24} />
      </button>

      {/* Navigation buttons */}
      {totalImages > 1 && (
        <>
          <button
            onClick={() => onNavigate('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image container */}
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
        />
        
        {/* Image info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold">{image.name}</h2>
              <p className="text-white/70">{image.category}</p>
              <p className="text-sm text-white/50 mt-1">
                {currentIndex + 1} of {totalImages}
              </p>
            </div>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200 font-medium"
            >
              <Download size={20} />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop click to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
};