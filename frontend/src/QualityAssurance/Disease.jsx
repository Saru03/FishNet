import React, { useState } from 'react';
import axios from 'axios';

const Disease = () => {
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
      const response = await axios.post('http://localhost:8000/api/disease-predict/', formData);
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Prediction failed:', error);
      setResult('Prediction failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🐟 Fish Disease Prediction
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
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded-md shadow"
          >
            {loading ? 'Predicting...' : 'Predict Disease'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow">
            <p className="text-lg font-semibold text-blue-800">Prediction Result:</p>
            <p className="text-2xl text-blue-900 mt-2">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Disease;
