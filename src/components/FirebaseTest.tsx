import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const FirebaseTest: React.FC = () => {
  const { isAuthenticated, user, isLoading, error } = useAuth();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Firebase Auth Test</h3>
      
      <div className="space-y-2 text-sm">
        <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {user ? user.name : 'None'}</p>
        <p><strong>Error:</strong> {error || 'None'}</p>
      </div>
      
      <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
        <p className="text-xs text-blue-800 dark:text-blue-400">
          If you see this component and no errors, Firebase is working correctly!
        </p>
      </div>
    </div>
  );
}; 