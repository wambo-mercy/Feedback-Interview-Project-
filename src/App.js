import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  return (
    <div className="min-h-screen bg-black text-light flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-4xl font-bold text-primary mb-10">Simple Feedback Manager</h1>
      <div className="w-full max-w-2xl space-y-6">
        <FeedbackForm />
        <FeedbackList />
      </div>
    </div>
  );
}

export default App;
