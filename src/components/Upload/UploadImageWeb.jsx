// src/components/Upload/UploadImageWeb.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  uploadHomestayImage,
  selectIsUploadingImage,
  selectImageUploadProgress,
  selectImageUploadError,
  selectImageUploadSuccess,
  clearImageUploadState
} from '../../redux/slices/upload.slice';
import { ImageListWithDelete } from './ImageDeleter';

const UploadImageWeb = ({ homestayId, onUploadSuccess, existingImages = [] }) => {
  const dispatch = useDispatch();
  const isUploading = useSelector(selectIsUploadingImage);
  const uploadProgress = useSelector(selectImageUploadProgress);
  const uploadError = useSelector(selectImageUploadError);
  const uploadSuccess = useSelector(selectImageUploadSuccess);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [currentExistingImages, setCurrentExistingImages] = useState(existingImages);

  // Cleanup previews on unmount or when files change
  useEffect(() => {
    return () => {
       // Revoke object URLs to avoid memory leaks
       previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // Update existing images when prop changes
  useEffect(() => {
    setCurrentExistingImages(existingImages);
  }, [existingImages]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      
      // Create preview URLs
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(newPreviewUrls);
    }
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL for the removed file
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const handleUpload = async () => {
    if (!homestayId || selectedFiles.length === 0) {
      alert('Vui lòng chọn ảnh');
      return;
    }

    try {
      await dispatch(uploadHomestayImage({
        homestayId,
        imageFiles: selectedFiles
      })).unwrap();
      
      // Notify parent component if needed
      if (onUploadSuccess) onUploadSuccess();
      
      // Clear local state after successful upload
      setSelectedFiles([]);
      setPreviewUrls([]);
      
    } catch (error) {
      console.error('Upload failed:', error);
      // Error is handled by Redux state
    }
  };

  const handleClear = () => {
    dispatch(clearImageUploadState());
    setSelectedFiles([]);
    setPreviewUrls([]);
    // Revoke URLs for previews being cleared
    previewUrls.forEach(url => URL.revokeObjectURL(url));
  };

  // Handle when existing image is deleted
  const handleImageDeleted = (deletedImageUrl) => {
    setCurrentExistingImages(prev => 
      prev.filter(img => {
        const imgUrl = typeof img === 'string' ? img : img.url;
        return imgUrl !== deletedImageUrl;
      })
    );
    
    // Notify parent component if needed
    if (onUploadSuccess) onUploadSuccess();
  };

  return (
    <div className="bg-white rounded-lg ">

      {/* Existing Images Section */}
      {currentExistingImages.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-medium text-gray-700">Ảnh hiện có</h4>
            <span className="text-sm text-gray-500">
              {currentExistingImages.length} ảnh
            </span>
          </div>
          <ImageListWithDelete
            images={currentExistingImages}
            onImageDeleted={handleImageDeleted}
            className="mb-4"
            imageClassName="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
          />
          <div className="border-b border-gray-200 mb-4"></div>
        </div>
      )}

      {/* Upload New Images Section */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Tải ảnh mới</h4>
        
        {/* File Input */}
        <input
          type="file"
          accept="image/*"
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

        {/* New Images Preview */}
        {previewUrls.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Ảnh sẽ tải lên</p>
              <span className="text-xs text-gray-500">{previewUrls.length} ảnh đã chọn</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-blue-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={isUploading}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-blue-600 font-medium">Đang tải lên...</span>
              <span className="text-sm text-blue-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Messages */}
        {uploadError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 flex items-center gap-2">
              <span className="font-medium">Lỗi:</span>
              {uploadError}
            </p>
          </div>
        )}
        
        {uploadSuccess && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600 flex items-center gap-2">
              <span className="font-medium">Thành công:</span>
              {uploadSuccess}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || selectedFiles.length === 0 || !homestayId}
            className={`px-6 py-2 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                       ${(isUploading || selectedFiles.length === 0 || !homestayId) 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4"></div>
                Đang tải...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Tải lên ({selectedFiles.length})
              </>
            )}
          </button>
          
          {(selectedFiles.length > 0 || uploadSuccess || uploadError) && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isUploading}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Xóa tất cả
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImageWeb;