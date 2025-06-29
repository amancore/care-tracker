import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
	onImageUpload: (imageData: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
	onImageUpload,
}) => {
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Show preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result as string);
			};
			reader.readAsDataURL(file);

			// Pass the file itself to the parent
			onImageUpload(file);
		}
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="flex flex-col items-center justify-center space-y-4 p-6 border-2 border-dashed rounded-lg">
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept="image/*"
				className="hidden"
			/>
			{previewImage ? (
				<img
					src={previewImage}
					alt="Preview"
					className="max-h-64 rounded-lg object-cover"
				/>
			) : (
				<div className="text-center">
					<Upload className="mx-auto h-12 w-12 text-gray-400" />
					<p className="mt-2 text-sm text-gray-600">
						Upload an image of your medical concern
					</p>
				</div>
			)}
			<Button onClick={triggerFileInput} className="mt-4">
				{previewImage ? "Change Image" : "Upload Image"}
			</Button>
		</div>
	);
};
