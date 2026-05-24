'use client';
import React from 'react';

type HandlePosition = 'tl' | 'tr' | 'bl' | 'br';

interface ResizeHandleProps {
    position: HandlePosition;
    onDragStart?: (position: HandlePosition) => void;
    onDrag: (delta: { x: number; y: number; position: HandlePosition; shiftKey: boolean }) => void;
    onDragEnd: () => void;
}

const POSITION_CLASS: Record<HandlePosition, string> = {
    tl: 'top-2 left-2 cursor-nw-resize',
    tr: 'top-2 right-2 cursor-ne-resize',
    bl: 'bottom-2 left-2 cursor-sw-resize',
    br: 'bottom-2 right-2 cursor-se-resize',
};

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ position, onDragStart, onDrag, onDragEnd }) => {
    const startRef = React.useRef<{ x: number; y: number } | null>(null);

    const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        startRef.current = { x: event.clientX, y: event.clientY };
        onDragStart?.(position);
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!startRef.current) return;
        event.preventDefault();

        onDrag({
            x: event.clientX - startRef.current.x,
            y: event.clientY - startRef.current.y,
            position,
            shiftKey: event.shiftKey,
        });
    };

    const stopDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!startRef.current) return;
        event.preventDefault();
        startRef.current = null;
        onDragEnd();
    };

    return (
        <button
            type="button"
            aria-label={`Resize handle ${position}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            className={`absolute z-30 h-4 w-4 rounded-full border border-white bg-silvoraa-gold/95 shadow ${POSITION_CLASS[position]}`}
            style={{ pointerEvents: 'all' }}
        />
    );
};
