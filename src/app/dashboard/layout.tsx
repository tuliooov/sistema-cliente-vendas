"use client"
import Dashboard from "@/components/Dashboard";
import { useRouter } from 'next/navigation';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { replace } = useRouter()
  
  
  if(localStorage.getItem('user') === null){
    replace('/')
    return <></>
  }

  return (
      <Dashboard>{children}</Dashboard>
  );
}
