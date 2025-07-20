"use client";
import NotFound from "@/app/not-found";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  
  // Use useEffect to handle the redirect safely
  useEffect(() => {
    router.push("/user/profile");
  }, [router]);
  
  return <NotFound />;
};

export default Page;
