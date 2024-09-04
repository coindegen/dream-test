import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Alert,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Label,
  Input,
} from "./core";
import { Toaster } from "./core/toast";

interface CapsuleSignEvmMessagesProps {
  isLoading: boolean;
  signature: string;
  walletId: string;
  walletAddress: string;
  userRecoverySecret: string;
  message: string;
  selectedSigner: string;
  isUserLoggedIn: boolean;
  setSelectedSigner: (value: string) => void;
  setMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogout: () => void;
  handleSignMessage: () => void;
}

export const CapsuleLoggedIn: React.FC<CapsuleSignEvmMessagesProps> = ({
  isLoading,
  signature,
  walletId,
  walletAddress,
  userRecoverySecret,
  message,
  selectedSigner,
  isUserLoggedIn,
  setSelectedSigner,
  setMessage,
  handleLogout,
  handleSignMessage,
}) => (
  <>
    <CardContent className="flex flex-grow overflow-auto flex-col items-start">
      <Alert className="break-words mb-4">
        <strong>Capsule Wallet ID:</strong> {walletId || "Not available"}
      </Alert>
      <Alert className="break-words mb-4">
        <strong>Capsule Wallet Address:</strong>{" "}
        {walletAddress || "Not available"}
      </Alert>
      {userRecoverySecret && (
        <Alert className="break-words mb-4">
          <strong>Capsule Recovery Secret:</strong>{" "}
          {userRecoverySecret || "Not available"}
        </Alert>
      )}
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
      <Button
        variant="outline"
        onClick={handleLogout}
        className="w-full sm:w-auto text-sm"
      >
        Logout from Capsule
      </Button>
    </CardFooter>
    <Toaster />
  </>
);
