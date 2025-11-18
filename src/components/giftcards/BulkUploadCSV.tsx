/**
 * @component BulkUploadCSV
 * @description CSV file upload component for bulk gift card orders
 */

import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { validateCSVFile, downloadCSVTemplate } from '@/lib/giftcard/csvValidator';
import { BULK_ORDER_CONFIG } from '@/constants/giftcards';
import type { BulkOrderCSVRow, BulkOrderCSVError } from '@/types/giftcard.types';

interface BulkUploadCSVProps {
  onValidDataReceived: (validRows: BulkOrderCSVRow[]) => void;
  isProcessing?: boolean;
}

export default function BulkUploadCSV({ onValidDataReceived, isProcessing = false }: BulkUploadCSVProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    totalRows: number;
    validRows: BulkOrderCSVRow[];
    errors: BulkOrderCSVError[];
  } | null>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setValidationResult(null);
  };

  // Handle file validation
  const handleValidateFile = async () => {
    if (!selectedFile) {
      toast.error('Please select a CSV file');
      return;
    }

    setIsValidating(true);

    try {
      const result = await validateCSVFile(selectedFile);
      setValidationResult(result);

      if (result.valid) {
        toast.success(`File validated successfully! ${result.validRows.length} valid orders found.`);
        onValidDataReceived(result.validRows);
      } else {
        toast.error(`Validation failed. Found ${result.errors.length} error(s).`);
      }
    } catch (error) {
      console.error('Error validating CSV:', error);
      toast.error('Failed to validate CSV file. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  // Handle template download
  const handleDownloadTemplate = () => {
    downloadCSVTemplate();
    toast.success('Template downloaded successfully');
  };

  // Reset upload
  const handleReset = () => {
    setSelectedFile(null);
    setValidationResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Download Template */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bulk Upload Gift Cards</h2>
          <p className="text-gray-600">Upload a CSV file to order multiple gift cards at once</p>
        </div>

        <button
          onClick={handleDownloadTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#B76E79] text-[#B76E79] font-semibold rounded-lg hover:bg-[#B76E79] hover:text-white transition-all"
        >
          <Download className="w-4 h-4" />
          Download Template
        </button>
      </div>

      {/* Upload Requirements */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          CSV File Requirements
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Maximum {BULK_ORDER_CONFIG.MAX_ROWS} orders per file</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>File size limit: {BULK_ORDER_CONFIG.MAX_FILE_SIZE_MB}MB</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>
              Required columns: {BULK_ORDER_CONFIG.CSV_COLUMNS.join(', ')}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>
              Design themes: birthday, diwali, or general
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>
              Amount range: ₹{BULK_ORDER_CONFIG.MIN_AMOUNT.toLocaleString('en-IN')} - ₹
              {BULK_ORDER_CONFIG.MAX_AMOUNT.toLocaleString('en-IN')} (multiples of 100)
            </span>
          </li>
        </ul>
      </div>

      {/* File Upload Area */}
      {!selectedFile ? (
        <label className="block cursor-pointer">
          <div className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#E0BFB8] hover:bg-gray-50 transition-all">
            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-semibold text-gray-700 mb-2">Click to upload CSV file</p>
            <p className="text-sm text-gray-500">
              or drag and drop your file here
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Accepted formats: .csv (max {BULK_ORDER_CONFIG.MAX_FILE_SIZE_MB}MB)
            </p>
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
          />
        </label>
      ) : (
        <div className="border-2 border-gray-300 rounded-xl p-6">
          {/* Selected File Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#B76E79]" />
              <div>
                <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              disabled={isValidating || isProcessing}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove
            </button>
          </div>

          {/* Validate Button */}
          {!validationResult && (
            <button
              onClick={handleValidateFile}
              disabled={isValidating || isProcessing}
              className="w-full py-3 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Validating File...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Validate File
                </>
              )}
            </button>
          )}

          {/* Validation Results */}
          {validationResult && (
            <div className="mt-4">
              {validationResult.valid ? (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold text-green-800 text-lg mb-2">
                        Validation Successful!
                      </h4>
                      <div className="space-y-1 text-sm text-green-700">
                        <p>
                          <strong>{validationResult.validRows.length}</strong> valid gift card orders found
                        </p>
                        <p>
                          Total amount: ₹
                          {validationResult.validRows
                            .reduce((sum, row) => sum + row.amount, 0)
                            .toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold text-red-800 text-lg mb-3">
                        Validation Failed
                      </h4>
                      <p className="text-sm text-red-700 mb-3">
                        Found {validationResult.errors.length} error(s) in the file:
                      </p>

                      {/* Error List */}
                      <div className="max-h-64 overflow-y-auto bg-white rounded-lg border border-red-200">
                        <table className="w-full text-sm">
                          <thead className="bg-red-100 sticky top-0">
                            <tr>
                              <th className="px-3 py-2 text-left text-red-900">Row</th>
                              <th className="px-3 py-2 text-left text-red-900">Field</th>
                              <th className="px-3 py-2 text-left text-red-900">Error</th>
                            </tr>
                          </thead>
                          <tbody>
                            {validationResult.errors.map((error, index) => (
                              <tr key={index} className="border-t border-red-100">
                                <td className="px-3 py-2 text-red-700">{error.row}</td>
                                <td className="px-3 py-2 text-red-700 font-mono text-xs">
                                  {error.field}
                                </td>
                                <td className="px-3 py-2 text-red-600">{error.error}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <button
                        onClick={handleReset}
                        className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Upload Different File
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
