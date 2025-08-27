
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioLines } from "lucide-react";

export default function AudioTranscriberPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
         <div className="inline-block bg-primary/10 p-4 rounded-lg mb-4">
            <AudioLines className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Audio Transcriber</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Convert spoken audio into written text with high accuracy.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                    This tool will allow you to upload audio files and receive a full text transcription, powered by our advanced AI.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Stay tuned!</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
