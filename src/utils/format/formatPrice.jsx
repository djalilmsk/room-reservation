export const formatPrice = (price) => (
  <div className="flex gap-1">
    <h1 className="text-2xl font-semibold md:text-3xl">{price} DZD</h1>
    <p className="text-secondary-foreground mt-auto pb-1 text-sm">/pre hour</p>
  </div>
);
