export default function LoadingSpinner() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-label="Loading">
      <span className="size-9 animate-spin rounded-full border-4 border-line border-t-accent" />
    </div>
  )
}
