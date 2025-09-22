import React from 'react';
import axios from 'axios';

const TestComponent = () => {
  const handleTestApi = async () => {
    try {
      const formData = new FormData();

      // Thông tin cơ bản
      formData.append('name', 'Test Homestay from Web');
      formData.append('pricePerNight', 1000000);
      formData.append('originalPricePerNight', 1200000);
      formData.append('discountPercentage', 20);
      formData.append('description', 'Test homestay description');

      // Các trường dạng list và object cần stringify
      formData.append('features', JSON.stringify(['Wifi', 'TV', 'Aircon']));
      formData.append('roomType', 'Deluxe');
      formData.append('roomCount', 3);
      formData.append('maxGuests', 6);
      formData.append('bedCount', 3);
      formData.append('bathroomCount', 2);
      formData.append('availableDates', JSON.stringify(['2025-07-23', '2025-07-24']));

      formData.append(
        'location',
        JSON.stringify({
          address: '123 Web Street',
          district: 'District 1',
          city: 'Ho Chi Minh',
          province: 'HCM',
        })
      );

      formData.append('distanceToCenter', 2.5);

      formData.append(
        'amenities',
        JSON.stringify({
          wifi: true,
          airConditioner: true,
          kitchen: true,
          privateBathroom: true,
          pool: true,
          petAllowed: false,
          parking: true,
          balcony: false,
          bbqArea: false,
          roomService: true,
          securityCamera: true,
        })
      );

      formData.append(
        'policies',
        JSON.stringify({
          allowPet: false,
          allowSmoking: false,
          refundable: true,
        })
      );

      // Trạng thái homestay
      formData.append('available', true);
      formData.append('recommended', false);
      formData.append('flashSale', false);
      formData.append('instantBook', true);

      const response = await axios.post(
        'https://beestay-azgcfsfpgbdkbmgv.southeastasia-01.azurewebsites.net/bee-stay/api/v1/stay-cation/add/14',
        formData,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob21lMTIzIiwicm9sZSI6IkhPU1QiLCJpYXQiOjE3NTMyNTQ3MzcsImV4cCI6MTc1MzM0MTEzN30.iUwgjBom1j5g_dtwH2YKy4Xh6LqMn0QD9Kawdp65jvs',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('✅ API success');
      console.log('Status:', response.status);
      console.log('Data:', response.data);

      alert(`✅ API success\nStatus: ${response.status}\nData: ${JSON.stringify(response.data)}`);
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = data?.message || error.message;

      console.error('❌ API error');
      console.error('Status:', status);
      console.error('Message:', message);

      alert(`❌ API error\nStatus: ${status || 'Unknown'}\nMessage: ${message}`);
    }
  };

  return (
    <button
      onClick={handleTestApi}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Test Add Homestay accountId=14 home123
    </button>
  );
};

export default TestComponent;
