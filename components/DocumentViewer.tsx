
import React from 'react';
import { X, Download } from 'lucide-react';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileName: string;
  fileUrl: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ isOpen, onClose, title, fileName, fileUrl }) => {
  if (!isOpen) return null;

  const absoluteUrl = fileUrl.startsWith('http')
    ? fileUrl
    : `${window.location.origin}${fileUrl}`;

  const lower = fileName.toLowerCase();
  const isPdf = lower.endsWith('.pdf');
  const isOfficeDoc = lower.endsWith('.docx') || lower.endsWith('.doc') || lower.endsWith('.xlsx') || lower.endsWith('.pptx');
  const isLocalhost = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)/.test(window.location.hostname);

  let viewerSrc: string | null = null;
  let unavailableReason: string | null = null;

  if (isPdf) {
    viewerSrc = absoluteUrl;
  } else if (isOfficeDoc) {
    if (isLocalhost) {
      unavailableReason = 'Office document previews require the site to be served from a public URL — please use the Download option here, or visit the live site to preview in-place.';
    } else {
      viewerSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
    }
  } else {
    unavailableReason = 'This document type cannot be previewed. Please use Download.';
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-stone-200 gap-4">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 truncate">{title}</h3>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={fileUrl}
              download={fileName}
              className="flex items-center gap-2 text-emerald-700 font-semibold hover:underline text-sm"
            >
              <Download className="w-4 h-4" /> Download
            </a>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors"
              aria-label="Close viewer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-stone-100 rounded-b-3xl overflow-hidden">
          {viewerSrc ? (
            <iframe
              src={viewerSrc}
              className="w-full h-full border-0"
              title={title}
            />
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-center">
              <p className="text-stone-600 max-w-md">{unavailableReason}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
