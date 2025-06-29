import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Stethoscope, 
  History, 
  Bell,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Report Summarizer", href: "/report-summarizer", icon: FileText },
	{ name: "Doctor AI", href: "/doctor-ai", icon: Stethoscope },
	{ name: "Medical History", href: "/medical-history", icon: History },
	{ name: "Reminders", href: "/reminders", icon: Bell },
	{ name: "Dieases Prediction", href: "/Dieases-prediction", icon: Bell },
];

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
		<div className="flex h-screen bg-gray-50">
			<div
				className={cn(
					"bg-white shadow-lg transition-all duration-300 ease-in-out",
					collapsed ? "w-28" : "w-64"
				)}>
				<div className="flex items-center justify-between p-4 border-b">
					<NavLink to="/" className="flex items-center space-x-3">
						<Activity className="h-8 w-8 text-blue-600" />
						{!collapsed && (
							<span className="text-xl font-bold text-gray-900">
								CareTracker
							</span>
						)}
					</NavLink>
					<button
						onClick={() => setCollapsed(!collapsed)}
						className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
						{collapsed ? (
							<ChevronRight className="h-5 w-5 text-gray-600" />
						) : (
							<ChevronLeft className="h-5 w-5 text-gray-600" />
						)}
					</button>
				</div>

				<nav className="mt-6 px-3">
					<ul className="space-y-2">
						{navigation.map((p) => {
							const isActive = location.pathname === p.href;
							return (
								<li key={p.name}>
									<NavLink
										to={p.href}
										className={cn(
											"flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
											isActive
												? "bg-blue-100 text-blue-700"
												: "text-gray-700 hover:bg-gray-100"
										)}>
										<p.icon className="h-5 w-5 flex-shrink-0" />
										{!collapsed && <span className="ml-3">{p.name}</span>}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>

			<div className="flex-1 overflow-auto">{children}</div>
		</div>
	);
}
