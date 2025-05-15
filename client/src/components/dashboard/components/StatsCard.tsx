import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  comparison?: string;
  badge?: {
    text: string;
    variant: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  };
}

export default function StatsCard({
  title,
  value,
  icon,
  change,
  comparison = "",
  badge,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {icon && <div className="mr-3 text-primary">{icon}</div>}
            <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
          </div>
          {badge && (
            <Badge
              variant="outline"
              className={`
                ${badge.variant === "primary" ? "bg-blue-100 text-primary" : ""}
                ${badge.variant === "secondary" ? "bg-purple-100 text-purple-600" : ""}
                ${badge.variant === "success" ? "bg-green-100 text-green-600" : ""}
                ${badge.variant === "warning" ? "bg-yellow-100 text-yellow-600" : ""}
                ${badge.variant === "danger" ? "bg-red-100 text-red-600" : ""}
              `}
            >
              {badge.text}
            </Badge>
          )}
        </div>
        <p className="text-2xl font-bold text-neutral-900 mt-2">{value}</p>
        {change && (
          <div className="flex items-center mt-2 text-xs">
            <span
              className={`flex items-center ${
                change.type === "increase" ? "text-green-500" : 
                change.type === "decrease" ? "text-red-500" : "text-neutral-500"
              }`}
            >
              {change.type === "increase" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : change.type === "decrease" ? (
                <ArrowDown className="h-3 w-3 mr-1" />
              ) : null}
              {change.value}
            </span>
            {comparison && <span className="text-neutral-500 ml-2">{comparison}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
