  // src/components/Upload/UploadVideoWeb.jsx
  import React, { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { 
    uploadHomestayVideo,
    selectIsUploadingVideo,
    selectVideoUploadProgress,
    selectVideoUploadError,
    selectVideoUploadSuccess,
    clearVideoUploadState
  } from '../../redux/slices/upload.slice';

  const UploadVideoWeb = ({ homestayId, onUploadSuccess, existingVideos = [] }) => {
    const dispatch = useDispatch();
    const isUploading = useSelector(selectIsUploadingVideo);
    const uploadProgress = useSelector(selectVideoUploadProgress);
    const uploadError = useSelector(selectVideoUploadError);
    const uploadSuccess = useSelector(selectVideoUploadSuccess);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewData, setPreviewData] = useState([]); 
const existingPreviewVideos = (() => {
  if (!existingVideos) return [];
  
  // Nếu là string, chuyển thành array
  if (typeof existingVideos === 'string') {
    return [existingVideos];
  }
  
  // Nếu là array
  if (Array.isArray(existingVideos)) {
    return existingVideos.map(v => typeof v === 'string' ? v : v.url);
  }
  
  return [];
})();

  useEffect(() => {
      return () => {
        // Revoke object URLs to avoid memory leaks
        previewData.forEach(item => URL.revokeObjectURL(item.url));
      };
    }, [previewData]);

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const validFiles = [];
      const previews = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Optional: Check file type (basic)
        if (!file.type.startsWith('video/')) {
          alert(`Tệp ${file.name} không phải là video.`);
          continue;
        }

        // Optional: Check file size (e.g., 100MB limit like mobile)
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
          alert(`Video ${file.name} quá lớn (tối đa 100MB).`);
          continue;
        }

        validFiles.push(file);
        previews.push({
          url: URL.createObjectURL(file),
          name: file.name,
          size: formatFileSize(file.size)
        });
      }

      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
        setPreviewData(previews);
      }
    };

    const removeFile = (index) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      const newData = previewData.filter((_, i) => i !== index);
      
      // Revoke the URL for the removed file
      URL.revokeObjectURL(previewData[index].url);
      
      setSelectedFiles(newFiles);
      setPreviewData(newData);
    };

    const handleUpload = async () => {
      if (!homestayId || selectedFiles.length === 0) {
        alert('Vui lòng chọn video');
        return;
      }

      try {
        await dispatch(uploadHomestayVideo({
          homestayId,
          videoFiles: selectedFiles
        })).unwrap(); // unwrap to catch errors directly
        
        // Notify parent component if needed
        if (onUploadSuccess) onUploadSuccess();
        
        // Clear local state after successful upload
        setSelectedFiles([]);
        setPreviewData([]);
        
      } catch (error) {
        console.error('Upload failed:', error);
        // Error is handled by Redux state
      }
    };

    const handleClear = () => {
      dispatch(clearVideoUploadState());
      setSelectedFiles([]);
      setPreviewData([]);
      // Revoke URLs for previews being cleared
      previewData.forEach(item => URL.revokeObjectURL(item.url));
    };

    return (
      <div className="bg-white rounded-lg">

        {/* File Input */}
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    disabled:opacity-50"
        />


  {existingPreviewVideos.length > 0 && (
    <div className="mt-3">
      <p className="text-xs text-gray-500 mb-1">Video đã tồn tại:</p>
      <div className="space-y-2 mb-2">
        {existingPreviewVideos.map((url, index) => (
          <div key={`existing-${index}`} className="flex items-center p-2 border rounded">
            <video
              src={url}
              controls
              className="w-40 h-24 rounded"
            />
            {/* TODO: xử lý nút xóa video nếu cần */}
          </div>
        ))}
      </div>
    </div>
  )}
        {/* Preview */}
        {previewData.length > 0 && (
          <div className="mt-3">
            <div className="space-y-2 mb-2">
              {previewData.map((item, index) => (
                <div key={index} className="flex items-center p-2 border rounded">
                  <div className="flex-shrink-0 w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={isUploading}
                    className="ml-2 flex-shrink-0 text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">{previewData.length} video đã chọn</p>
          </div>
        )}

        {/* Progress */}
        {isUploading && (
          <div className="mt-2 flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm text-blue-600">{uploadProgress}%</span>
          </div>
        )}

        {/* Messages */}
        {uploadError && (
          <p className="mt-2 text-sm text-red-600">{uploadError}</p>
        )}
        {uploadSuccess && (
          <p className="mt-2 text-sm text-green-600">{uploadSuccess}</p>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || selectedFiles.length === 0 || !homestayId}
            className={`px-4 py-2 text-white rounded-md text-sm font-medium
                      ${(isUploading || selectedFiles.length === 0 || !homestayId) 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isUploading ? 'Đang tải...' : 'Tải lên'}
          </button>
          
          {(selectedFiles.length > 0 || uploadSuccess || uploadError) && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isUploading}
              className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 disabled:opacity-50"
            >
              Xóa
            </button>
          )}
        </div>
      </div>
    );
  };

  export default UploadVideoWeb;



