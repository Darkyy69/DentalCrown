import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProgressCard({
  description,
  title,
  titleClass,
  content,
  progressValue,
  progressLabel,
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{description}</CardDescription>
        <CardTitle className={titleClass}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{content}</div>
      </CardContent>
      <CardFooter>
        <Progress value={progressValue} aria-label={progressLabel} />
      </CardFooter>
    </Card>
  );
}
