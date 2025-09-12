import * as React from 'react';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className={className}
            {...props}
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path
                fill="url(#logo-gradient)"
                d="M188.7,40H87.3c-13,0-23.5,10.6-23.5,23.5V94l51.1,34.1L63.8,162.2v29.3c0,13,10.6,23.5,23.5,23.5h101.4c13,0,23.5-10.6,23.5-23.5V63.5C212.2,50.6,201.7,40,188.7,40z M145.4,142.9l-52.9-35.3l52.9-35.3V142.9z"
            />
        </svg>
    );
}
