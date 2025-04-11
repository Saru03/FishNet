import React, { useState } from 'react';
import axios from 'axios';

const Freshness = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/freshness-detect/', formData);
      setResult(response.data.freshness);
    } catch (error) {
      console.error('Freshness prediction failed:', error);
      setResult('Prediction failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          🐟 Fish Freshness Detection
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="p-2 border border-black-300 hover:text-blue-400 rounded-md text-black"
          />

          {preview && (
            <div>
              <p className="font-semibold mb-2 text-gray-700">Preview:</p>
              <img
                src={preview}
                alt="Fish Preview"
                className="w-full rounded-xl shadow-md border border-gray-300"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 px-4 rounded-md shadow"
          >
            {loading ? 'Checking Freshness...' : 'Detect Freshness'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow">
            <p className="text-lg font-semibold text-green-800">Freshness Result:</p>
            <p className="text-2xl text-green-900 mt-2">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Freshness;
