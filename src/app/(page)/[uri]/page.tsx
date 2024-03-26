// import { auth } from "@/libs/auth";
// import { redirect } from "next/navigation";

export const metadata = {
  title: "App",
};

export default async function Sea() {
  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  return (
    <>
      <h1 className="text-gray-900">I am a URI PAGE</h1>
    </>
  );
}
