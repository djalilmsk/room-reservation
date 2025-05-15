function RoomsLoader() {
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl bg-secondary-foreground/16 p-4"
          >
            <div className="mt-2 h-70 w-full bg-transparent"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomsLoader
