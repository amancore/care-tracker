import { useState, useRef } from 'react';
import { BackButton } from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, Mic, FileX, CheckCircle, AlertCircle } from 'lucide-react';

const getFileIcon = (file: File) => {
	if (file.type.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500 mr-2" />;
	if (file.type.startsWith('audio/')) return <Mic className="h-5 w-5 text-purple-600 mr-2" />;
	if (file.type === 'application/pdf') return <FileText className="h-5 w-5 text-red-500 mr-2" />;
	if (file.type.startsWith('text/')) return <FileX className="h-5 w-5 text-orange-600 mr-2" />;
	return <FileText className="h-5 w-5 text-gray-400 mr-2" />;
};

const ReportSummarizer = () => {
	const [dragActive, setDragActive] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [analysisResult, setAnalysisResult] = useState<any>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleSaveToHistory = () => {
		alert('Analysis saved to history!');
	};
	const handleShareWithDoctor = () => {
		alert('Analysis shared with doctor!');
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			setUploadedFiles(prev => [...prev, ...Array.from(files)]);
		}
	};
	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setUploadedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
		}
	};

	const handleRemoveFile = (index: number) => {
		setUploadedFiles(prev => prev.filter((_, i) => i !== index));
	};

	const simulateAnalysis = () => {
		if (uploadedFiles.length === 0) {
			alert('Please upload at least one file before analyzing.');
			return;
		}
		setAnalysisResult({
			category: 'Blood Test Results',
			summary: 'Complete Blood Count (CBC) analysis shows normal values for most parameters. Slight elevation in white blood cell count may indicate minor infection.',
			keyFindings: [
				'Hemoglobin: 14.2 g/dL (Normal)',
				'White Blood Cells: 12,000/μL (Slightly elevated)',
				'Platelets: 250,000/μL (Normal)',
				'Blood Sugar: 95 mg/dL (Normal)'
			],
			recommendations: [
				'Monitor white blood cell count',
				'Consider follow-up in 2 weeks',
				'Maintain hydration',
				'Contact doctor if symptoms persist'
			],
			urgency: 'low'
		});
	};
	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<BackButton />

			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Report Summarizer
				</h1>
				<p className="text-gray-600">
					Upload medical reports, images, or voice notes for AI-powered analysis
				</p>
			</div>

			<div className="grid lg:grid-cols-2 gap-6">
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					multiple
					accept=".pdf,image/*,audio/*,text/*"
					onChange={handleFileChange}
				/>
				<Card className="bg-white border border-gray-200">
					<CardHeader>
						<CardTitle>Upload Medical Documents</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
								dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400" }`}
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
							onClick={() => fileInputRef.current?.click()}
							style={{ cursor: 'pointer' }}
						>
							<Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								Drop files here or click to upload
							</h3>
							<p className="text-gray-600 mb-4">
								Supports PDF, images (JPG, PNG), audio files, and text documents
							</p>
						</div>

						{uploadedFiles.length > 0 && (
							<div className="mt-4">
								<h4 className="font-medium text-gray-900 mb-2">Uploaded Files</h4>
								<ul className="space-y-2">
									{uploadedFiles.map((file, idx) => (
										<li key={idx} className="flex items-center justify-between bg-gray-100 rounded px-3 py-2">
											<div className="flex items-center">
												{getFileIcon(file)}
												<span className="text-gray-800 text-sm truncate max-w-xs">{file.name}</span>
											</div>
											<button
												className="ml-2 text-gray-400 hover:text-red-500"
												onClick={e => {
													e.stopPropagation();
													handleRemoveFile(idx);
												}}
												title="Remove file"
												type="button"
											>
												&times;
											</button>
										</li>
									))}
								</ul>
							</div>
						)}

						<div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors mt-4">
							<Mic className="h-6 w-6 text-purple-600 mr-3" />
							<div>
								<p className="font-medium text-gray-900">Voice Notes</p>
								<p className="text-sm text-gray-600">Doctor consultations</p>
							</div>
						</div>

						<div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors mt-2">
							<FileX className="h-6 w-6 text-orange-600 mr-3" />
							<div>
								<p className="font-medium text-gray-900">Text Files</p>
								<p className="text-sm text-gray-600">Notes, summaries</p>
							</div>
						</div>

						<Button
							onClick={simulateAnalysis}
							className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
							Analyze Uploaded Files
						</Button>
					</CardContent>
				</Card>

				<Card className="bg-white border border-gray-200">
					<CardHeader>
						<CardTitle>Analysis Results</CardTitle>
					</CardHeader>
					<CardContent>
						{analysisResult ? (
							<div className="space-y-6">
								<div className="flex items-center space-x-2">
									<div
										className={`w-3 h-3 rounded-full ${ analysisResult.urgency === "high" ? "bg-red-500" : analysisResult.urgency === "medium" ? "bg-yellow-500" : "bg-green-500"
										}`}
									/>
									<span className="font-medium text-gray-900">
										{analysisResult.category}
									</span>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											analysisResult.urgency === "high"
												? "bg-red-100 text-red-800"
												: analysisResult.urgency === "medium"
												? "bg-yellow-100 text-yellow-800"
												: "bg-green-100 text-green-800"
										}`}>
										{analysisResult.urgency.toUpperCase()} PRIORITY
									</span>
								</div>

								<div>
									<h4 className="font-medium text-gray-900 mb-2">Summary</h4>
									<p className="text-gray-700">{analysisResult.summary}</p>
								</div>

								<div>
									<h4 className="font-medium text-gray-900 mb-2">
										Key Findings
									</h4>
									<ul className="space-y-2">
										{analysisResult.keyFindings.map((finding: string, index: number) => (
											<li key={index} className="flex items-start space-x-2">
												<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
												<span className="text-gray-700 text-sm">{finding}</span>
											</li>
										))}
									</ul>
								</div>

								<div>
									<h4 className="font-medium text-gray-900 mb-2">
										Recommendations
									</h4>
									<ul className="space-y-2">
										{analysisResult.recommendations.map((rec: string, index: number) => (
											<li key={index} className="flex items-start space-x-2">
												<AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
												<span className="text-gray-700 text-sm">{rec}</span>
											</li>
										))}
									</ul>
								</div>

								<div className="flex space-x-3 pt-4">
									<Button
										variant="outline"
										className="flex-1"
										onClick={handleSaveToHistory}>
										Save to History
									</Button>
									<Button
										className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
										onClick={handleShareWithDoctor}>
										Share with Doctor
									</Button>
								</div>
							</div>
						) : (
							<div className="text-center py-12">
								<FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									No Analysis Yet
								</h3>
								<p className="text-gray-600">
									Upload medical documents to get AI-powered insights and
									summaries
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ReportSummarizer;
