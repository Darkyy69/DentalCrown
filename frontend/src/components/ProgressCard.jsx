import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PropTypes from "prop-types";

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

// Define default props in case some are not provided
ProgressCard.defaultProps = {
  description: "Default Description",
  title: "Default Title",
  titleClass: "text-4xl",
  content: "Default Content",
  progressValue: 0,
  progressLabel: "Progress",
};

// Define prop types to ensure correct prop usage
ProgressCard.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  titleClass: PropTypes.string,
  content: PropTypes.string,
  progressValue: PropTypes.number,
  progressLabel: PropTypes.string,
};
