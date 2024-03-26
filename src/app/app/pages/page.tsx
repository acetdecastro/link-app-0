// import { auth } from "@/libs/auth";
// import { redirect } from "next/navigation";

export const metadata = {
  title: "Pages",
};

export default async function Pages() {
  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  return (
    <>
      <h1 className="text-gray-500">I am Pages</h1>
    </>
  );
}
