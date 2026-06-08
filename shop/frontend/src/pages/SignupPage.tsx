import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";

export function SignupPage() {
   const { signup } = useAuth();

   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
         await signup(name, email, password);
         navigate("/");
      } catch (error) {
         alert("Unable to create account, please check your provided information");
      }
   }

   return (
      <>
         <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <Card className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-800 text-white">
               <CardHeader>
                  <h1 className="mb-2 text-3xl font-bold">
                     Welcome to Tickethub
                  </h1>
                  <p className="text-xs">
                     Please fill in your information and signup
                  </p>
               </CardHeader>
               <CardContent>
                  <div>
                     <form onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                           <Label htmlFor="name">Name</Label>
                           <Input
                              id="name"
                              type="text"
                              placeholder="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                           />
                        </div>
                        <div className="grid gap-2 mt-4">
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
                        <div>
                           <button
                              type="submit"
                              className="mt-6 btn-primary w-full"
                           >
                              Signup
                           </button>
                        </div>
                     </form>
                  </div>
                  <p className="mt-4 text-center text-sm text-zinc-400">
                     Already have an account?{" "}
                     <Link
                        to={"/login"}
                        className="text-cyan-400 hover:underline"
                     >
                        Login
                     </Link>
                  </p>
               </CardContent>
            </Card>
         </div>
      </>
   );
}
