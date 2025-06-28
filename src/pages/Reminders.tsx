import { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Plus,
	CalendarDays,
	Clock,
	Pill,
	UserCheck,
	CheckCircle,
	AlertCircle,
} from "lucide-react";
import ReminderForm from "./RemainderForm";

interface ReminderData {
	id: number;
	title: string;
	description: string;
	date: string;
	time: string;
	type: "medication" | "appointment" | "checkup";
	completed: boolean;
	urgent: boolean;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

interface ReminderLists {
	past: ReminderData[];
	upcoming: ReminderData[];
	future: ReminderData[];
}

export default function Reminders() {
	const [activeTab, setActiveTab] = useState<keyof ReminderLists>("upcoming");
	const [isAdding, setIsAdding] = useState(false);
	const [reminders, setReminders] = useState<ReminderLists>({
		past: [
			{
				id: 1,
				title: "Take Morning Medication",
				description: "Lisinopril 10mg",
				date: "2024-01-14",
				time: "08:00 AM",
				type: "medication",
				completed: true,
				urgent: false,
				icon: Pill,
				color: "text-green-600 bg-green-100",
			},
		],
		upcoming: [
			{
				id: 2,
				title: "Evening Medication",
				description: "Metformin 500mg",
				date: "2024-01-15",
				time: "07:00 PM",
				type: "medication",
				completed: false,
				urgent: true,
				icon: Pill,
				color: "text-orange-600 bg-orange-100",
			},
		],
		future: [
			{
				id: 3,
				title: "Annual Physical Exam",
				description: "General health checkup",
				date: "2024-02-15",
				time: "10:00 AM",
				type: "appointment",
				completed: false,
				urgent: false,
				icon: UserCheck,
				color: "text-purple-600 bg-purple-100",
			},
		],
	});

	const openAddReminder = () => setIsAdding(true);
	const closeAddReminder = () => setIsAdding(false);

	const handleAddReminder = (data: {
		text: string;
		date: string;
		type: string;
	}) => {
		const when = new Date(data.date);
		const newReminder: ReminderData = {
			id: Date.now(),
			title: data.text,
			description: "",
			date: when.toLocaleDateString(),
			time: when.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
			type: "appointment",
			completed: false,
			urgent: when < new Date(Date.now() + 2 * 60 * 60 * 1000),
			icon: Pill,
			color: "text-green-600 bg-green-100",
		};

		setReminders((prev) => ({
			...prev,
			[activeTab]: [newReminder, ...prev[activeTab]],
		}));
		setIsAdding(false);
	};

	const toggleComplete = (id: number) => {
		setReminders((prev) => ({
			...prev,
			[activeTab]: prev[activeTab].map((r) =>
				r.id === id ? { ...r, completed: !r.completed } : r
			),
		}));
	};

	const handleDelete = (id: number) => {
		setReminders((prev) => ({
			...prev,
			[activeTab]: prev[activeTab].filter((r) => r.id !== id),
		}));
	};

	const tabs = [
		{ key: "past", label: "Past", count: reminders.past.length },
		{ key: "upcoming", label: "Upcoming", count: reminders.upcoming.length },
		{ key: "future", label: "Future", count: reminders.future.length },
	] as const;

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<BackButton />

			<div className="mb-8 flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Reminders</h1>
					<p className="text-gray-600">Manage your tasks</p>
				</div>
				<Button
					onClick={openAddReminder}
					className="bg-blue-600 hover:bg-blue-700 text-white">
					<Plus className="h-4 w-4 mr-2" />
					Add Reminder
				</Button>
			</div>

			<div className="mb-6 flex space-x-2">
				{tabs.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={`px-4 py-2 rounded ${
							activeTab === tab.key
								? "bg-white shadow"
								: "bg-gray-200 hover:bg-gray-300"
						}`}>
						{tab.label} ({tab.count})
					</button>
				))}
			</div>

			{isAdding && (
				<ReminderForm onSave={handleAddReminder} onClose={closeAddReminder} />
			)}

			<div className="space-y-4">
				{reminders[activeTab].length === 0 ? (
					<Card className="bg-white border border-gray-200">
						<CardContent className="p-12 text-center">
							<CalendarDays className="h-16 w-16 text-gray-300 mx-auto mb-4" />
							<h3 className="text-lg text-gray-900">
								No {activeTab} reminders
							</h3>
							<p className="text-gray-600">Add one to get started.</p>
						</CardContent>
					</Card>
				) : (
					reminders[activeTab].map((rem) => (
						<Card
							key={rem.id}
							className={`bg-white border ${
								rem.urgent ? "border-red-300 shadow" : "border-gray-200"
							}`}>
							<CardContent className="p-4 flex items-center">
								<Checkbox
									checked={rem.completed}
									onCheckedChange={() => toggleComplete(rem.id)}
									className="mr-4"
								/>
								<div className="flex-1">
									<div className="flex justify-between">
										<h3
											className={
												rem.completed
													? "line-through text-gray-500"
													: "text-gray-900"
											}>
											{rem.title}
										</h3>
										{rem.completed && (
											<CheckCircle className="text-green-600" />
										)}
									</div>
									<div className="flex items-center space-x-2 text-sm text-gray-500">
										<Clock className="h-4 w-4" />
										<span>
											{rem.date} {rem.time}
										</span>
									</div>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => handleDelete(rem.id)}>
									<AlertCircle className="text-red-600" />
								</Button>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
