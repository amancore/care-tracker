import React, { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Bot, Image as ImageIcon } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { SymptomChatbot } from "./SymptomChatbot";
import axios from "axios";

type Message = {
	id: number;
	sender: string;
	content: string;
	timestamp: string;
	image?: string;
};

const MedicalAI: React.FC = () => {
	const [mode, setMode] = useState<"image" | "chat">("image");
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			sender: "ai",
			content:
				"Upload an image of your medical concern or start a symptom chat.",
			timestamp: new Date().toLocaleTimeString(),
		},
	]);

	const handleImageUpload = async (imageFile: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setUploadedImage(reader.result as string);
		};
		reader.readAsDataURL(imageFile);
		const formData = new FormData();
		formData.append("image", imageFile);
		try {
			await axios.post("/api/preanalysis/", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			const newMessage: Message = {
				id: messages.length + 1,
				sender: "user",
				content: "Image uploaded for analysis",
				timestamp: new Date().toLocaleTimeString(),
				image: reader.result as string,
			};
			setMessages([...messages, newMessage]);
		} catch (error) {
			console.error("Error uploading image:", error);
			const errorMessage: Message = {
				id: messages.length + 1,
				sender: "ai",
				content: "Failed to upload image. Please try again.",
				timestamp: new Date().toLocaleTimeString(),
			};
			setMessages([...messages, errorMessage]);
		}
	};

	const toggleMode = () => {
		setMode(mode === "image" ? "chat" : "image");
	};

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<BackButton />
			<h1 className="text-3xl font-bold mb-2">Medical Diagnostic Assistant</h1>
			<p className="text-gray-600 mb-8">
				Upload images or chat about your symptoms
			</p>

			<div className="grid lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<Card className="bg-white h-[600px] flex flex-col">
						<CardHeader className="flex flex-row justify-between items-center">
							<CardTitle className="flex items-center">
								<Bot className="mr-2 text-blue-600" />
								{mode === "image" ? "Image Analysis" : "Symptom Chat"}
							</CardTitle>
							<Button
								variant="outline"
								onClick={toggleMode}
								className="flex items-center space-x-2">
								{mode === "image" ? <Send /> : <ImageIcon />}
								<span>
									{mode === "image" ? "Switch to Chat" : "Switch to Image"}
								</span>
							</Button>
						</CardHeader>

						<CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
							{mode === "image" ? (
								<ImageUploader onImageUpload={handleImageUpload} />
							) : (
								<SymptomChatbot
									initialMessages={messages}
									onNewMessage={(newMessage) =>
										setMessages([...messages, newMessage])
									}
								/>
							)}
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					{uploadedImage && (
						<Card className="bg-white overflow-y-auto h-[600px]">
							<CardHeader>
								<CardTitle>Uploaded Image</CardTitle>
							</CardHeader>
							<CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
								{mode === "image" ? (
									<ImageUploader onImageUpload={handleImageUpload} />
								) : (
									<SymptomChatbot
										initialMessages={messages}
										onNewMessage={(newMessage) =>
											setMessages([...messages, newMessage])
										}
									/>
								)}
							</CardContent>
						</Card>
					)}

					<Card className="bg-yellow-50">
						<CardContent className="p-4">
							<h4 className="font-medium mb-1">Disclaimer</h4>
							<p className="text-sm">
								This is an AI assistant. Always consult a professional
								healthcare provider for accurate diagnosis.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default MedicalAI;
