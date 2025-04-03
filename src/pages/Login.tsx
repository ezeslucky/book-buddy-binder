
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = new URLSearchParams(location.search).get("signup") === "true";
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = (values: LoginFormValues) => {
    setIsLoggingIn(true);
    
    // Simulate login API call
    setTimeout(() => {
      // In a real app, this would be an API call to your backend
      const user = {
        id: "user-1",
        name: "Demo User",
        email: values.email,
      };
      
      // Save user to localStorage for persistence
      localStorage.setItem("bookBuddy_user", JSON.stringify(user));
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleSignup = (values: SignupFormValues) => {
    setIsSigningUp(true);
    
    // Simulate signup API call
    setTimeout(() => {
      // In a real app, this would be an API call to your backend
      const user = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: values.name,
        email: values.email,
      };
      
      // Save user to localStorage for persistence
      localStorage.setItem("bookBuddy_user", JSON.stringify(user));
      
      toast({
        title: "Account created!",
        description: "Welcome to Book Buddy. Your account has been created successfully.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
      setIsSigningUp(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="bg-card py-6">
        <div className="container flex items-center justify-center">
          <div className="flex items-center gap-2">
            <BookOpen size={32} className="text-primary" />
            <h1 className="text-3xl font-serif font-bold">Book Buddy</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-lg py-12 px-4 sm:px-6 lg:py-16">
        <div className="page-transition">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-serif">
                Welcome to Book Buddy
              </CardTitle>
              <CardDescription className="text-center">
                Manage your personal book collection with ease
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue={isSignup ? "signup" : "login"}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-6">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isLoggingIn}>
                        {isLoggingIn ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-6">
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={signupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isSigningUp}>
                        {isSigningUp ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mt-4">
                Demo credentials: email@example.com / password
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Login;
