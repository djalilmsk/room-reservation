function RoomsLoader({ cols = 3 }) {
  return (
    <div>
      <div className={`grid gap-3 md:grid-cols-2 lg:grid-cols-${cols}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-secondary-foreground/16 animate-pulse rounded-xl p-4"
          >
            <div className="mt-2 h-70 w-full bg-transparent"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsLoader;
