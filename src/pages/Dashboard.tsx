import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Activity,
	Heart,
	Calendar,
	FileText,
	TrendingUp,
	Users,
	Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const stats = [
		{
			title: "Health Score",
			value: "85%",
			change: "+2%",
			icon: Heart,
			color: "text-green-600",
		},
		{
			title: "Reports Analyzed",
			value: "24",
			change: "+3",
			icon: FileText,
			color: "text-blue-600",
		},
		{
			title: "Upcoming Appointments",
			value: "3",
			change: "2 this week",
			icon: Calendar,
			color: "text-orange-600",
		},
		{
			title: "Medications Active",
			value: "5",
			change: "2 due today",
			icon: Activity,
			color: "text-purple-600",
		},
	];

	const recentActivity = [
		{
			type: "Report",
			title: "Blood Test Results",
			date: "2 hours ago",
			status: "completed",
		},
		{
			type: "Consultation",
			title: "Dr. Smith - Cardiology",
			date: "1 day ago",
			status: "completed",
		},
		{
			type: "Medication",
			title: "Lisinopril - Morning dose",
			date: "8 hours ago",
			status: "taken",
		},
		{
			type: "Report",
			title: "X-Ray Analysis",
			date: "3 days ago",
			status: "pending",
		},
	];

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<BackButton />

			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					CareTracker Dashboard
				</h1>
				<p className="text-gray-600">
					Welcome back! Here's your health overview.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{stats.map((stat, idx) => (
					<Card key={idx} className="bg-white border border-gray-200">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-600">
										{stat.title}
									</p>
									<p className="text-2xl font-bold text-gray-900">
										{stat.value}
									</p>
									<p className={`text-sm ${stat.color}`}>{stat.change}</p>
								</div>
								<div className="p-3 rounded-full bg-gray-100">
									<stat.icon className={`h-6 w-6 ${stat.color}`} />
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid lg:grid-cols-2 gap-6">
				<Card className="bg-white border border-gray-200">
					<CardHeader>
						<CardTitle className="flex items-center">
							<Clock className="h-5 w-5 mr-2 text-gray-600" /> Recent Activity
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentActivity.map((act, i) => (
								<div
									key={i}
									className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
									<div
										className={`w-3 h-3 rounded-full ${
											act.status === "completed"
												? "bg-green-500"
												: act.status === "taken"
												? "bg-blue-500"
												: "bg-yellow-500"
										}`}
									/>
									<div className="flex-1">
										<p className="font-medium text-gray-900">{act.title}</p>
										<p className="text-sm text-gray-600">
											{act.type} • {act.date}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white border border-gray-200">
					<CardHeader>
						<CardTitle className="flex items-center">
							<TrendingUp className="h-5 w-5 mr-2 text-gray-600" /> Quick
							Actions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-4">
							<Link
								to="/report-summarizer"
								className="block p-4 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
								<FileText className="h-8 w-8 text-blue-600 mb-2" />
								<p className="font-medium text-gray-900">Upload Report</p>
								<p className="text-sm text-gray-600">
									Analyze new medical documents
								</p>
							</Link>

							<Link
								to="/doctor-ai"
								className="block p-4 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
								<Users className="h-8 w-8 text-green-600 mb-2" />
								<p className="font-medium text-gray-900">Consult AI Doctor</p>
								<p className="text-sm text-gray-600">
									Get instant medical guidance
								</p>
							</Link>

							<Link
								to="/reminders"
								className="block p-4 text-left rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
								<Calendar className="h-8 w-8 text-purple-600 mb-2" />
								<p className="font-medium text-gray-900">Schedule Reminder</p>
								<p className="text-sm text-gray-600">
									Set medication or appointment alerts
								</p>
							</Link>

							<Link
								to="/medical-history"
								className="block p-4 text-left rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
								<Activity className="h-8 w-8 text-orange-600 mb-2" />
								<p className="font-medium text-gray-900">View History</p>
								<p className="text-sm text-gray-600">
									Browse past medical records
								</p>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
