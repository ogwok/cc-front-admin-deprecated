

    import React, { FC, useState } from "react";
    import { Button, Card, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
    import { useNavigate, useLocation } from "react-router-dom";
    import { motion } from "framer-motion";
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    
    const SignInPage: FC = function () {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [rememberMe, setRememberMe] = useState(false);
      const [error, setError] = useState("");
      const [isLoading, setIsLoading] = useState(false);
    
      const navigate = useNavigate();
      const location = useLocation();
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
    
        try {
          const response = await fetch(`${BASE_URL}/facilitators/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (!response.ok) {
            throw new Error('Login failed');
          }
    
          const data = await response.json();
    
          console.log("accessToken", data.accessToken);
          console.log("data",  data.data.firstName + data.data.lastName);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userName', data.data.firstName + data.data.lastName);
          localStorage.setItem('userEmail', data.data.email);
          localStorage.setItem('organizationId', data.data.organizationId);
          localStorage.setItem('organizationName', data.data.organization.name);
          localStorage.setItem('facilitatorId', data.data.id);
          localStorage.setItem('userRole', data.data.role);
    
          if (rememberMe) {
            // Implement remember me functionality
          }
    
          const origin = location.state?.from?.pathname || '/';
          navigate(origin);
        } catch (err) {
          setError('Invalid email or password');
          console.error('Login error:', err);
        } finally {
          setIsLoading(false);
        }
      };
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center px-6 py-12 relative overflow-hidden">
          {/* Animated background shapes */}
          <motion.div 
            className="absolute top-0 left-0 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              rotate: [0, 270, 270, 0, 0],
              borderRadius: ["50%", "20%", "50%", "20%", "50%"],
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
    
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl border border-white/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-center text-white mb-8">
                Welcome to CoachConnect
              </h1>
              {error && <p className="text-red-300 text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-white">Email</Label>
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 bg-white/20 border-white/10 text-white placeholder-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-white">Password</Label>
                  <TextInput
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 bg-white/20 border-white/10 text-white placeholder-white/50"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox 
                      id="rememberMe" 
                      name="rememberMe" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <Label htmlFor="rememberMe" className="ml-2 text-sm text-white">Remember me</Label>
                  </div>
                  <a href="#" className="text-sm text-white hover:text-blue-200">
                    Forgot password?
                  </a>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" light={true} />
                      <span className="ml-2">Signing in...</span>
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
              <p className="mt-8 text-center text-sm text-white">
                New to CoachConnect?{' '}
                <a href="#" className="font-medium text-cyan-300 hover:text-cyan-200">
                  Create an account
                </a>
              </p>
            </motion.div>
          </Card>
        </div>
      );
    };
    
    export default SignInPage;
        
    