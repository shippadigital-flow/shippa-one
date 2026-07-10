import mark from "@/assets/shippa-mark.png.asset.json";

export function ShippaMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={"inline-flex shrink-0 items-center justify-center " + className}>
      <img
        src={mark.url}
        alt="Shippa"
        className="h-full w-full object-contain"
        draggable={false}
      />
    </span>
  );
}