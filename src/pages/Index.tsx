
import { NavLink } from 'react-router-dom';
import { 
  Activity, 
  Star,
  ArrowRight,
  FileText,
  Stethoscope,
  History,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Report Analysis',
      description: 'Upload images, PDFs, or voice notes and get comprehensive medical report summaries with AI-powered insights.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Stethoscope,
      title: 'AI Doctor Assistant',
      description: 'Chat with our AI doctor for instant medical guidance, doctor recommendations, and preliminary health assessments.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: History,
      title: 'Medical History Tracking',
      description: 'Maintain comprehensive records of all your medical sessions, reports, and health data in one secure place.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss appointments or medications with our intelligent reminder system that adapts to your schedule.',
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'This platform has revolutionized how I manage my health. The AI insights are incredibly accurate.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      content: 'The report analysis feature saves me hours of work. Highly recommend for both patients and doctors.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Chronic Care Patient',
      content: 'The reminder system has helped me stay on track with my medications. Life-changing technology.',
      rating: 5
    }
  ];
  return (
		<div className="min-h-screen bg-white">
			<nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-3">
							<Activity className="h-8 w-8 text-blue-600" />
							<span className="text-2xl font-bold text-gray-900">careTracker</span>
						</div>
						<NavLink to="/dashboard">
							<Button className="bg-blue-600 hover:bg-blue-700 text-white">
								Get Started
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</NavLink>
					</div>
				</div>
			</nav>
			<section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-32">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<div className="space-y-4">
								<h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
									Your Health,
									<span className="text-blue-600 block">Simplified</span>
								</h1>
								<p className="text-xl text-gray-600 leading-relaxed">
									Experience the future of healthcare with AI-powered report
									analysis, virtual doctor consultations, and comprehensive
									health management tools.
								</p>
							</div>
							<div className="flex flex-col sm:flex-row gap-4">
								<NavLink to="/dashboard">
									<Button
										size="lg"
										className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
										Start with AI Doctor
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</NavLink>
							</div>
						</div>
						<div className="relative">
							<div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-8 shadow-2xl">
								<img
									src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80"
									alt="Healthcare professional using technology"
									className="w-full h-auto rounded-lg shadow-lg"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Comprehensive Healthcare Solutions
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							From AI-powered diagnostics to personalized care management, we
							provide everything you need for better health outcomes.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
								<CardContent className="p-6">
									<div
										className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
										<feature.icon className="h-6 w-6" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-3">
										{feature.title}
									</h3>
									<p className="text-gray-600">{feature.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
			<section className="py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Trusted by Healthcare Professionals
						</h2>
						<p className="text-xl text-gray-600">
							See what our users say about their experience
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card key={index} className="bg-white border border-gray-200">
								<CardContent className="p-6">
									<div className="flex items-center mb-4">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star
												key={i}
												className="h-5 w-5 text-yellow-400 fill-current"
											/>
										))}
									</div>
									<p className="text-gray-700 mb-4 italic">
										"{testimonial.content}"
									</p>
									<div>
										<p className="font-semibold text-gray-900">
											{testimonial.name}
										</p>
										<p className="text-sm text-gray-600">{testimonial.role}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
			<footer className="bg-gray-900 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8">
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<Activity className="h-8 w-8 text-blue-400" />
								<span className="text-2xl font-bold">CareTracker</span>
							</div>
							<p className="text-gray-400">
								Revolutionizing healthcare with AI-powered solutions for better
								patient outcomes.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Platform</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<NavLink
										to="/dashboard"
										className="hover:text-white transition-colors">
										Dashboard
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/report-summarizer"
										className="hover:text-white transition-colors">
										Report Analysis
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/doctor-ai"
										className="hover:text-white transition-colors">
										AI Doctor
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/medical-history"
										className="hover:text-white transition-colors">
										Medical History
									</NavLink>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Support</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Help Center
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Contact Us
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Privacy Policy
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Terms of Service
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Connect</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Twitter
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										LinkedIn
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Facebook
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Newsletter
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Index;
