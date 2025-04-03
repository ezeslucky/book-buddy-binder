
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
import { Separator } from "@/components/ui/separator";

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
  const [isGoogleAuthenticating, setIsGoogleAuthenticating] = useState(false);
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
  
  const handleGoogleLogin = () => {
    setIsGoogleAuthenticating(true);
    
    // Simulate Google authentication
    setTimeout(() => {
      // In a real app, this would integrate with Google OAuth
      const user = {
        id: "google-user-" + Math.random().toString(36).substring(2, 9),
        name: "Google User",
        email: "google-user@example.com",
      };
      
      // Save user to localStorage for persistence
      localStorage.setItem("bookBuddy_user", JSON.stringify(user));
      
      toast({
        title: "Successfully logged in with Google!",
        description: "Welcome to Book Buddy.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
      setIsGoogleAuthenticating(false);
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
                  <div className="space-y-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      disabled={isGoogleAuthenticating}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {isGoogleAuthenticating ? "Logging in..." : "Continue with Google"}
                    </Button>
                    
                    <div className="relative flex items-center">
                      <div className="flex-grow border-t border-muted"></div>
                      <span className="mx-4 flex-shrink text-muted-foreground text-sm">OR</span>
                      <div className="flex-grow border-t border-muted"></div>
                    </div>
                    
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
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-6">
                  <div className="space-y-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      disabled={isGoogleAuthenticating}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {isGoogleAuthenticating ? "Signing up..." : "Continue with Google"}
                    </Button>
                    
                    <div className="relative flex items-center">
                      <div className="flex-grow border-t border-muted"></div>
                      <span className="mx-4 flex-shrink text-muted-foreground text-sm">OR</span>
                      <div className="flex-grow border-t border-muted"></div>
                    </div>
                    
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
                  </div>
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
