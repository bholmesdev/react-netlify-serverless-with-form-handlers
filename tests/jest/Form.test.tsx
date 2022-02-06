/**
 * @jest-environment jsdom
 */
import Form from '../../src/components/Form'
import { render, fireEvent, waitFor } from '@testing-library/react'

const setup = () => {
  // mock our "fetch" call to a 200
  global.fetch = jest.fn().mockImplementationOnce(
    () => new Promise((resolve) => {
      resolve({
        status: 200,
        json: () => new Promise((resolve) => {
          resolve({ message: 'Something went wrong!' })
        }),
      })
    })
  )

  const form = render(<Form />)
  const nameInput = form.container.querySelector('[name="name"]')
  const hexCodeInput = form.container.querySelector('[name="favoriteHexCode"]')
  const submitButton = form.container.querySelector('[type="submit"]')

  return { form, nameInput, hexCodeInput, submitButton }
}

describe('Form', () => {
  it('resets on successful submission', async () => {
    const { nameInput, hexCodeInput, submitButton } = setup()
    fireEvent.input(nameInput, { target: { value: 'Evan Who?' } })
    fireEvent.input(hexCodeInput, { target: { value: '#ccc' } })
    expect(nameInput.value).toEqual('Evan Who?')
    expect(hexCodeInput.value).toEqual('#ccc')

    await waitFor(() => {
      fireEvent.click(submitButton)
    })
    expect(nameInput.value).toEqual('')
    expect(hexCodeInput.value).toEqual('')
  })
})
