import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Label,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./core";

interface CapsuleEmailVerificationProps {
  isLoading: boolean;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  handleVerifyEmail: () => void;
  onCancel: () => void;
}

export const CapsuleEmailVerification: React.FC<
  CapsuleEmailVerificationProps
> = ({
  isLoading,
  verificationCode,
  setVerificationCode,
  handleVerifyEmail,
  onCancel,
}) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">
        Capsule SDK: Email Verification Process
      </h2>
      <p className="text-sm text-muted-foreground">
        This tutorial demonstrates how Capsule SDK handles email verification. A
        6-digit code has been sent to your email. Enter it below to complete the
        Capsule authentication process.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow overflow-auto flex-col items-start">
      <Label htmlFor="capsule-verification-code-input" className="block mb-2">
        Enter Capsule Verification Code:
      </Label>
      <InputOTP
        id="capsule-verification-code-input"
        name="capsuleVerificationCode"
        maxLength={6}
        value={verificationCode}
        onChange={setVerificationCode}
        textAlign="center"
      >
        <InputOTPGroup className="mb-4">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p
        id="capsule-verification-description"
        className="text-xs text-muted-foreground"
      >
        This code is used by Capsule to verify your email and secure your
        account. It&apos;s a crucial step in Capsule&apos;s authentication
        process.
      </p>
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
      <Button
        variant="outline"
        onClick={onCancel}
        className="w-full sm:w-auto text-sm"
      >
        Back to Email Input
      </Button>
      <Button
        onClick={handleVerifyEmail}
        disabled={isLoading || verificationCode.length !== 6}
        className="w-full sm:w-auto text-sm"
      >
        {isLoading ? "Verifying with Capsule..." : "Verify with Capsule"}
      </Button>
    </CardFooter>
  </>
);
