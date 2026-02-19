// components/PropertyCard.tsx
import { Home, Bed, Bath, Square, MapPin, Calendar, DollarSign, ChevronRight, Heart, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Image from "next/image";

interface PropertyCardProps {
    property: any;
    userUid?: string;
    variant?: 'grid' | 'list' | 'compact';
    onClick?: () => void;
    showActions?: boolean;
}

export default function PropertyCard({
    property,
    userUid,
    variant = 'grid',
    onClick,
    showActions = true
}: PropertyCardProps) {
    const router = useRouter();

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        } else if (userUid && property.id) {
            router.push(`/realstate/${userUid}/properties/viewproperty/${property.id}`);
        }
    }, [router, userUid, property.id, onClick]);

    // Format price with commas
    const formattedPrice = useMemo(() => {
        const price = parseFloat(property.price) || 0;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(price);
    }, [property.price]);

    // Get status badge color
    const getStatusColor = useCallback((status: string) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'for sale':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'pending':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'sold':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'rented':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'under contract':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }, []);

    const getStatusBg = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'for sale':
                return 'bg-emerald-500';
            case 'pending':
                return 'bg-amber-500';
            case 'sold':
                return 'bg-blue-500';
            case 'rented':
                return 'bg-purple-500';
            case 'under contract':
                return 'bg-orange-500';
            default:
                return 'bg-gray-500';
        }
    };
    return (
        <div
            onClick={handleClick}
            className="group relative bg-white rounded-lg sm:rounded-xl overflow-hidden 
                         border border-gray-100 hover:border-purple-200 
                         hover:shadow-md sm:hover:shadow-xl 
                         transition-all duration-300 cursor-pointer 
                         flex flex-col sm:flex-row"
        >
            {/* Image Section - Responsive */}
            <div className="mt-3">
                <Image src={property.images[0].url} alt={"Image"} width={200} height={100} className="object-cover w-full sm:w-100 max-h-60 rounded-lg" />

            </div>
            {/* Content Section - Responsive */}
            <div className="flex-1 px-2 py-3 sm:p-4 md:p-5">
                <div className="flex flex-col sm:flex-row 
                                  justify-between items-start gap-2 sm:gap-0 mb-2 sm:mb-3">
                    <div className="w-full sm:w-auto">
                        <h3 className="font-bold text-gray-900 
                                         text-sm sm:text-base md:text-lg 
                                         mb-0.5 sm:mb-1 group-hover:text-purple-600 
                                         transition-colors line-clamp-1">
                            {property.title || property.address || 'Property Title'}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-500 
                                          text-xs sm:text-sm">
                            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="line-clamp-1 text-xs sm:text-sm">
                                {property.address || 'Location not specified'}
                            </span>
                        </div>
                    </div>

                    {/* Desktop Price Tag */}
                    <div className="hidden sm:block text-right">
                        <p className="text-lg md:text-xl lg:text-2xl 
                                       font-bold text-gray-900">
                            {formattedPrice}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500">
                            {property.propertyType || 'Property'}
                        </p>
                    </div>
                </div>

                {/* Features - Responsive */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 
                                  mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <span className="text-xs sm:text-sm text-gray-600">
                            {property.bedrooms || '—'} Beds
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <span className="text-xs sm:text-sm text-gray-600">
                            {property.bathrooms || '—'} Baths
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Square className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <span className="text-xs sm:text-sm text-gray-600">
                            {property.area || '—'} sqft
                        </span>
                    </div>
                </div>

                {/* Footer - Responsive */}
                <div className="flex flex-col xs:flex-row items-start xs:items-center 
                                  justify-between gap-2 xs:gap-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <span className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                            {property.ownerName || 'Not assigned'}
                        </span>
                    </div>

                    {/* Mobile View Details */}
                    <button className="w-full xs:w-auto px-3 sm:px-4 py-1.5 sm:py-2 
                                         text-purple-600 hover:bg-purple-50 
                                         rounded-lg transition-colors 
                                         text-xs sm:text-sm font-medium
                                         border border-purple-200 xs:border-0">
                        View Details →
                    </button>
                </div>
            </div>
        </div>
    );
}