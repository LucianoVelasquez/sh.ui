import { Button } from "@/components/ui/button";
import Image from "next/image";
import ModeToggle from "@/components/themecontrollers/themecontroller";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen gap-x-5 bg-secondary-foreground">
      <ModeToggle></ModeToggle>
      <Button>Test 1</Button>
      <Button variant={"destructive"} size={"lg"}>Test 1</Button>
      <Button variant={"ghost"} size={"lg"}>Test 2</Button>
      <Button variant={"outline"} size={"lg"}>Test 3</Button>
      <Button variant={"secondary"} size={"lg"}>Test 4</Button>
    </div>
  );
}
