import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button>Test 1</Button>
      <Button variant={"destructive"}>Test 1</Button>
      <Button variant={"ghost"}>Test 1</Button>
      <Button variant={"outline"}>Test 1</Button>
      <Button variant={"secondary"}>Test 1</Button>
    </div>
  );
}
