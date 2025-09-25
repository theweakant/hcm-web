
// src/components/Upload/ImageDeleter.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, X, AlertTriangle } from 'lucide-react';
import { deleteUploadedImage } from '../../redux/slices/upload.slice';

const ImageDeleter = ({ 
  imageUrl, 
  onDeleteSuccess, 
  showConfirmDialog = true,
  size = 'md',
  variant = 'overlay' 
}) => {
  const dispatch = useDispatch();
  const { isDeletingImage, imageDeleteError } = useSelector(state => state.upload);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (showConfirmDialog && !showConfirm) {
      setShowConfirm(true);
      return;
    }

    try {
      await dispatch(deleteUploadedImage(imageUrl)).unwrap();
      if (onDeleteSuccess) {
        onDeleteSuccess(imageUrl);
      }
      setShowConfirm(false);
    } catch (error) {
      console.error('Delete failed:', error);
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      button: 'w-4 h-4 text-xs',
      icon: 'w-3 h-3'
    },
    md: {
      button: 'w-6 h-6 text-sm',
      icon: 'w-4 h-4'
    },
    lg: {
      button: 'w-8 h-8 text-base',
      icon: 'w-5 h-5'
    }
  };

  const currentSize = sizeConfig[size];

  // Overlay variant (for image previews)
  if (variant === 'overlay') {
    return (
      <>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeletingImage}
          className={`absolute -top-2 -right-2 bg-red-500 text-white rounded-full ${currentSize.button} flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md z-10`}
          title="Xóa ảnh"
        >
          {isDeletingImage ? (
            <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-3 h-3"></div>
          ) : (
            // Sử dụng dấu X thay vì icon
            <span className="font-bold text-white leading-none">×</span>
          )}
        </button>

        {/* Confirm Dialog */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-800">Xác nhận xóa</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa ảnh này không? Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  disabled={isDeletingImage}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeletingImage}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isDeletingImage ? (
                    <>
                      <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4"></div>
                      Đang xóa...
                    </>
                  ) : (
                    <>
                      Xóa
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Button variant (standalone button)
  if (variant === 'button') {
    return (
      <>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeletingImage}
          className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isDeletingImage ? (
            <>
              <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4"></div>
              Đang xóa...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              Xóa ảnh
            </>
          )}
        </button>

        {imageDeleteError && (
          <p className="text-red-600 text-xs mt-1">{imageDeleteError}</p>
        )}

        {/* Confirm Dialog */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-800">Xác nhận xóa</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa ảnh này không? Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  disabled={isDeletingImage}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeletingImage}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isDeletingImage ? (
                    <>
                      <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4"></div>
                      Đang xóa...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Xóa
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Inline variant (minimal)
  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeletingImage}
      className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Xóa ảnh"
    >
      {isDeletingImage ? (
        <div className="animate-spin rounded-full border-2 border-red-500 border-t-transparent w-4 h-4"></div>
      ) : (
        <span className="font-bold text-xl">×</span>
      )}
    </button>
  );
};

// Component để quản lý danh sách ảnh với khả năng xóa
export const ImageListWithDelete = ({ 
  images, 
  onImageDeleted, 
  className = "",
  imageClassName = "w-20 h-20 object-cover rounded border"
}) => {
  const handleDeleteSuccess = (deletedImageUrl) => {
    if (onImageDeleted) {
      onImageDeleted(deletedImageUrl);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-gray-500 text-sm italic">
        Chưa có ảnh nào
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {images.map((imageUrl, index) => (
        <div key={index} className="relative group">
          <img
            src={typeof imageUrl === 'string' ? imageUrl : imageUrl.url}
            alt={`Image ${index + 1}`}
            className={imageClassName}
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ImageDeleter
              imageUrl={typeof imageUrl === 'string' ? imageUrl : imageUrl.url}
              onDeleteSuccess={handleDeleteSuccess}
              variant="overlay"
              size="md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageDeleter;