import { useState } from 'react';

interface DownloadState {
  isOpen: boolean;
  fileName: string;
  fileUrl: string;
}

export const useDownload = () => {
  const [downloadState, setDownloadState] = useState<DownloadState>({
    isOpen: false,
    fileName: '',
    fileUrl: '',
  });

  const initiateDownload = (fileUrl: string, fileName: string) => {
    // Check if user has opted to skip the dialog
    const skipDialog = localStorage.getItem('skipDownloadDialog') === 'true';

    if (skipDialog) {
      // Direct download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Show dialog
      setDownloadState({
        isOpen: true,
        fileName,
        fileUrl,
      });
    }
  };

  const closeDialog = () => {
    setDownloadState({
      isOpen: false,
      fileName: '',
      fileUrl: '',
    });
  };

  const resetPreference = () => {
    localStorage.removeItem('skipDownloadDialog');
  };

  return {
    downloadState,
    initiateDownload,
    closeDialog,
    resetPreference,
  };
};
