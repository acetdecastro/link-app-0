"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  return (
    <>
      <button
        onClick={async () =>
          await signOut({
            redirect: true,
            callbackUrl: "http://localhost:3000",
          })
        }
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
