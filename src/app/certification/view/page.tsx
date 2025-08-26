'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GraduationCap } from 'lucide-react';

function CertificateContent() {
    const searchParams = useSearchParams();
    const course = searchParams.get('course') || 'Your Amazing Course';
    const user = searchParams.get('user') || 'Valued Student';
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="certificate-container w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden border-8 border-primary/20 relative">
                <div className="p-12 text-center space-y-6 relative z-10">
                    <div className="animate-fade-in-down">
                        <GraduationCap className="h-20 w-20 mx-auto text-primary" />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline animate-fade-in-up delay-100">
                        BoomerHub
                    </h1>

                    <p className="text-lg text-muted-foreground animate-fade-in-up delay-200">
                        certifies that
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-gray-800 dark:text-gray-200 animate-fade-in-up delay-300" style={{fontFamily: "'Brush Script MT', cursive"}}>
                        {user}
                    </h2>

                    <p className="text-lg text-muted-foreground animate-fade-in-up delay-400">
                        has successfully completed the course
                    </p>

                    <h3 className="text-2xl md:text-3xl font-semibold text-primary animate-fade-in-up delay-500">
                        {course}
                    </h3>

                    <div className="grid grid-cols-2 gap-8 pt-8 text-sm text-muted-foreground animate-fade-in-up delay-600">
                        <div className="border-t border-gray-400 pt-2">
                            <p>Date Issued</p>
                            <p className="font-semibold text-gray-700 dark:text-gray-300">{date}</p>
                        </div>
                        <div className="border-t border-gray-400 pt-2">
                             <p>Signature</p>
                            <p className="font-semibold text-gray-700 dark:text-gray-300 font-serif italic">BoomerHub Team</p>
                        </div>
                    </div>
                </div>
                 {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-br-full opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-tl-full opacity-50"></div>
            </div>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Brush+Script+MT&display=swap');
                .certificate-container {
                    animation: slide-in 1s ease-out forwards;
                }
                @keyframes slide-in {
                    from {
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                 @keyframes fade-in-down {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s both;
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.8s both;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-600 { animation-delay: 0.6s; }
            `}</style>
        </div>
    );
}


export default function CertificatePage() {
    return (
        <Suspense fallback={<div>Loading certificate...</div>}>
            <CertificateContent />
        </Suspense>
    )
}
