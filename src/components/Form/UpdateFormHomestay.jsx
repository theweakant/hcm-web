// src/components/Homestay/UpdateFormHomestay.jsx
import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateStaycationById, fetchHomestayById ,resetUpdateState } from '../../redux/slices/homestay.slice';
import { useAuth } from '../../redux/hooks/useAuth';
import { 
  X, 
  Home, 
  MapPin, 
  Camera, 
  Video, 
  Star, 
  Bed, 
  Bath, 
  Wifi, 
  Wind, 
  ChefHat, 
  Car, 
  TreePine, 
  Waves, 
  Camera as SecurityCamera,
  Coffee,
  Cigarette,
  Heart,
  RefreshCw,
  Zap,
  Clock,
  ThumbsUp,
  CheckCircle2
} from 'lucide-react';
import UploadImageWeb from '../Upload/UploadImageWeb'; 
import UploadVideoWeb from '../Upload/UploadVideoWeb'; 
import DropdownSelect from '../Input/DropdownSelect'

const InputField = ({ label, error, children, required = false }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Card = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className}`}>
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon className="w-5 h-5 text-blue-600" />}
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const UpdateFormHomestay = ({ homestay, onClose, onUpdateSuccess  }) => {
  const dispatch = useDispatch();
  const { accountId } = useAuth();
  const { updating, updateSuccess, updateError } = useSelector(state => state.homestay);

  const [formData, setFormData] = useState({
    name: homestay.name || '',
    pricePerNight: homestay.pricePerNight || '',
    originalPricePerNight: homestay.originalPricePerNight || '',
    discountPercentage: homestay.discountPercentage || '',
    videoTourUrl: homestay.videoTourUrl || '',
    description: homestay.description || '',
    features: homestay.features || [],
    roomType: homestay.roomType || '',
    roomCount: homestay.roomCount || '',
    maxGuests: homestay.maxGuests || '',
    bedCount: homestay.bedCount || '',
    bathroomCount: homestay.bathroomCount || '',
    availableDates: homestay.availableDates || [],
    location: homestay.location || {
      address: '',
      district: '',
      city: '',
      province: ''
    },
    distanceToCenter: homestay.distanceToCenter || '',
    amenities: homestay.amenities || {
      wifi: false,
      airConditioner: false,
      kitchen: false,
      privateBathroom: false,
      pool: false,
      petAllowed: false,
      parking: false,
      balcony: false,
      bbqArea: false,
      roomService: false,
      securityCamera: false
    },
    policies: homestay.policies || {
      allowPet: false,
      allowSmoking: false,
      refundable: false
    },
    flashSale: homestay.flashSale || false,
    instantBook: homestay.instantBook || false,
    recommended: homestay.recommended || false,
    available: homestay.available !== undefined ? homestay.available : true
  });

  
  const [featureInput, setFeatureInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [errors, setErrors] = useState({});

  // Amenities configuration with icons and readable labels
  const amenitiesConfig = {
    wifi: { icon: Wifi, label: 'WiFi miễn phí' },
    airConditioner: { icon: Wind, label: 'Điều hòa' },
    kitchen: { icon: ChefHat, label: 'Nhà bếp' },
    privateBathroom: { icon: Bath, label: 'Phòng tắm riêng' },
    pool: { icon: Waves, label: 'Hồ bơi' },
    petAllowed: { icon: Heart, label: 'Cho phép thú cưng' },
    parking: { icon: Car, label: 'Chỗ đậu xe' },
    balcony: { icon: TreePine, label: 'Ban công' },
    bbqArea: { icon: Coffee, label: 'Khu vực BBQ' },
    roomService: { icon: Coffee, label: 'Dịch vụ phòng' },
    securityCamera: { icon: SecurityCamera, label: 'Camera an ninh' }
  };

  // Policies configuration
  const policiesConfig = {
    allowPet: { icon: Heart, label: 'Cho phép thú cưng' },
    allowSmoking: { icon: Cigarette, label: 'Cho phép hút thuốc' },
    refundable: { icon: RefreshCw, label: 'Có thể hoàn tiền' }
  };

  // Settings configuration
  const settingsConfig = {
    flashSale: { icon: Zap, label: 'Flash Sale' },
    instantBook: { icon: Clock, label: 'Đặt ngay' },
    recommended: { icon: ThumbsUp, label: 'Đề xuất' },
    available: { icon: CheckCircle2, label: 'Có sẵn' }
  };

  // useEffect(() => {
  //   dispatch(fetchHomestayById(homestay.id));
  // }, [dispatch, homestay.id]);

  useEffect(() => {
  if (updateSuccess) {
    if (onUpdateSuccess) {
      onUpdateSuccess(homestay.id);
    }
    dispatch(resetUpdateState());
    onClose();
  }
  
  if (updateError) {
    toast.error(updateError?.message || 'Cập nhật thất bại');
    dispatch(resetUpdateState());
  }
}, [updateSuccess, updateError, dispatch, onClose, onUpdateSuccess, homestay.id]);


useEffect(() => {
  return () => {
    dispatch(resetUpdateState());
  };
}, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };


  const addFeature = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
        setFormData(prev => ({
          ...prev,
          features: [...prev.features, featureInput.trim()]
        }));
        setFeatureInput('');
      }
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addDate = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (dateInput && !formData.availableDates.includes(dateInput)) {
        setFormData(prev => ({
          ...prev,
          availableDates: [...prev.availableDates, dateInput]
        }));
        setDateInput('');
      }
    }
  };

  const removeDate = (index) => {
    setFormData(prev => ({
      ...prev,
      availableDates: prev.availableDates.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Tên homestay là bắt buộc';
    if (!formData.pricePerNight) newErrors.pricePerNight = 'Giá phòng là bắt buộc';
    if (!formData.roomType) newErrors.roomType = 'Loại phòng là bắt buộc';
    if (!formData.location.address.trim()) newErrors['location.address'] = 'Địa chỉ là bắt buộc';
    if (!formData.description.trim()) newErrors.description = 'Mô tả là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm() || !accountId) return;
  
  const staycationUpdateData = {
    name: formData.name,
    pricePerNight: parseInt(formData.pricePerNight),
    originalPricePerNight: parseInt(formData.originalPricePerNight || formData.pricePerNight),
    discountPercentage: parseInt(formData.discountPercentage || 0),
    description: formData.description,
    features: formData.features.filter(f => f.trim() !== ""),
    roomType: formData.roomType,
    roomCount: parseInt(formData.roomCount || 0),
    maxGuests: parseInt(formData.maxGuests || 0),
    bedCount: parseInt(formData.bedCount || 0),
    bathroomCount: parseInt(formData.bathroomCount || 0),
    availableDates: formData.availableDates || [],
    location: formData.location,
    distanceToCenter: parseFloat(formData.distanceToCenter || 0),
    amenities: formData.amenities,
    policies: formData.policies,
    videoTourUrl: formData.videoTourUrl?.trim() || null,
    
    // 🔑 QUAN TRỌNG: Đổi tên field
    isFlashSale: formData.flashSale,
    isInstantBook: formData.instantBook,
    isRecommended: formData.recommended,
    isAvailable: formData.available
  };

  try {
    await dispatch(updateStaycationById({ 
      homeStayId: homestay.id, 
      staycationData: staycationUpdateData 
    })).unwrap();
    
    toast.success('Cập nhật homestay thành công!');
    onClose();
    
  } catch (error) {
    const errorMessage = error?.message || 'Cập nhật thất bại';
    toast.error(errorMessage);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Cập nhật Homestay</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information & Pricing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Thông tin cơ bản" icon={Home}>
                <div className="space-y-4">
                  <InputField label="Tên homestay" error={errors.name} required>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập tên homestay..."
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </InputField>
                  {/* <InputField label="Loại phòng" error={errors.roomType} required>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn loại phòng</option>
                      <option value="entire_place">🏠 Toàn bộ chỗ ở</option>
                      <option value="private_room">🚪 Phòng riêng</option>
                      <option value="shared_room">👥 Phòng chung</option>
                    </select>
                  </InputField> */}


                  <InputField label="Loại phòng" error={errors.roomType} required>
  <DropdownSelect
    value={formData.roomType}
    onChange={(val) => handleInputChange({ target: { name: 'roomType', value: val } })}
    options={[
      { label: 'Loại dịch vụ thuê', value: '' },
      { label: 'Nguyên căn', value: 'entire_place' },
      { label: 'Phòng riêng', value: 'private_room' },
      { label: 'Phòng đôi', value: 'shared_room' },
    ]}
    className="bg-transparent text-gray-900 border-yellow-500"
    placeholder="Loại dịch vụ thuê"
  />
</InputField>
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Số phòng" required>
                      <input
                        type="number"
                        name="roomCount"
                        value={formData.roomCount}
                        onChange={handleInputChange}
                        placeholder="1"
                        min="1"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </InputField>
                    <InputField label="Số khách tối đa" required>
                      <input
                        type="number"
                        name="maxGuests"
                        value={formData.maxGuests}
                        onChange={handleInputChange}
                        placeholder="2"
                        min="1"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </InputField>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Số giường">
                      <div className="relative">
                        <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          name="bedCount"
                          value={formData.bedCount}
                          onChange={handleInputChange}
                          placeholder="1"
                          min="0"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </InputField>
                    <InputField label="Số phòng tắm">
                      <div className="relative">
                        <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          name="bathroomCount"
                          value={formData.bathroomCount}
                          onChange={handleInputChange}
                          placeholder="1"
                          min="0"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </InputField>
                  </div>
                </div>
              </Card>
              <Card title="Giá cả & Ưu đãi" icon={Star}>
                <div className="space-y-4">
                  <InputField label="Giá mỗi đêm (VNĐ)" error={errors.pricePerNight} required>
                    <input
                      type="number"
                      name="pricePerNight"
                      value={formData.pricePerNight}
                      onChange={handleInputChange}
                      placeholder="500000"
                      min="0"
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </InputField>
                  <InputField label="Giá gốc (VNĐ)">
                    <input
                      type="number"
                      name="originalPricePerNight"
                      value={formData.originalPricePerNight}
                      onChange={handleInputChange}
                      placeholder="600000"
                      min="0"
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </InputField>
                  <InputField label="Phần trăm giảm giá (%)">
                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleInputChange}
                      placeholder="15"
                      min="0"
                      max="100"
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </InputField>
                  <InputField label="Khoảng cách tới trung tâm (km)">
                    <input
                      type="number"
                      step="0.1"
                      name="distanceToCenter"
                      value={formData.distanceToCenter}
                      onChange={handleInputChange}
                      placeholder="2.5"
                      min="0"
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </InputField>
                </div>
              </Card>
            </div>
            
            {/* Location */}
            <Card title="Địa chỉ" icon={MapPin}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <InputField label="Địa chỉ chi tiết" error={errors['location.address']} required>
                    <input
                      type="text"
                      name="location.address"
                      value={formData.location.address}
                      onChange={handleInputChange}
                      placeholder="123 Đường ABC, Phường XYZ..."
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </InputField>
                </div>
                <InputField label="Quận/Huyện" required>
                  <input
                    type="text"
                    name="location.district"
                    value={formData.location.district}
                    onChange={handleInputChange}
                    placeholder="Quận 1"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </InputField>
                <InputField label="Thành phố" required>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleInputChange}
                    placeholder="TP. Hồ Chí Minh"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </InputField>
              </div>
            </Card>
            
            {/* Description */}
            <Card title="Mô tả" icon={Home}>
              <InputField label="Mô tả chi tiết về homestay" error={errors.description} required>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả chi tiết về homestay của bạn, vị trí, tiện nghi, điểm nổi bật..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </InputField>
            </Card>
            
            {/* Media - Sử dụng component UploadImageWeb và UploadVideoWeb */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Hình ảnh" icon={Camera}>
                {/* Truyền homestayId để component biết upload ảnh cho homestay nào */}
<UploadImageWeb 
  homestayId={homestay.id}
  existingImages={homestay.imageList || []} 
/>
              </Card>
              <Card title="Video Tour" icon={Video}>
<UploadVideoWeb 
  homestayId={homestay.id}
  existingVideos={homestay.videoList || homestay.videoTourUrl || []} 
/>
              </Card>
            </div>
            
            {/* Features & Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Đặc điểm nổi bật" icon={Star}>
                <InputField label="Thêm đặc điểm">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={addFeature}
                      placeholder="Nhập đặc điểm và nhấn Enter"
                      className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      Thêm
                    </button>
                  </div>
                </InputField>
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </Card>
              <Card title="Ngày có sẵn" icon={Clock}>
                <InputField label="Chọn ngày">
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      onKeyPress={addDate}
                      className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={addDate}
                      className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      Thêm
                    </button>
                  </div>
                </InputField>
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.availableDates.map((date, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {new Date(date).toLocaleDateString('vi-VN')}
                      <button
                        type="button"
                        onClick={() => removeDate(index)}
                        className="ml-1 text-green-600 hover:text-green-800 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Amenities */}
            <Card title="Tiện nghi" icon={Home}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(amenitiesConfig).map(([key, config]) => {
                  const IconComponent = config.icon;
                  return (
                    <label
                      key={key}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.amenities[key]
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name={`amenities.${key}`}
                        checked={formData.amenities[key]}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{config.label}</span>
                    </label>
                  );
                })}
              </div>
            </Card>
            
            {/* Policies & Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Chính sách" icon={CheckCircle2}>
                <div className="space-y-3">
                  {Object.entries(policiesConfig).map(([key, config]) => {
                    const IconComponent = config.icon;
                    return (
                      <label
                        key={key}
                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.policies[key]
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name={`policies.${key}`}
                          checked={formData.policies[key]}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{config.label}</span>
                      </label>
                    );
                  })}
                </div>
              </Card>
              <Card title="Cài đặt" icon={Star}>
                <div className="space-y-3">
                  {Object.entries(settingsConfig).map(([key, config]) => {
                    const IconComponent = config.icon;
                    return (
                      <label
                        key={key}
                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData[key]
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name={key}
                          checked={formData[key]}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{config.label}</span>
                      </label>
                    );
                  })}
                </div>
              </Card>
            </div>
            
            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">

              <button
                type="submit"
                disabled={updating}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold text-lg transition-colors ${
                  updating 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {updating ? 'Đang cập nhật...' : 'Cập nhật'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold text-lg"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFormHomestay;