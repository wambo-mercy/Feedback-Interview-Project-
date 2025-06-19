import { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/feedbacks');
      setFeedbacks(res.data);
    } catch (err) {
      setError('Could not fetch feedbacks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6 bg-dark text-light rounded-xl shadow-lg border border-primary mt-8">
      <h2 className="text-2xl font-semibold text-primary mb-4">Feedback Wall</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {feedbacks.map(feedback => (
          <li key={feedback._id} className="p-4 border border-primary rounded">
            <p className="text-primary font-medium">{feedback.name}</p>
            <p className="italic text-light">{feedback.message}</p>
            <p className="text-sm text-gray-400">{new Date(feedback.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
