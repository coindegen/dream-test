"use client";

import Capsule, {
  CapsuleModal,
  ConstructorOpts,
  Environment,
  Network,
  OAuthMethod,
  WalletType,
} from "@usecapsule/react-sdk";
import "@usecapsule/react-sdk/styles.css";
import { useRouter } from "next/navigation";
import { type FC, useCallback, useEffect, useState } from "react";
import { CapsuleLoggedIn } from "./CapsuleLoggedIn";
import { signEvmMessage } from "./CapsuleSigningExamples";
import { useToast } from "./core/toast/use-toast";

const FOREGROUND_COLOR = "#87CEEB";
const BACKGROUND_COLOR = "#ffffff";

const CAPSULE_API_KEY = process.env.NEXT_PUBLIC_CAPSULE_API_KEY;

const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// Step 3: (Optional) Customize the Capsule SDK integration
// These options allow you to tailor the look and feel of the Capsule integration
// For a full list of constructor options, visit:
// https://docs.usecapsule.com/integration-guide/customize-capsule#constructor-options
const constructorOpts: ConstructorOpts = {
  emailPrimaryColor: FOREGROUND_COLOR,
  xUrl: "https://x.com/theDreamOS",
  homepageUrl: "https://dreamos.app",
  supportUrl: "",
  supportedWalletTypes: {
    [WalletType.EVM]: true,
    [WalletType.SOLANA]: true,
  },
};

// Step 4: Initialize the Capsule client
// Create a new Capsule instance with your environment, API key, and optional constructor parameters
const capsuleClient = new Capsule(
  CAPSULE_ENVIRONMENT,
  CAPSULE_API_KEY,
  constructorOpts,
);

export const CapsuleBare: FC<{}> = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState<boolean>(false);

  const [userRecoverySecret] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const [signature, setSignature] = useState<string>("");
  const [selectedSigner, setSelectedSigner] = useState<string>("");

  const [walletId, setWalletId] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const backgroundColor = BACKGROUND_COLOR;
  const foregroundColor = FOREGROUND_COLOR;

  const checkLoginStatus = useCallback(async () => {
    try {
      const isLoggedIn = await capsuleClient.isFullyLoggedIn();

      console.log({ isLoggedIn });

      if (isLoggedIn) {
        const wallets = capsuleClient.getWallets();
        setWalletId(Object.values(wallets)[0].id!);
        setWalletAddress(Object.values(wallets)[0].address!);
        toast({
          title: "Logged In",
          description:
            "You're logged in and ready to sign messages with Capsule.",
        });
      }
      setIsUserLoggedIn(isLoggedIn);
    } catch (err) {
      console.error("Capsule login status check failed:", err);
      toast({
        title: "Capsule Login Check Error",
        description:
          "Failed to check Capsule login status. See console for details.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Step 6: Check user's login status
  // This effect runs on component mount to determine if the user is already logged in
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  // Step 7: Handle opening the Capsule Modal
  // Simply set the isCapsuleModalOpen state to true to display the modal
  const handleModalOpen = () => {
    setIsCapsuleModalOpen(true);
  };

  // Step 8: Handle Capsule Modal closure
  // This function is called when the modal is closed, either by the user or after successful login
  // You can perform any necessary cleanup or trigger app-specific actions here
  const handleModalClose = async () => {
    setIsCapsuleModalOpen(false);
    checkLoginStatus();
  };

  // todo: uncomment
  // Step 9: Handle message signing
  // This function demonstrates how to sign a message using Capsule
  const handleSignMessage = async () => {
    setIsLoading(true);
    try {
      const signature = await signEvmMessage(
        capsuleClient,
        selectedSigner,
        message,
      );
      setSignature(signature);
      toast({
        title: "Capsule Message Signed",
        description: "Message has been signed successfully using Capsule.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Capsule message signing failed:", error);
      toast({
        title: "Capsule Signing Error",
        description:
          "Failed to sign message with Capsule. See console for details.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // todo: make sure this resets the UI
  const handleLogout = async () => {
    await capsuleClient.logout();
    toast({
      title: "Dream Logout",
      description: "You have been successfully logged out from DreamOS.",
    });
    router.push("/");
    resetState();
    // router.refresh();
  };

  // Helper function to reset the component state
  const resetState = () => {
    setMessage("");
    isCapsuleModalOpen && setIsCapsuleModalOpen(false);
  };

  // Render the appropriate component based on the authentication state
  return isUserLoggedIn ? (
    <CapsuleLoggedIn
      isLoading={isLoading}
      signature={signature}
      walletId={walletId}
      walletAddress={walletAddress}
      userRecoverySecret={userRecoverySecret}
      message={message}
      selectedSigner={selectedSigner}
      isUserLoggedIn={isUserLoggedIn}
      setSelectedSigner={setSelectedSigner}
      setMessage={(e: any) => setMessage(e.target.value)}
      handleLogout={handleLogout}
      handleSignMessage={handleSignMessage}
    />
  ) : (
    <>
      <CapsuleModal
        bareModal={true}
        logo={"/dream_logo.svg"}
        theme={{
          backgroundColor,
          foregroundColor,
          oAuthLogoVariant: "dark",
        }}
        capsule={capsuleClient}
        networks={[
          Network.ETHEREUM,
          Network.ARBITRUM,
          Network.BASE,
          Network.OPTIMISM,
          Network.POLYGON,
        ]}
        isOpen={true}
        onClose={handleModalClose}
        appName="DreamOS Test Task"
        oAuthMethods={[
          OAuthMethod.GOOGLE,
          OAuthMethod.TWITTER,
          OAuthMethod.DISCORD,
          OAuthMethod.APPLE,
        ]}
        disableEmailLogin={false}
        disablePhoneLogin={true}
        onRampConfig={{
          network: "ethereum",
          asset: "eth",
          providers: [
            { id: "STRIPE" },
            // Uncomment the following to add Ramp as a provider
            // {
            //   id: "RAMP",
            //   hostApiKey: "your-ramp-api-key",
            // },
          ],
          testMode: true,
        }}
        onModalStepChange={(val) => {
          console.log("modal step change", val);
        }}
        onExpandModalChange={(val) => {
          console.log("modal expand change", val);
        }}
        // createWalletOverride={async (capsule) => {
        //   console.log("overriding wallet", capsule);
        //   return { walletIds: ["123"] };
        // }}
      />
    </>
  );
};
