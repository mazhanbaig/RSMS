import React, { useState, useRef, useEffect } from 'react';
import { Plus, GripHorizontal } from 'lucide-react';

const DraggableButton = ({ onClick }: any) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<any>({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const buttonRef = useRef<any>(null);
    const dragOffset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: any) => {
        const rect = buttonRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        setIsDragging(true);
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;

        setPosition({
            x: e.clientX - dragOffset.current.x,
            y: e.clientY - dragOffset.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <button
            ref={buttonRef}
            onMouseDown={handleMouseDown}
            onClick={!isDragging ? onClick : undefined}
            style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: '48px',
                height: '48px',
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: 9999,
                transition: isDragging ? 'none' : 'box-shadow 0.2s'
            }}
            className="group relative bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl"
        >
            {/* Dots indicator for draggable */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
            </div>

            {/* Main icon */}
            <Plus className="w-6 h-6" />

            {/* Small grip indicator at bottom */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripHorizontal className="w-3 h-3 text-white" />
            </div>

            {/* Ripple effect on drag */}
            {isDragging && (
                <div className="absolute inset-0 rounded-full animate-ping bg-white opacity-30"></div>
            )}

            {/* Tooltip on hover */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Drag me anywhere
            </div>
        </button>
    );
};

export default DraggableButton;