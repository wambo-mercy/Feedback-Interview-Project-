import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/api/feedbacks', formData);
      setSuccess('Feedback submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 p-8 bg-[#1c1c1c] text-white rounded-2xl shadow-2xl border border-[#C29F6C]"
    >
      <h2 className="text-4xl font-bold text-[#C29F6C] mb-4 font-classy">Leave Your Feedback</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-[#121212] border border-[#C29F6C] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C29F6C] outline-none"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-[#121212] border border-[#C29F6C] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C29F6C] outline-none"
      />

      <textarea
        name="message"
        placeholder="Your Feedback"
        value={formData.message}
        onChange={handleChange}
        rows="5"
        className="w-full p-4 rounded-lg bg-[#121212] border border-[#C29F6C] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C29F6C] outline-none"
      />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C29F6C] text-black font-semibold py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg"
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
