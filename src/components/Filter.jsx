export function Filter({ value, onChange }) {
  return (
    <div>
      <label htmlFor="q" aria-label="Filter by name">
        filter shown with
      </label>{' '}
      <input
        type="search"
        name="q"
        id="q"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
