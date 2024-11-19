import { Link } from 'react-router-dom';

function InvalidLinkPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold arc-text mb-4">Invalid Link</h1>
        <p className="text-xl text-gray-700 mb-4">Invalid link was provided.</p>
        <Link to="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InvalidLinkPage;
