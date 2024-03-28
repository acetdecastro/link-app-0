import { Button } from "@/components/ui/button";

export default function PagesContent() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Pages</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no pages
          </h3>
          <p className="text-sm text-muted-foreground">
            Create and design a page now so you can share it
          </p>
          <Button className="mt-4">Create a page</Button>
        </div>
      </div>
    </>
  );
}
