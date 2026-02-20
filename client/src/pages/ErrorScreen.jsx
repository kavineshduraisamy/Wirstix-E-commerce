import { useRouteError, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

const ErrorScreen = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="bg-red-50 p-6 rounded-full">
                            <AlertCircle className="h-16 w-16 text-red-500" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-accent font-medium text-secondary italic">Something went wrong</h1>
                        <p className="text-gray-500 font-light leading-relaxed">
                            {error.statusText || error.message || "We encountered an unexpected error while navigating TimeLux."}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary w-full sm:w-auto inline-flex items-center justify-center space-x-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span>Retry</span>
                        </button>
                        <Link
                            to="/"
                            className="btn-outline w-full sm:w-auto inline-flex items-center justify-center space-x-2"
                        >
                            <Home className="h-4 w-4" />
                            <span>Return Home</span>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ErrorScreen;
