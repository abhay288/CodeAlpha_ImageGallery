import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Download, X, ChevronLeft, ChevronRight, Filter, Grid, List } from 'lucide-react';
import { ImageCard } from './ImageCard';
import { Lightbox } from './Lightbox';
import { FilterBar } from './FilterBar';
import { ImageUpload } from './ImageUpload';
import { BackgroundEffects } from './BackgroundEffects';

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  category: string;
  name: string;
  size?: number;
}

const defaultImages: ImageData[] = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Mountain landscape',
    category: 'Nature',
    name: 'Mountain Vista'
  },
  {
    id: '2',
    src: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'City skyline',
    category: 'Urban',
    name: 'City Lights'
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Ocean waves',
    category: 'Nature',
    name: 'Ocean Waves'
  },
  {
    id: '4',
    src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Forest path',
    category: 'Nature',
    name: 'Forest Path'
  },
  {
    id: '5',
    src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Urban architecture',
    category: 'Urban',
    name: 'Modern Architecture'
  },
  {
    id: '6',
    src: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Abstract art',
    category: 'Art',
    name: 'Abstract Colors'
  },
  {
    id: '7',
    src: 'https://images.pexels.com/photos/2080696/pexels-photo-2080696.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vintage camera',
    category: 'Art',
    name: 'Vintage Camera'
  },
  {
    id: '8',
    src: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Sunset landscape',
    category: 'Nature',
    name: 'Golden Sunset'
  }
];

export const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>(defaultImages);
  const [filteredImages, setFilteredImages] = useState<ImageData[]>(defaultImages);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<ImageData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

  const filterImages = useCallback((category: string) => {
    if (category === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === category));
    }
  }, [images]);

  useEffect(() => {
    filterImages(selectedCategory);
  }, [selectedCategory, filterImages]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const openLightbox = (image: ImageData) => {
    setLightboxImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredImages.length
      : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentImageIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  const downloadImage = async (imageData: ImageData) => {
    try {
      const response = await fetch(imageData.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${imageData.name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleImageUpload = (newImages: ImageData[]) => {
    setImages(prev => [...prev, ...newImages]);
    setIsUploadOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundEffects />
      
      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Image Gallery
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'masonry' : 'grid')}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
                <span className="hidden sm:inline">
                  {viewMode === 'grid' ? 'Masonry' : 'Grid'}
                </span>
              </button>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <Upload size={20} />
                <span className="hidden sm:inline">Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Image Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4'
        }`}>
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => openLightbox(image)}
              onDownload={() => downloadImage(image)}
              viewMode={viewMode}
            />
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="text-white/60 text-xl">No images found in this category</div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={closeLightbox}
          onNavigate={navigateImage}
          onDownload={() => downloadImage(lightboxImage)}
          currentIndex={currentImageIndex}
          totalImages={filteredImages.length}
        />
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <ImageUpload
          onUpload={handleImageUpload}
          onClose={() => setIsUploadOpen(false)}
        />
      )}
    </div>
  );
};