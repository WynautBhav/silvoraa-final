'use client';
import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { Download, Upload, AlertCircle, CheckCircle, X, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { generateCsvTemplate, validateAndParseRow, ValidationResult, CsvProductRow } from '@/lib/csvHelper';
import { supabase } from '@/lib/appwrite';
import { StoneType, ProductType } from '@/types';

interface ImportProductsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const ImportProductsModal: React.FC<ImportProductsModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [step, setStep] = useState<'upload' | 'preview' | 'importing' | 'complete'>('upload');
    const [parsedRows, setParsedRows] = useState<ValidationResult[]>([]);
    const [importLog, setImportLog] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleDownloadTemplate = () => {
        const csvContent = generateCsvTemplate();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'silvoraa_product_template.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (!uploadedFile) return;
        Papa.parse(uploadedFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const rows = results.data as CsvProductRow[];
                const validated = rows.map(validateAndParseRow);
                setParsedRows(validated);
                setStep('preview');
            },
            error: (error) => { console.error(error); alert('Error parsing CSV'); }
        });
    };

    const handleImport = async () => {
        setStep('importing');
        const validRows = parsedRows.filter(r => r.valid);
        const log: string[] = [];
        let successCount = 0;

        for (const row of validRows) {
            if (!row.parsedProduct) continue;
            try {
                const productData: any = { ...row.parsedProduct, updated_at: new Date().toISOString() };
                if (!productData.id) { delete productData.id; productData.created_at = new Date().toISOString(); }
                const { error } = await supabase.from('products').upsert(productData);
                if (error) throw error;
                successCount++;
                log.push(`✅ Saved: ${productData.title}`);
            } catch (error: any) {
                console.error(error);
                log.push(`❌ Failed: ${row.parsedProduct.title} - ${error.message}`);
            }
        }
        setImportLog(log);
        setStep('complete');
        if (successCount > 0) onSuccess();
    };

    const validCount = parsedRows.filter(r => r.valid).length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-gray-900">Import Products</h2>
                        <p className="text-sm text-gray-500">Bulk create or update inventory via CSV</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {step === 'upload' && (
                        <div className="space-y-8">
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                                <h3 className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-3"><AlertCircle className="w-4 h-4" /> Import Guidelines</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800/80">
                                    <div>
                                        <p className="font-semibold mb-1 text-blue-900">Required Column Headers:</p>
                                        <code className="block bg-white/50 p-2 rounded border border-blue-100 text-xs font-mono mb-2">title, price, type, stone</code>
                                        <p>Other columns optional. <span className="font-semibold">id</span> is used for updating existing products.</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-1 text-blue-900">Accepted Values:</p>
                                        <div className="flex flex-col gap-1 text-xs">
                                            <div><span className="font-semibold">Type:</span> {Object.values(ProductType).join(', ')}</div>
                                            <div><span className="font-semibold">Stone:</span> {Object.values(StoneType).slice(0, 5).join(', ')}... (+ more)</div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleDownloadTemplate} className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors border border-blue-200 bg-white">
                                    <FileSpreadsheet className="w-4 h-4" /> Download CSV Template
                                </button>
                            </div>
                            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-silvoraa-gold hover:bg-silvoraa-gold/5 transition-all group">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-silvoraa-gold" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Click to upload CSV</h3>
                                <p className="text-sm text-gray-500 mt-1">or drag and drop file here</p>
                                <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                            </div>
                        </div>
                    )}

                    {step === 'preview' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">Preview Data</h3>
                                <div className="text-sm">
                                    <span className="text-green-600 font-medium">{validCount} Valid</span>
                                    <span className="mx-2 text-gray-300">|</span>
                                    <span className="text-red-500 font-medium">{parsedRows.length - validCount} Invalid</span>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                <div className="overflow-x-auto max-h-[400px]">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                                            <tr>
                                                <th className="px-4 py-3 w-10">Status</th>
                                                <th className="px-4 py-3">Title</th>
                                                <th className="px-4 py-3">Price</th>
                                                <th className="px-4 py-3">Type</th>
                                                <th className="px-4 py-3">Stone</th>
                                                <th className="px-4 py-3">Errors</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {parsedRows.map((row, idx) => (
                                                <tr key={idx} className={row.valid ? 'bg-white' : 'bg-red-50'}>
                                                    <td className="px-4 py-3 text-center">{row.valid ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}</td>
                                                    <td className="px-4 py-3 font-medium text-gray-900">{row.row.title || 'N/A'}</td>
                                                    <td className="px-4 py-3">{row.row.price}</td>
                                                    <td className="px-4 py-3">{row.row.type}</td>
                                                    <td className="px-4 py-3">{row.row.stone}</td>
                                                    <td className="px-4 py-3 text-red-600 font-medium text-xs">{row.errors.join(', ')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'importing' && (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <RefreshCw className="w-12 h-12 text-silvoraa-gold animate-spin" />
                            <h3 className="text-lg font-medium text-gray-900">Processing Import...</h3>
                            <p className="text-sm text-gray-500">Please do not close this window.</p>
                        </div>
                    )}

                    {step === 'complete' && (
                        <div className="bg-gray-900 text-gray-300 font-mono text-xs p-4 rounded-xl max-h-[400px] overflow-y-auto">
                            {importLog.map((line, i) => <div key={i} className="mb-1">{line}</div>)}
                        </div>
                    )}
                </div>

                <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                    {step === 'preview' && (
                        <>
                            <button onClick={() => setStep('upload')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Back</button>
                            <button onClick={handleImport} disabled={validCount === 0} className="px-6 py-2 text-sm font-medium text-white bg-silvoraa-black hover:bg-gray-800 rounded-lg shadow-lg shadow-gray-200 disabled:opacity-50 transition-all">Import {validCount} Products</button>
                        </>
                    )}
                    {step === 'complete' && <button onClick={onClose} className="px-6 py-2 text-sm font-medium text-white bg-silvoraa-black hover:bg-gray-800 rounded-lg shadow-lg shadow-gray-200 transition-all">Close</button>}
                    {step === 'upload' && <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Cancel</button>}
                </div>
            </div>
        </div>
    );
};
