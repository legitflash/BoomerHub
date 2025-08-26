import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function CertificationPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center text-center space-y-4">
        <Award className="h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Claim Your Certificate</h1>
        <p className="max-w-xl mx-auto text-muted-foreground md:text-xl">
          Completed a course? Enter your completion code below to generate and download your official certificate.
        </p>
      </div>

      <div className="max-w-md mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Enter Completion Code</CardTitle>
            <CardDescription>You can find this code on the final lesson of your course.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <Input type="text" placeholder="e.g., C101-FINAL-XYZ" className="h-12 text-lg text-center" />
              <Button type="submit" size="lg">Generate Certificate</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
