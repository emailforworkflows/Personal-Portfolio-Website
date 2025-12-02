import React, { useState } from 'react';
import { FileText, Image, ExternalLink, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { workSamples } from '../data/mock';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const WorkSampleCard = ({ sample, onViewDetails }) => {
  const getCategoryColor = (category) => {
    if (category === 'UX Wireframes') return 'bg-purple-100 text-purple-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-40 bg-slate-100 overflow-hidden">
        {sample.type === 'image' ? (
          <img
            src={sample.fileUrl}
            alt={sample.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
            <FileText size={40} className="text-blue-600 mb-2" />
            <span className="text-xs text-slate-500">PDF Document</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={`text-xs ${getCategoryColor(sample.category)}`}>
            {sample.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-blue-600 font-medium mb-1">{sample.client}</p>
        <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-2">
          {sample.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {sample.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(sample)}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            View
          </button>
          <a
            href={sample.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm rounded-lg transition-colors"
            aria-label={`Download ${sample.title}`}
          >
            <Download size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

const ImageViewer = ({ sample, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const allImages = sample ? [sample.fileUrl, ...(sample.additionalImages || [])] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!sample) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-lg font-semibold">{sample.title}</DialogTitle>
          <p className="text-sm text-slate-500">{sample.client}</p>
        </DialogHeader>
        
        <div className="relative bg-slate-100">
          {sample.type === 'image' ? (
            <>
              <img
                src={allImages[currentImageIndex]}
                alt={`${sample.title} - Image ${currentImageIndex + 1}`}
                className="w-full max-h-[60vh] object-contain"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-white/60'}`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <iframe
              src={`${sample.fileUrl}#toolbar=0`}
              title={sample.title}
              className="w-full h-[60vh]"
            />
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <p className="text-sm text-slate-600 mb-3">{sample.description}</p>
          <a
            href={sample.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <ExternalLink size={14} className="mr-1" />
            Open in new tab
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const WorkSamples = () => {
  const [selectedSample, setSelectedSample] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleViewDetails = (sample) => {
    setSelectedSample(sample);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedSample(null);
  };

  // Separate brochures and wireframes
  const brochures = workSamples.filter(s => s.category === 'Product Brochure');
  const wireframes = workSamples.filter(s => s.category === 'UX Wireframes');

  return (
    <section
      id="work-samples"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="work-samples-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            id="work-samples-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-1"
          >
            Work Samples
          </h2>
          <div className="w-12 h-1 bg-slate-900 mb-6"></div>
          <p className="text-slate-600 max-w-2xl">
            Product brochures, UX wireframes, and marketing collateral developed for healthcare and technology sectors.
          </p>
        </div>

        {/* Product Brochures */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Product Brochures</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brochures.map((sample) => (
              <WorkSampleCard
                key={sample.id}
                sample={sample}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>

        {/* UX Wireframes */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">UX Wireframes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wireframes.map((sample) => (
              <WorkSampleCard
                key={sample.id}
                sample={sample}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </div>

      <ImageViewer
        sample={selectedSample}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
      />
    </section>
  );
};

export default WorkSamples;
