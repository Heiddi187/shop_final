import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";

export function LoginPage() {
   const { login } = useAuth();

   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setError("");

      try {
         await login(email, password);
         navigate("/");
      } catch {
         setError("Invalid email or password");
      }
   }

   return (
      <>
         <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <Card className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-800 text-white">
               <CardHeader>
                  <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
               </CardHeader>
               <CardContent>
                  <div>
                     <form onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                           <Label htmlFor="email">Email</Label>
                           <Input
                              id="email"
                              type="email"
                              placeholder="email@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                           />
                        </div>
                        <div className="grid gap-2 mt-4 ">
                           <Label htmlFor="password">Password</Label>
                           <Input
                              id="password"
                              type="password"
                              placeholder="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                           />
                        </div>

                        {error && (
                           <p className="mt-4 text-sm text-red-500">{error}</p>
                        )}

                        <div>
                           <button
                              type="submit"
                              className="mt-6 btn-primary w-full"
                           >
                              Login
                           </button>
                        </div>
                     </form>
                  </div>
                  <p className="mt-4 text-center text-sm text-zinc-400">
                     Not signed up?{" "}
                     <Link
                        to={"/signup"}
                        className="text-cyan-400 hover:underline"
                     >
                        Do it now
                     </Link>
                  </p>
               </CardContent>
            </Card>
         </div>
      </>
   );
}
