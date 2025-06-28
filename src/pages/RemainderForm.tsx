import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ReminderFormProps {
	onSave: (data: { text: string; date: string }) => void;
	onClose: () => void;
}

export default function ReminderForm({ onSave, onClose }: ReminderFormProps) {
	const [text, setText] = useState("");
	const [date, setDate] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave({ text, date });
		onClose();
		setText("");
		setDate("");
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
			<form
				className="bg-white p-6 rounded-md w-full max-w-md"
				onSubmit={handleSubmit}>
				<h2 className="text-xl font-semibold mb-4">New Reminder</h2>

				<label className="block mb-3">
					<span className="text-gray-700">Reminder Text</span>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</label>

				<label className="block mb-4">
					<span className="text-gray-700">Date & Time</span>
					<input
						type="datetime-local"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</label>

				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">Save</Button>
				</div>
			</form>
		</div>
	);
}
