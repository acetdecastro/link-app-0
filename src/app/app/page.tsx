// import { auth } from "@/libs/auth";
import LogoutButton from "../../components/buttons/logout.button";
// import { redirect } from "next/navigation";

export const metadata = {
  title: "App",
};

export default async function App() {
  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  return (
    <>
      <h1 className="text-gray-500">I am /app</h1>
    </>
  );
}
