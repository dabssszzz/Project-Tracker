import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Badge = ({ children, variant = 'default', className }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        success: 'bg-success-light text-success-active',
        warning: 'bg-warning-light text-warning-active',
        danger: 'bg-danger-light text-danger-active',
        info: 'bg-info-light text-info-active',
        brand: 'bg-brand-light text-brand-active',
    };

    return (
        <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
            {children}
        </span>
    );
};

export default Badge;
