import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CardD({totalSemana,title}:any) {
  return (
    <Card className="h-28 w-auto mb-1">
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">${totalSemana ? parseInt(totalSemana).toLocaleString() : 0}</CardTitle>
      </CardHeader>
    </Card>
  )
}
