'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

function CertificateContent() {
    const searchParams = useSearchParams();
    const { user } = useAuth();

    const course = searchParams.get('course') || 'Your Amazing Course';
    const userName = user?.displayName || user?.email || 'Valued Student';
    const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex items-center justify-center p-4 font-body-serif">
            <div className="certificate-container w-full max-w-4xl bg-[#0b1a36] text-white shadow-2xl rounded-lg overflow-hidden border-4 border-[#d4af37] relative">
                <div className="p-10 text-center space-y-4 relative z-10">
                    
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <GraduationCap className="h-10 w-10 text-[#d4af37]" />
                        <span className="text-2xl font-bold font-headline-serif tracking-wider">Boomer Academy</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold font-headline-serif text-white tracking-wider animate-fade-in-down">
                        Certificate of Completion
                    </h1>

                    <p className="text-lg text-gray-300 animate-fade-in-up delay-100 tracking-widest">
                        THIS CERTIFIES THAT
                    </p>

                    <h2 className="text-5xl md:text-6xl font-bold text-[#d4af37] animate-fade-in-up delay-200" style={{fontFamily: "'Great Vibes', cursive"}}>
                        {userName}
                    </h2>

                    <p className="text-md text-gray-300 animate-fade-in-up delay-300">
                        has successfully completed the course
                    </p>

                    <h3 className="text-3xl md:text-4xl font-semibold text-white animate-fade-in-up delay-400 font-headline-serif">
                        {course}
                    </h3>

                    <p className="text-md text-gray-300 animate-fade-in-up delay-500">
                        on {date}
                    </p>
                    
                    <p className="text-sm text-gray-400 animate-fade-in-up delay-600 pt-4">Issued by Boomer Academy</p>


                    <div className="flex justify-between items-center pt-8 text-sm text-gray-300 animate-fade-in-up delay-700">
                        <div className="text-center">
                            <p className="font-script text-3xl text-[#d4af37] italic" style={{fontFamily: "'Great Vibes', cursive"}}>Favour Uduafemhe</p>
                            <div className="border-t border-[#d4af37] w-48 mx-auto mt-1 pt-1">
                                <p className="font-semibold">Founder, Boomer Academy</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-28 h-28 border-2 border-[#d4af37] rounded-full flex items-center justify-center">
                                <div className="w-24 h-24 border border-[#d4af37] rounded-full flex flex-col items-center justify-center text-center">
                                     <GraduationCap className="h-8 w-8 text-[#d4af37]" />
                                     <p className="text-[8px] font-bold tracking-widest mt-1">BOOMERACADEMY</p>
                                     <p className="text-[6px] tracking-wider">CERTIFIED</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Background watermark */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <GraduationCap className="h-80 w-80 text-white/5 opacity-30" />
                </div>
            </div>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato&family=Great+Vibes&display=swap');
                
                .font-headline-serif {
                    font-family: 'Playfair Display', serif;
                }
                .font-body-serif {
                    font-family: 'Lato', sans-serif;
                }
                .font-script {
                    font-family: 'Great Vibes', cursive;
                }

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
                .delay-700 { animation-delay: 0.7s; }
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
