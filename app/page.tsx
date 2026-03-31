'use client';
import { useMe } from "./hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {isError} = useMe()

  useEffect(() => {
    router.push("/home");
  }, [router]);


  return (
    <>
      { isError? <div>
          fallo
        </div> : <div>
          root
        </div>}
    </>
  );
}
