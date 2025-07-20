"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import sendPasswordResetEmail from "@/lib/auth/sendResetPassEmail";
import { useRouter } from "next/navigation";
import AuthVisibilityWrapper from "@/components/AuthVisibilityWraper";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!email) {
        toast.error("Please enter your email address.");
        return;
      }
      const res = await sendPasswordResetEmail(email);
      if (res.success) {
        toast.success("Password reset email sent! Please check your inbox.");
        setEmail("");
        router.push("/login");
      } else {
        toast.error("Failed to send reset email. Try again later.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <AuthVisibilityWrapper showIfLoggedIn={false} redirectTo="/">
    
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link
              href="/"
              className="w-fit mb-10 mx-auto flex items-center gap-2"
            >
              <Image
                src="/images/logo.png"
                alt="logo"
                width={60}
                height={60}
                className="rounded-2xl"
              />
              <span className="text-2xl font-bold">IdeaTrail</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Reset your password
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent cursor-pointer rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthVisibilityWrapper>
  );
};

export default ResetPassword;
