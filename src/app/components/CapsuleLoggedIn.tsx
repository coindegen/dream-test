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

export const CapsuleSignEvmMessages: React.FC<CapsuleSignEvmMessagesProps> = ({
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
      <Label htmlFor="capsule-signer-select" className="block mb-2">
        Select Capsule-compatible Signer Library:
      </Label>
      <Select onValueChange={setSelectedSigner}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Choose a signer library" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Capsule-compatible Signers</SelectLabel>
            <SelectItem value="ethers-v5-integration">
              Ethers v5 with Capsule
            </SelectItem>
            <SelectItem value="ethers-v6-integration">
              Ethers v6 with Capsule
            </SelectItem>
            <SelectItem value="viem-v1-integration">
              Viem v1 with Capsule
            </SelectItem>
            <SelectItem value="viem-v2-integration">
              Viem v2 with Capsule
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label htmlFor="capsule-message-input" className="block mb-2">
        Message to Sign with Capsule:
      </Label>
      <Input
        id="capsule-message-input"
        name="capsuleMessageToSign"
        value={message}
        onChange={setMessage}
        placeholder="Enter a message to sign using Capsule"
        className="w-full mb-4"
      />
      <Alert className="break-words mb-4">
        {signature ? (
          <>
            <strong>Signature:</strong>
            <p className="text-sm font-mono mt-2">{signature}</p>
          </>
        ) : (
          <>
            <strong>Signature Status:</strong>{" "}
            {isLoading ? "Signing message..." : "No signature generated yet"}
          </>
        )}
      </Alert>
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
      <Button
        variant="outline"
        onClick={handleLogout}
        className="w-full sm:w-auto text-sm"
      >
        Logout from Capsule
      </Button>
      <Button
        onClick={handleSignMessage}
        disabled={!message || !selectedSigner || !isUserLoggedIn || isLoading}
        className="w-full sm:w-auto text-sm"
      >
        {isLoading
          ? "Signing with Capsule..."
          : "Sign Evm Message using Capsule"}
      </Button>
    </CardFooter>
    <Toaster />
  </>
);
