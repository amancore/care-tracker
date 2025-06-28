import { useState, useRef } from "react";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, FileText, Image, Mic, Calendar, Edit, Trash2, Eye, } from "lucide-react";
interface MediRecord {
	id: number;
	date: string;
	type: string;
	title: string;
	summary: string;
	doctor: string;
	category: string;
	status: "completed" | "pending" | "archived";
	files: string[];
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}
export default function MedicalHistory() {
	const [rec, setRec] = useState<MediRecord[]>([
		{
			id: 1,
			date: "2024-01-15",
			type: "report",
			title: "Blood Test Results",
			summary: "Blood count normal, slight white blood cell increase.",
			doctor: "Dr. Sarah Johnson",
			category: "Laboratory",
			status: "completed",
			files: ["blood_test_jan2024.pdf"],
			icon: FileText,
			color: "text-blue-600 bg-blue-100",
		},
		{
			id: 2,
			date: "2024-01-10",
			type: "consultation",
			title: "Cardiology Checkup",
			summary: "ECG and blood pressure are normal.",
			doctor: "Dr. Michael Chen",
			category: "Cardiology",
			status: "completed",
			files: ["ecg_results.pdf", "consultation_notes.txt"],
			icon: FileText,
			color: "text-red-600 bg-red-100",
		},
		{
			id: 3,
			date: "2024-01-05",
			type: "imaging",
			title: "Chest X-Ray",
			summary: "Lungs clear, no issues detected.",
			doctor: "Dr. Emily Davis",
			category: "Radiology",
			status: "completed",
			files: ["chest_xray.jpg"],
			icon: Image,
			color: "text-purple-600 bg-purple-100",
		},
		{
			id: 4,
			date: "2023-12-20",
			type: "voice",
			title: "Symptom Recording",
			summary: "Voice note on headaches and sleep patterns.",
			doctor: "Self-recorded",
			category: "Symptoms",
			status: "archived",
			files: ["symptoms_dec2023.mp3"],
			icon: Mic,
			color: "text-green-600 bg-green-100",
		},
		{
			id: 5,
			date: "2023-12-15",
			type: "report",
			title: "Annual Physical Exam",
			summary: "Complete checkup; recommended lifestyle adjustments.",
			doctor: "Dr. Robert Wilson",
			category: "General Medicine",
			status: "completed",
			files: ["annual_exam_2023.pdf", "lab_results.pdf"],
			icon: FileText,
			color: "text-orange-600 bg-orange-100",
		},
	]);
	const [stemp, setStemp] = useState("");
	const [filter, setFilter] = useState<MediRecord["type"] | "all">(
		"all"
	);
	const [currRec, setSelectedRecord] = useState<MediRecord | null>(
		null
	);
	const [isView, setisView] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editCon, setEditCon] = useState("");
	function search() {
		return rec.filter((record) => {
			const temp =
				record.title.toLowerCase().includes(stemp.toLowerCase()) ||
				record.summary.toLowerCase().includes(stemp.toLowerCase()) ||
				record.doctor.toLowerCase().includes(stemp.toLowerCase());
			return temp && filter === "all" || record.type === filter;
		});
	}
	function getClass(status: MediRecord["status"]) {
		if (status === "completed") return "bg-green-100 text-green-800";
		if (status === "pending") return "bg-yellow-100 text-yellow-800";
		return "bg-gray-100 text-gray-800";
	}
	function openView(record: MediRecord, edit = false) {
		setSelectedRecord(record);
		setEditCon(record.summary);
		setEdit(edit);
		setisView(true);
	}
	function downFile(record: MediRecord) {
		if (record.files.length) {
			window.open(record.files[0], "_blank");
		} else {
			alert("No files available for download.");
		}
	}
	function delRecord(recordId: number) {
		if (confirm("Delete this record?")) {
			setRec((prev) => prev.filter((r) => r.id !== recordId));
		}
	}
	const seenRec = search();
	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<BackButton />
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Medical History</h1>
				<p className="text-gray-600">
					View and manage your health rec in one place.
				</p>
			</header>
			<Card className="mb-6">
				<CardContent className="p-6 flex flex-col sm:flex-row gap-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search rec..."
							value={stemp}
							onChange={(e) => setStemp(e.target.value)}
							className="pl-10"
						/>
					</div>
					<select
						value={filter}
						onChange={(e) =>
							setFilter(e.target.value as MediRecord["type"] | "all")
						}
						className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500">
						<option value="all">All Records</option>
						<option value="report">Reports</option>
						<option value="consultation">Consultations</option>
						<option value="imaging">Images</option>
						<option value="voice">Voice Notes</option>
					</select>
					<Button variant="outline" className="flex items-center">
						<Filter className="h-4 w-4 mr-2" />
						Filter
					</Button>
				</CardContent>
			</Card>
			<div className="space-y-4">
				{seenRec.length === 0 && (
					<Card>
						<CardContent className="p-12 text-center">
							<FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No Records Found
							</h3>
							<p className="text-gray-600">
								Try adjusting your search or filter options.
							</p>
						</CardContent>
					</Card>
				)}
				{seenRec.map((record) => (
					<Card
						key={record.id}
						className="hover:shadow-md transition-shadow border-gray-200">
						<CardHeader className="flex items-start justify-between p-6">
							<div className="flex items-start space-x-4 flex-1">
								<div
									className={`${record.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
									<record.icon className="h-6 w-6" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center space-x-3 mb-2">
										<h3 className="text-lg font-semibold text-gray-900">
											{record.title}
										</h3>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getClass(
												record.status
											)}`}>
											{record.status}
										</span>
									</div>
									<p className="text-gray-600 mb-3">{record.summary}</p>
									<div className="flex items-center text-sm text-gray-500 space-x-2">
										<Calendar className="h-4 w-4" />
										<span>{new Date(record.date).toLocaleDateString()}</span>
										<span>•</span>
										<span>{record.doctor}</span>
										<span>•</span>
										<span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
											{record.category}
										</span>
									</div>
									<div className="flex flex-row">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => openView(record)}>
											<Eye className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => openView(record, true)}>
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => downFile(record)}>
											<Download className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											className="hover:text-red-600"
											onClick={() => delRecord(record.id)}>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</CardHeader>
					</Card>
				))}
			</div>
			{isView && currRec && (
				<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
						<button
							className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
							onClick={() => setisView(false)}>
							×
						</button>
						<h2 className="text-xl font-bold mb-4">{currRec.title}</h2>
						{edit ? (
							<textarea
								value={editCon}
								onChange={(e) => setEditCon(e.target.value)}
								rows={8}
								className="w-full border rounded"
							/>
						) : (
							<div>{currRec.summary}</div>
						)}
						<div className="text-sm text-gray-500 mb-4 space-y-1">
							<div>Date: {new Date(currRec.date).toLocaleDateString()}</div>
							<div>Doctor: {currRec.doctor}</div>
							<div>Category: {currRec.category}</div>
							<div>Status: {currRec.status}</div>
						</div>
						{currRec.files.length > 0 && (
							<div className="mb-4">
								<div className="font-semibold mb-2">Attachments:</div>
								<ul className="list-disc list-inside text-gray-700">
									{currRec.files.map((file, index) => (
										<li key={index}>{file}</li>
									))}
								</ul>
							</div>
						)}
						<div className="flex space-x-3">
							{edit && (
								<Button
									variant="outline"
									onClick={() => {
										setRec(prev =>
											prev.map(r =>
												r.id === currRec.id
													? { ...r, summary: editCon } 
													: r
											)
										);
										setisView(false);
									}}>
									Save
								</Button>
							)}
							<Button onClick={() => setisView(false)}>
								{edit ? "Cancel" : "Close"}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}