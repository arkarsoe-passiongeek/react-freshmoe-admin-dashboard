import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
   fallback?: React.ReactNode
   children: React.ReactNode
}

interface ErrorBoundaryState {
   hasError: boolean
   error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
   constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true, error };
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
   }

   resetErrorBoundary = (): void => {
      this.setState({ hasError: false, error: null });
   };

   render() {
      if (this.state.hasError) {
         return this.props.fallback || (
            <div className="p-4 my-4 bg-red-100 border border-red-400 rounded-md w-full">
               <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
               <p className="text-red-600 mb-4">{this.state.error?.message || 'An unexpected error occurred.'}</p>
               <button
                  type='button'
                  onClick={this.resetErrorBoundary}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
               >
                  Try again
               </button>
            </div>
         );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;

