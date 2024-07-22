export function Alert({ status, message }) {
  return <div className={`alert alert-${status}`}>{message}</div>
}
