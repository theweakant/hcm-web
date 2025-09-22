import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createStaycation } from '../../redux/slices/homestay.slice';
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
  CheckCircle2,
  Plus
} from 'lucide-react';
import DropdownSelect from '../../components/Input/DropdownSelect';


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


const AddFormHomestay = ({ onClose }) => {
  const dispatch = useDispatch();
  const { accountId } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    pricePerNight: '',
    originalPricePerNight: '',
    discountPercentage: '',
    image: null,
    videoTourUrl: '',
    description: '',
    features: [],
    roomType: '',
    roomCount: '',
    maxGuests: '',
    bedCount: '',
    bathroomCount: '',
    availableDates: [],
    location: {
      address: '',
      district: '',
      city: '',
      province: ''
    },
    distanceToCenter: '',
    amenities: {
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
    policies: {
      allowPet: false,
      allowSmoking: false,
      refundable: false
    },
    flashSale: false,
    instantBook: false,
    recommended: false,
    available: true
  });

  const [imagePreview, setImagePreview] = useState(null);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error when user starts typing
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

  if (!formData.location.address.trim()) newErrors['location.address'] = 'Địa chỉ chi tiết là bắt buộc';
  if (!formData.location.district.trim()) newErrors['location.district'] = 'Quận/Huyện là bắt buộc';
  if (!formData.location.city.trim()) newErrors['location.city'] = 'Thành phố là bắt buộc';

    if (!formData.description.trim()) newErrors.description = 'Mô tả là bắt buộc';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm() || !accountId) return;

  const staycationData = {
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
    flashSale: formData.flashSale,
    instantBook: formData.instantBook,
    recommended: formData.recommended,
    available: formData.available
  };
  
  console.log('=== PAYLOAD BEING SENT ===');
  console.log('Full payload:', staycationData);
  console.log('RoomType specifically:', staycationData.roomType);
  console.log('FormData roomType:', formData.roomType);

  try {
    await dispatch(createStaycation({ accountId, staycationData })).unwrap();
    
    toast.success('Tạo homestay thành công!');
    onClose();
    
  } catch (error) {
    const errorMessage = error?.message || 'Tạo homestay thất bại';
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
            <h2 className="text-xl font-semibold text-gray-800">Tạo Homestay Mới</h2>
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

<InputField label="Loại phòng" error={errors.roomType} required>
  <DropdownSelect
    value={formData.roomType}
    onChange={(val) => handleInputChange({ target: { name: 'roomType', value: val } })}
    options={[
      { label: 'Chọn loại dịch vụ thuê', value: '' }, 
      { label: 'Nguyên căn', value: 'Nguyên căn' }, 
      { label: 'Phòng riêng', value: 'Phòng riêng' },
      { label: 'Phòng đôi', value: 'Phòng đôi' },
    ]}
    className="bg-transparent text-gray-900 border-yellow-500"
    placeholder="Chọn loại dịch vụ thuê"
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
                  <InputField label="Giá mỗi đêm (VND)" error={errors.pricePerNight} required>
                    <input
                      type="number"
                      name="pricePerNight"
                      value={formData.pricePerNight}
                      onChange={handleInputChange}
                      placeholder="899000"
                      min="0"
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </InputField>

                  <InputField label="Giá gốc (VND)">
                    <input
                      type="number"
                      name="originalPricePerNight"
                      value={formData.originalPricePerNight}
                      onChange={handleInputChange}
                      placeholder="1000000"
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
                      placeholder="5"
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
                      placeholder="64 Tran Khac Chan"
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </InputField>
                </div>
                <InputField label="Quận/Huyện" error={errors['location.district']} required>
                  <input
                    type="text"
                    name="location.district"
                    value={formData.location.district}
                    onChange={handleInputChange}
                    placeholder="Quận 1"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </InputField>
                <InputField label="Thành phố" error={errors['location.city']} required>
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

            {/* Media */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Hình ảnh" icon={Camera}>
                <InputField label="Tải lên hình ảnh homestay">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </InputField>
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </Card>

              <Card title="Video Tour" icon={Video}>
                <InputField label="URL video giới thiệu">
                  <input
                    type="url"
                    name="videoTourUrl"
                    value={formData.videoTourUrl}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </InputField>
              </Card>
            </div> */}

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
          placeholder="Thêm các đặc điểm nổi bật"
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={addFeature}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          title="Thêm đặc điểm"
        >
          <span className="text-white text-xl font-bold">+</span>
        </button>
      </div>
    </InputField>
    {formData.features.length > 0 && (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Các đặc điểm đã thêm:</h4>
        <div className="flex flex-wrap gap-2">
          {formData.features.map((feature, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-between gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors min-w-0"
            >
              <span className="truncate">{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="flex items-center justify-center w-4 h-4 text-blue-500 hover:text-blue-700 hover:bg-blue-200 rounded-full transition-colors flex-shrink-0"
                title="Xóa đặc điểm"
              >
                <span className="text-xs font-bold leading-none">×</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
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
                    className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    title="Thêm ngày"
                  >
                    <span className="text-white text-xl font-bold">+</span>
                  </button>
                </div>
              </InputField>
              {formData.availableDates.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Các ngày đã chọn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.availableDates.map((date, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center justify-between gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium border border-green-200 hover:bg-green-100 transition-colors min-w-0"
                      >
                        <span className="truncate">{new Date(date).toLocaleDateString('vi-VN')}</span>
                        <button
                          type="button"
                          onClick={() => removeDate(index)}
                          className="flex items-center justify-center w-4 h-4 text-green-500 hover:text-green-700 hover:bg-green-200 rounded-full transition-colors flex-shrink-0"
                          title="Xóa ngày"
                        >
                          <span className="text-xs font-bold leading-none">×</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

            
            <div className="flex gap-4 pt-6 border-t border-gray-200">



  <button
    type="button"
    onClick={(e) => {
      console.log('Button clicked - calling handleSubmit directly');
      handleSubmit(e); 
    }}
    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
  >
    Tạo Homestay
  </button>
  

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFormHomestay;