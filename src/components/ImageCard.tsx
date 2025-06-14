import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import { ImageData } from './ImageGallery';

interface ImageCardProps {
  image: ImageData;
  onClick: () => void;
  onDownload: () => void;
  viewMode: 'grid' | 'masonry';
}

export const ImageCard: React.FC<ImageCardProps> = ({ 
  image, 
  onClick, 
  onDownload, 
  viewMode 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
        viewMode === 'masonry' ? 'break-inside-avoid mb-6' : 'aspect-square'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 animate-pulse" />
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      {/* Content */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 text-white transition-transform duration-300 ${
        isHovered ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg truncate">{image.name}</h3>
            <p className="text-sm text-white/70">{image.category}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className="px-2 py-1 bg-purple-500/80 text-white text-xs rounded-full backdrop-blur-sm">
          {image.category}
        </span>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 border-2 border-purple-400/50 rounded-xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};