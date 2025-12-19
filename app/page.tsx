"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calculator, Info, ShieldCheck } from "lucide-react";

type MaritalStatus = "single" | "married" | "";
type PayPeriod = "weekly" | "biweekly" | "";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

// Simple classroom tax table (per pay period) using *estimated* brackets
function estimateFederalIncomeTax(taxableWages: number): number {
  const w = Math.max(0, taxableWages);

  // brackets: [limit, rate] meaning "up to limit at rate"
  // implemented as a flat-rate by bracket for simplicity (classroom)
  if (w <= 250) return 0;
  if (w <= 750) return w * 0.10;
  if (w <= 1500) return w * 0.12;
  if (w <= 3000) return w * 0.22;
  return w * 0.24;
}

export default function HomePage() {
  const [employeeName, setEmployeeName] = React.useState("");
  const [maritalStatus, setMaritalStatus] = React.useState<MaritalStatus>("");
  const [dependents, setDependents] = React.useState<number>(0);
  const [payPeriod, setPayPeriod] = React.useState<PayPeriod>("");
  const [hourlyRate, setHourlyRate] = React.useState<number>(0);
  const [hoursWorked, setHoursWorked] = React.useState<number>(0);

  const [error, setError] = React.useState<string>("");
  const [results, setResults] = React.useState<null | {
    regularHours: number;
    overtimeHours: number;
    regularPay: number;
    overtimePay: number;
    grossPay: number;
    socialSecurity: number;
    medicare: number;
    federalIncomeTax: number;
    totalTaxes: number;
    netPay: number;
    taxableWagesUsed: number;
  }>(null);

  function onCalculate() {
    setError("");
    setResults(null);

    if (!employeeName.trim()) {
      setError("Please enter an employee name.");
      return;
    }
    if (!maritalStatus) {
      setError("Please select a marital status.");
      return;
    }
    if (!payPeriod) {
      setError("Please select a pay period.");
      return;
    }
    if (hourlyRate <= 0) {
      setError("Hourly rate must be greater than 0.");
      return;
    }
    if (hoursWorked < 0) {
      setError("Hours worked cannot be negative.");
      return;
    }
    if (dependents < 0) {
      setError("Dependents cannot be negative.");
      return;
    }

    const regularHours = Math.min(40, hoursWorked);
    const overtimeHours = Math.max(0, hoursWorked - 40);

    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * 1.5;

    const grossPay = regularPay + overtimePay;

    // 2025 FICA employee rates (standard): SS 6.2%, Medicare 1.45%
    const socialSecurity = grossPay * 0.062;
    const medicare = grossPay * 0.0145;

    // Simple dependent adjustment (classroom): -$50 per dependent
    const dependentAdjustment = dependents * 50;
    const taxableWagesUsed = Math.max(0, grossPay - dependentAdjustment);

    const federalIncomeTax = estimateFederalIncomeTax(taxableWagesUsed);

    const totalTaxes = socialSecurity + medicare + federalIncomeTax;
    const netPay = grossPay - totalTaxes;

    setResults({
      regularHours: round2(regularHours),
      overtimeHours: round2(overtimeHours),
      regularPay: round2(regularPay),
      overtimePay: round2(overtimePay),
      grossPay: round2(grossPay),
      socialSecurity: round2(socialSecurity),
      medicare: round2(medicare),
      federalIncomeTax: round2(federalIncomeTax),
      totalTaxes: round2(totalTaxes),
      netPay: round2(netPay),
      taxableWagesUsed: round2(taxableWagesUsed),
    });
  }

  function onReset() {
    setEmployeeName("");
    setMaritalStatus("");
    setDependents(0);
    setPayPeriod("");
    setHourlyRate(0);
    setHoursWorked(0);
    setError("");
    setResults(null);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Hero */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span>Class project • No database • Runs entirely in the browser</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Final Exam Payroll Calculator
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Enter one hourly employee’s information and pay details. The calculator
          uses overtime at 1.5× for hours over 40, and estimates federal taxes
          using Social Security (6.2%), Medicare (1.45%), and a simplified income
          tax table.
        </p>
      </div>

      <Separator className="my-8" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Payroll Inputs
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {error ? (
              <Alert>
                <AlertTitle>Check your inputs</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            {/* Employee info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="e.g., Alex Johnson"
                />
              </div>

              <div className="space-y-2">
                <Label>Marital Status</Label>
                <Select
                  value={maritalStatus}
                  onValueChange={(v) => setMaritalStatus(v as MaritalStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dependents">Number of Dependents</Label>
                <Input
                  id="dependents"
                  type="number"
                  min={0}
                  value={dependents}
                  onChange={(e) => setDependents(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Pay Period</Label>
                <Select
                  value={payPeriod}
                  onValueChange={(v) => setPayPeriod(v as PayPeriod)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Biweekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pay inputs */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min={0}
                  step="0.01"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursWorked">Hours Worked</Label>
                <Input
                  id="hoursWorked"
                  type="number"
                  min={0}
                  step="0.01"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={onCalculate} className="sm:w-fit">
                Calculate
              </Button>
              <Button
                variant="secondary"
                onClick={onReset}
                className="sm:w-fit"
              >
                Reset
              </Button>
              <p className="text-sm text-muted-foreground">
                Overtime is automatically applied above 40 hours.
              </p>
            </div>

            {results ? (
              <Card>
                <CardHeader>
                  <CardTitle>Results for {employeeName}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Regular Hours</span>
                    <span className="font-medium text-foreground">
                      {results.regularHours}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Overtime Hours</span>
                    <span className="font-medium text-foreground">
                      {results.overtimeHours}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span>Regular Pay</span>
                    <span className="font-medium text-foreground">
                      {formatMoney(results.regularPay)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Overtime Pay</span>
                    <span className="font-medium text-foreground">
                      {formatMoney(results.overtimePay)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Gross Pay</span>
                    <span className="font-semibold text-foreground">
                      {formatMoney(results.grossPay)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span>Taxable Wages (after dependents)</span>
                    <span className="font-medium text-foreground">
                      {formatMoney(results.taxableWagesUsed)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Social Security (6.2%)</span>
                    <span className="font-medium text-foreground">
                      {formatMoney(results.socialSecurity)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medicare (1.45%)</span>
                    <span className="font-medium text-foreground">
                      {formatMoney(results.medicare)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Federal Income Tax (estimated)</span>
                    <span className="font-medium text-foreground">
                      {formatMoney(results.federalIncomeTax)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Federal Taxes</span>
                    <span className="font-semibold text-foreground">
                      {formatMoney(results.totalTaxes)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span>Net Pay</span>
                    <span className="text-base font-semibold text-foreground">
                      {formatMoney(results.netPay)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </CardContent>
        </Card>

        {/* Right: Notes */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Project Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ul className="list-disc space-y-2 pl-5">
                <li>Single employee, hourly only.</li>
                <li>Overtime: 1.5× for hours over 40.</li>
                <li>Federal payroll taxes only (no benefits deductions).</li>
                <li>Uses a simplified income tax table for classroom use.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax assumptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Social Security</span>
                <span className="font-medium text-foreground">6.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Medicare</span>
                <span className="font-medium text-foreground">1.45%</span>
              </div>
              <div className="pt-2">
                <p className="font-medium text-foreground">Income tax table</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>$0–$250: 0%</li>
                  <li>$250.01–$750: 10%</li>
                  <li>$750.01–$1500: 12%</li>
                  <li>$1500.01–$3000: 22%</li>
                  <li>$3000.01+: 24%</li>
                </ul>
                <p className="mt-2">
                  Dependents reduce taxable wages by $50 each (not below $0).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
