import { useState } from 'react'

export function PersonForm({ onSubmit }) {
  let [values, setValues] = useState({ name: '', number: '' })

  let handleChange = (event) => {
    let { name, value } = event.target
    setValues((values) => ({ ...values, [name]: value }))
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        let result = onSubmit(values)

        if (result.status === 'success') {
          setValues({ name: '', number: '' })
        }
      }}
    >
      <div>
        <label htmlFor="name" style={{ display: 'block' }}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="number" style={{ display: 'block' }}>
          Number
        </label>
        <input
          type="text"
          name="number"
          id="number"
          value={values.number}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}
