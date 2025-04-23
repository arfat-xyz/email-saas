"use client";
import { frontendSuccessResponse } from "@/lib/frontend-response-toast";
import { useEffect } from "react";

const HomeClientComponent = () => {
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const data = await fetch(`/api/users`).then((res) => res.json());
      if (data?.success) {
        return frontendSuccessResponse({ message: data?.message });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <div>HomeClientComponent</div>;
};

export default HomeClientComponent;
