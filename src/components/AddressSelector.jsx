import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import subVn from 'sub-vn';
const { VNProvince, VNDistrict, VNWard } = subVn;

const AddressSelector = ({ value = {}, onChange, error }) => {
  const [selectedProvince, setSelectedProvince] = useState(value.provinceCode || '');
  const [selectedDistrict, setSelectedDistrict] = useState(value.districtCode || '');
  const [selectedWard, setSelectedWard] = useState(value.wardCode || '');
  const [street, setStreet] = useState(value.address || '');

  const provinces = VNProvince.getProvinces();
  const districts = selectedProvince 
    ? VNDistrict.getDistrictsByProvinceCode(selectedProvince)
    : [];
  const wards = selectedDistrict 
    ? VNWard.getWardsByDistrictCode(selectedDistrict)
    : [];

  const emitChange = (street, province, district, ward) => {
    const fullAddress = {
      address: street,
      district: district ? districts.find(d => d.code === district)?.name || '' : '',
      city: district ? districts.find(d => d.code === district)?.name || '' : '', 
      province: province ? provinces.find(p => p.code === province)?.name || '' : ''
    };
    onChange && onChange(fullAddress);
  };

  return (
    <div className="space-y-4">
      {/* Street Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Số nhà, tên đường <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="123 Đường ABC..."
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              emitChange(e.target.value, selectedProvince, selectedDistrict, selectedWard);
            }}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {error?.address && <p className="text-red-500 text-xs mt-1">{error.address}</p>}
      </div>

      {/* Province */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tỉnh/Thành phố <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedProvince}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedProvince(val);
            setSelectedDistrict('');
            setSelectedWard('');
            emitChange(street, val, '', '');
          }}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Chọn Tỉnh/Thành phố</option>
          {provinces.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>
        {error?.province && <p className="text-red-500 text-xs mt-1">{error.province}</p>}
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quận/Huyện <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedDistrict(val);
            setSelectedWard('');
            emitChange(street, selectedProvince, val, '');
          }}
          disabled={!selectedProvince}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Chọn Quận/Huyện</option>
          {districts.map((d) => (
            <option key={d.code} value={d.code}>
              {d.name}
            </option>
          ))}
        </select>
        {error?.district && <p className="text-red-500 text-xs mt-1">{error.district}</p>}
      </div>

      {/* Ward */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phường/Xã
        </label>
        <select
          value={selectedWard}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedWard(val);
            emitChange(street, selectedProvince, selectedDistrict, val);
          }}
          disabled={!selectedDistrict}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Chọn Phường/Xã</option>
          {wards.map((w) => (
            <option key={w.code} value={w.code}>
              {w.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddressSelector;