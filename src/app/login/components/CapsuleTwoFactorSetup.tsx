import React from "react";
import QRCode from "react-qr-code";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./core";

interface CapsuleTwoFactorSetupProps {
  isLoading: boolean;
  twoFactorSecret: string;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  handleSetup2FA: () => void;
  handleEnable2FA: () => void;
  handleVerify2FA: () => void;
  onSkip: () => void;
  is2FAEnabled: boolean;
  twoFactorSetupPhase: "setup" | "verify" | null;
}

export const CapsuleTwoFactorSetup: React.FC<CapsuleTwoFactorSetupProps> = ({
  isLoading,
  twoFactorSecret,
  verificationCode,
  setVerificationCode,
  handleSetup2FA,
  handleEnable2FA,
  handleVerify2FA,
  onSkip,
  twoFactorSetupPhase,
}) => {
  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">Two-Factor Authentication</h2>
        <p className="text-sm text-muted-foreground">
          {twoFactorSetupPhase === "verify"
            ? "Verify your two-factor authentication code."
            : "Enhance your account security by enabling two-factor authentication."}
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow overflow-auto flex-col items-center space-y-4">
        {twoFactorSetupPhase === "setup" && !twoFactorSecret && (
          <Button onClick={handleSetup2FA} disabled={isLoading}>
            {isLoading ? "Initiating 2FA Setup..." : "Start 2FA Setup"}
          </Button>
        )}
        {twoFactorSecret && (
          <>
            <div className="bg-primary p-4 rounded-lg">
              <QRCode value={twoFactorSecret} size={128} />
            </div>
            <p className="text-sm text-center">
              Scan this QR code with your authenticator app
            </p>
            <p className="text-xs text-center text-muted-foreground">
              If you can&apos;t scan the QR code, enter this secret manually:
              <br />
              <span className="font-mono break-all">
                {twoFactorSecret.split("secret=")[1].split("&")[0]}
              </span>
            </p>
          </>
        )}
        {(twoFactorSecret || twoFactorSetupPhase === "verify") && (
          <>
            <p className="text-sm font-semibold mt-4">
              Enter the 6-digit code from your authenticator app:
            </p>
            <InputOTP
              id="capsule-2fa-code-input"
              name="capsule2FACode"
              maxLength={6}
              value={verificationCode}
              onChange={setVerificationCode}
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
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
        <Button
          variant="outline"
          onClick={onSkip}
          className="w-full sm:w-auto text-sm"
        >
          Skip 2FA Setup
        </Button>
        {twoFactorSetupPhase === "setup" && twoFactorSecret && (
          <Button
            onClick={handleEnable2FA}
            disabled={isLoading || verificationCode.length !== 6}
            className="w-full sm:w-auto text-sm"
          >
            {isLoading ? "Enabling 2FA..." : "Enable 2FA"}
          </Button>
        )}
        {twoFactorSetupPhase === "verify" && (
          <Button
            onClick={handleVerify2FA}
            disabled={isLoading || verificationCode.length !== 6}
            className="w-full sm:w-auto text-sm"
          >
            {isLoading ? "Verifying..." : "Verify 2FA"}
          </Button>
        )}
      </CardFooter>
    </>
  );
};
