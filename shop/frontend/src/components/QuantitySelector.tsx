type QuantitySelectorProps = {
    quantity: number;
    onChange: (quantity: number) => void;
    min?: number;
    max?: number
};

export function QuantitySelector({
    quantity,
    onChange,
    min = 1,
    max = 10
}: QuantitySelectorProps) {
    const increse = () => {
        if (quantity < max) {
            onChange(quantity + 1)
        }
    };

    const decrease = () => {
        if (quantity > min) {
            onChange(quantity - 1)
        }
    } 

  return (
    <div className="flex items-center gap-4 ">
        <button
            onClick={decrease}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-lg font-bold hover:bg-zinc-700"
        >
            -
        </button>
        <span className="min-w-8 text-center text-lg font-semibold">
            {quantity}
        </span>
        <button
            onClick={increse}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-lg font-bold hover:bg-zinc-700"
        >
            +
        </button>
    </div>
  )}