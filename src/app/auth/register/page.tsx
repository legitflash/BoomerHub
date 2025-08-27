
'use client';
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createUserProfile } from "@/services/user-service";

const formSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSuccess = (user: any) => {
     toast({ title: "Success", description: "Account created successfully." });
     router.push("/blog");
  }

  const handleError = (error: any) => {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message,
      });
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const displayName = `${values.firstName} ${values.lastName}`;
      await updateProfile(userCredential.user, { displayName });
      
      // Create user profile in Firestore
      await createUserProfile(userCredential.user, {
          firstName: values.firstName,
          lastName: values.lastName,
      });

      handleSuccess(userCredential.user);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
       // Create user profile in Firestore for new Google user
       await createUserProfile(result.user, {});
       toast({ title: "Success", description: "Signed up successfully with Google." });
       router.push("/blog");
    } catch (error: any) {
       handleError(error)
    }
  };


  return (
     <div className="flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="Max" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Robinson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </form>
          </Form>
            <Button variant="outline" className="w-full mt-4" onClick={handleGoogleSignUp}>
              Sign up with Google
            </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
