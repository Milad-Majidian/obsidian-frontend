import { Button } from "@/components/ui/elements/Button";

export function CategoryServerError(message: string) {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <h2 className="text-2xl font-semibold mb-2">We couldn’t load this category</h2>
      <p className="text-muted-foreground mb-4">
        {message}
      </p>
      <Button onClick={() => window.location.reload()}>Reload Page</Button>
    </div>
  );
}