import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, X, RefreshCw } from 'lucide-react';
import { analyzeSEOIssues, generateSearchOptimizationReport, fixCommonSEOIssues } from '../utils/seoOptimizer';

interface SEOMonitorProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SEOMonitor: React.FC<SEOMonitorProps> = ({ isVisible, onClose }) => {
  const [seoReport, setSeoReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoFixApplied, setAutoFixApplied] = useState<string[]>([]);

  useEffect(() => {
    if (isVisible) {
      generateReport();
    }
  }, [isVisible]);

  const generateReport = async () => {
    setIsLoading(true);
    try {
      const report = generateSearchOptimizationReport();
      setSeoReport(report);
    } catch (error) {
      console.error('Error generating SEO report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyAutoFixes = () => {
    const fixes = fixCommonSEOIssues();
    setAutoFixApplied(fixes);
    // Regenerate report after fixes
    setTimeout(generateReport, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              SEO Monitor
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={generateReport}
              disabled={isLoading}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Refresh SEO analysis"
              title="Refresh SEO analysis"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Close SEO monitor"
              title="Close SEO monitor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Analyzing SEO issues...</p>
            </div>
          ) : seoReport ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {seoReport.issues.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    SEO Status: {seoReport.issues.success ? 'Good' : 'Needs Attention'}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {seoReport.issues.issues.length} issues found, {seoReport.issues.recommendations.length} recommendations available
                </p>
              </div>

              {/* Issues */}
              {seoReport.issues.issues.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Issues Found
                  </h3>
                  <div className="space-y-2">
                    {seoReport.issues.issues.map((issue: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-red-800 dark:text-red-200">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {seoReport.recommendations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Recommendations
                  </h3>
                  <div className="space-y-2">
                    {seoReport.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-800 dark:text-blue-200">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Fixes */}
              {seoReport.technicalFixes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Technical Fixes Applied
                  </h3>
                  <div className="space-y-2">
                    {seoReport.technicalFixes.map((fix: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800 dark:text-green-200">{fix}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Auto Fixes Applied */}
              {autoFixApplied.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Auto-Fixes Applied
                  </h3>
                  <div className="space-y-2">
                    {autoFixApplied.map((fix: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800 dark:text-green-200">{fix}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={applyAutoFixes}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Auto-Fixes
                </button>
                <button
                  onClick={generateReport}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Refresh Analysis
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Unable to generate SEO report</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SEOMonitor; 