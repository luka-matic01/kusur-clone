import { Redirect } from "expo-router";
import { SignedOut } from "@clerk/clerk-react";

const Index = () => {
  return (
    <SignedOut>
      <Redirect href="/login" />
    </SignedOut>
  );
};

export default Index;
