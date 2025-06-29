import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";

interface Message {
	id: number;
	sender: string;
	content: string;
	timestamp: string;
}

interface SymtomChatbotProps {
	initialMessages: Message[];
	onNewMessage: (message: Message) => void;
}

export const SymptomChatbot: React.FC<SymtomChatbotProps> = ({
	initialMessages,
	onNewMessage,
}) => {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [newMessage, setNewMessage] = useState("");

	const symptomQuestions = [
		"Are you experiencing fever?",
		"Do you have any body aches?",
		"Are you feeling nauseous?",
		"Have you noticed any skin changes?",
	];

	const handleSendMessage = () => {
		if (!newMessage.trim()) return;

		const userMessage: Message = {
			id: messages.length + 1,
			sender: "user",
			content: newMessage,
			timestamp: new Date().toLocaleTimeString(),
		};

		const updatedMessages = [...messages, userMessage];
		setMessages(updatedMessages);
		onNewMessage(userMessage);
		setNewMessage("");

		setTimeout(() => {
			const aiResponse = generateAIResponse(newMessage);
			const aiMessage: Message = {
				id: updatedMessages.length + 1,
				sender: "ai",
				content: aiResponse,
				timestamp: new Date().toLocaleTimeString(),
			};
			setMessages([...updatedMessages, aiMessage]);
			onNewMessage(aiMessage);
		}, 800);
	};

	const generateAIResponse = (userInput: string) => {
		const input = userInput.toLowerCase();
		if (input.includes("yes") || input.includes("fever")) {
			return "I see you're experiencing fever. Can you tell me more about your symptoms?";
		}
		if (input.includes("no")) {
			return "Okay, let's explore other potential symptoms.";
		}
		return "I'm trying to understand your symptoms. Could you please answer clearly?";
	};

	return (
		<div className="h-50 flex flex-col">
			<div className="flex-1 w-100px space-y-4 mb-10">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.sender === "user" ? "justify-end" : "justify-start"
						}`}>
						<div
							className={`max-w-[80%] p-3 rounded-lg ${
								msg.sender === "user"
									? "bg-blue-600 text-white"
									: "bg-gray-100 text-gray-900"
							}`}>
							<div className="flex items-start space-x-2">
								{msg.sender === "ai" ? (
									<Bot className="mt-1 text-blue-600" />
								) : (
									<User className="mt-1" />
								)}
								<div>
									<p className="text-sm">{msg.content}</p>
									<p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="mt-4">
				<div className="mb-2 flex flex-wrap gap-2">
					{symptomQuestions.map((q, index) => (
						<Button
							key={index}
							variant="outline"
							size="sm"
							onClick={() => setNewMessage(q)}>
							{q}
						</Button>
					))}
				</div>
				<div className="flex space-x-2">
					<Input
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Describe your symptoms..."
						onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
						className="flex-1"
					/>
					<Button
						onClick={handleSendMessage}
						className="bg-blue-600 text-white">
						<Send />
					</Button>
				</div>
			</div>
		</div>
	);
};
