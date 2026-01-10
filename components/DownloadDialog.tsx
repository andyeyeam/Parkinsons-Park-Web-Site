import React, { useState, useEffect } from 'react';
import { X, Download, FolderOpen, AlertCircle } from 'lucide-react';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileUrl: string;
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({ isOpen, onClose, fileName, fileUrl }) => {
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [downloadLocation, setDownloadLocation] = useState('');
  const [supportsFileSystem, setSupportsFileSystem] = useState(false);

  useEffect(() => {
    // Check if File System Access API is supported
    setSupportsFileSystem('showSaveFilePicker' in window);

    // Get typical download location based on OS
    const platform = navigator.platform.toLowerCase();
    let defaultLocation = '';

    if (platform.includes('win')) {
      defaultLocation = 'C:\\Users\\[Your Username]\\Downloads';
    } else if (platform.includes('mac')) {
      defaultLocation = '~/Downloads';
    } else if (platform.includes('linux')) {
      defaultLocation = '~/Downloads';
    } else {
      defaultLocation = 'Your browser\'s default download folder';
    }

    setDownloadLocation(defaultLocation);
  }, []);

  const handleStandardDownload = () => {
    // Save preference if "don't ask again" is checked
    if (dontAskAgain) {
      localStorage.setItem('skipDownloadDialog', 'true');
    }

    // Trigger standard browser download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onClose();
  };

  const handleCustomLocationDownload = async () => {
    if (!supportsFileSystem) {
      alert('Your browser does not support custom download locations. The file will be downloaded to your default Downloads folder.');
      handleStandardDownload();
      return;
    }

    try {
      // Show save file picker
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: 'PDF Files',
            accept: { 'application/pdf': ['.pdf'] },
          },
          {
            description: 'Word Documents',
            accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
          },
        ],
      });

      // Fetch the file
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Write to chosen location
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();

      // Save preference if "don't ask again" is checked
      if (dontAskAgain) {
        localStorage.setItem('skipDownloadDialog', 'true');
      }

      onClose();
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Error saving file:', err);
        alert('Failed to save file. Falling back to standard download.');
        handleStandardDownload();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-stone-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-100 p-3 rounded-2xl">
            <Download className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Download File</h2>
            <p className="text-sm text-stone-500 mt-1">{fileName}</p>
          </div>
        </div>

        {/* Download location info */}
        <div className="mb-6">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-stone-900 mb-1">Default Download Location</p>
                <p className="text-sm text-stone-600 font-mono break-all">
                  {downloadLocation}
                </p>
                {!supportsFileSystem && (
                  <p className="text-xs text-stone-500 mt-2">
                    Note: Your browser settings control where files are downloaded.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleStandardDownload}
            className="w-full bg-emerald-700 text-white px-6 py-4 rounded-full font-bold text-lg hover:bg-emerald-800 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download to Default Location
          </button>

          {supportsFileSystem && (
            <button
              onClick={handleCustomLocationDownload}
              className="w-full bg-white text-stone-900 border-2 border-stone-300 px-6 py-4 rounded-full font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
            >
              <FolderOpen className="w-5 h-5" />
              Choose Download Location
            </button>
          )}
        </div>

        {/* Don't ask again checkbox */}
        <div className="border-t border-stone-200 pt-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={dontAskAgain}
              onChange={(e) => setDontAskAgain(e.target.checked)}
              className="w-5 h-5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
              Don't ask me again (always use default location)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DownloadDialog;
