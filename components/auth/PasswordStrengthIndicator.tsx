"use client";

import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  {
    label: "At least 8 characters",
    test: (password) => password.length >= 8,
  },
  {
    label: "One lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "One uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "One number",
    test: (password) => /\d/.test(password),
  },
  {
    label: "One special character",
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export function PasswordStrengthIndicator({
  password,
  className = "",
}: PasswordStrengthIndicatorProps) {
  const { strength, metRequirements } = useMemo(() => {
    const met = requirements.map((req) => ({
      ...req,
      met: req.test(password),
    }));

    const score = met.filter((req) => req.met).length;
    const strength = Math.min(score / requirements.length, 1);

    return {
      strength,
      metRequirements: met,
    };
  }, [password]);

  if (!password) return null;

  const getStrengthColor = (strength: number) => {
    if (strength < 0.3) return "bg-red-500";
    if (strength < 0.6) return "bg-yellow-500";
    if (strength < 0.8) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 0.3) return "Weak";
    if (strength < 0.6) return "Fair";
    if (strength < 0.8) return "Good";
    return "Strong";
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Password strength</span>
          <span
            className={`font-medium ${
              strength < 0.3
                ? "text-red-500"
                : strength < 0.6
                ? "text-yellow-500"
                : strength < 0.8
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {getStrengthText(strength)}
          </span>
        </div>
        <Progress
          value={strength * 100}
          className={`h-2 ${getStrengthColor(strength)}`}
        />
      </div>

      <div className="space-y-2">
        {metRequirements.map((requirement, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            {requirement.met ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-muted-foreground" />
            )}
            <span
              className={
                requirement.met
                  ? "text-green-700 dark:text-green-400"
                  : "text-muted-foreground"
              }
            >
              {requirement.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
