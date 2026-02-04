import { CheckCircle, Star, Zap, Cloud, BarChart3, Home, Shield, Users, Building, Calendar, Video, TrendingUp, MessageSquare, Smartphone } from 'lucide-react';
import Button from './Button';

const PricingSection = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Start Growing Your Real Estate Business
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Designed for Pakistani Real Estate Market 🇵🇰 • Save fuel, time & money
                    </p>
                    <div className="mt-6 bg-gradient-to-r from-purple-100 to-blue-100 inline-flex items-center gap-2 px-4 py-2 rounded-full">
                        <Shield className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">
                            No hidden charges – cancel anytime
                        </span>
                    </div>
                </div>

                {/* Main Flex Container */}
                <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-8">
                    {/* Left Side: Card (Slightly larger) */}
                    <div className="w-full lg:w-3/5 max-w-2xl">
                        <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent">
                            {/* Most Popular Badge */}
                            <div className="hidden sm:block absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-1.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                                    <Star className="w-4 h-4 fill-white" />
                                    Most Popular Choice
                                </div>
                            </div>

                            {/* Plan Info */}
                            <div className="">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full w-fit">
                                        <Zap className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                            Professional Plan
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">Billed Monthly • Cancel Anytime</span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional - PKR 500/month</h3>

                                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 mb-6">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="text-center sm:text-left">
                                            <div className="flex items-baseline justify-center sm:justify-start mb-2">
                                                <span className="text-5xl font-bold text-gray-900">PKR 500</span>
                                                <span className="text-gray-500 ml-2 text-xl">/ month</span>
                                            </div>
                                            <p className="text-md text-purple-600 font-medium">
                                                Less than 17 PKR per day
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 text-center sm:text-left">
                                    Everything you need to manage your real estate business efficiently in Pakistan.
                                </p>

                                {/* CTA Button */}
                                <div>
                                    <Button label='Start' variant='theme2' size='lg' classNameC='w-full' />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Features Grid (Smaller) */}
                    <div className="w-full lg:w-2/5">
                        <div className="rounded-2xl p-4 lg:p-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 text-center lg:text-left">
                                Everything Included:
                            </h4>

                            <div className="grid grid-cols-1 gap-3 mb-6">
                                <CompactFeatureItem
                                    icon={<Users className="w-4 h-4" />}
                                    text="Unlimited Clients Addition"
                                />
                                <CompactFeatureItem
                                    icon={<Users className="w-4 h-4" />}
                                    text="Unlimited Owners Addition"
                                />
                                <CompactFeatureItem
                                    icon={<Building className="w-4 h-4" />}
                                    text="Unlimited Properties Addition"
                                />
                                <CompactFeatureItem
                                    icon={<Calendar className="w-4 h-4" />}
                                    text="Manage Meetings/Events Addition"
                                />
                                <CompactFeatureItem
                                    icon={<TrendingUp className="w-4 h-4" />}
                                    text="Analytics Dashboard"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Compact Feature Item Component
const CompactFeatureItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex-shrink-0 text-blue-500">
                {icon}
            </div>
            <div>
                <div className="text-sm font-medium text-gray-900">{text}</div>
            </div>
        </div>
    );
};

export default PricingSection;