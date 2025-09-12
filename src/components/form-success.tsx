
import { CheckCircle2 } from "lucide-react";

interface FormSuccessProps {
    title: string;
    message: string;
}

export function FormSuccess({ title, message }: FormSuccessProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-green-500 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300">
            <CheckCircle2 className="h-16 w-16 mb-4 text-green-500" />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm">{message}</p>
        </div>
    );
}
