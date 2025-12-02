import React, { useState } from 'react';
import { FileText, Image, ExternalLink, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { workSamples } from '../data/mock';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const WorkSampleCard = ({ sample, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Thumbnail Preview */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {sample.type === 'image' ? (
          <img
            src={sample.thumbnail}
            alt={sample.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
            <FileText size={48} className="text-blue-600 mb-2" />
            <span className="text-sm text-slate-500">PDF Document</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs">
            {sample.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-xs text-blue-600 font-medium mb-2">{sample.client}</div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {sample.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {sample.description}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(sample)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {sample.type === 'image' ? <Image size={16} className="mr-2" /> : <FileText size={16} className="mr-2" />}
            View
          </button>
          <a
            href={sample.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors"
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
  
  const allImages = sample ? [sample.thumbnail, ...(sample.additionalImages || [])] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!sample) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
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
                className="w-full max-h-[70vh] object-contain"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-blue-600' : 'bg-white/60'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>              )}
            </>
          ) : (
            <iframe
              src={`${sample.fileUrl}#toolbar=0`}
              title={sample.title}
              className="w-full h-[70vh]"
            />
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <p className="text-sm text-slate-600">{sample.description}</p>
          <div className="mt-3 flex gap-3">
            <a
              href={sample.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <ExternalLink size={14} className="mr-1" />
              Open in new tab
            </a>
            <a
              href={sample.fileUrl}
              download
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <Download size={14} className="mr-1" />
              Download
            </a>
          </div>
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

  return (
    <section
      id="work-samples"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="work-samples-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="work-samples-heading"
            className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4"
          >
            Work Samples
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Product brochures and marketing collateral developed for healthcare and technology sectors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workSamples.map((sample) => (
            <WorkSampleCard
              key={sample.id}
              sample={sample}
              onViewDetails={handleViewDetails}
            />
          ))}
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
