import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://api.github.com'

  test('GET Request - Get User Detail', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/linakulakova`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(38889399)
    expect(responseBody.login).toBe("LinaKulakova")
  })

  // Negative test
  test('GET Request - Invalid user', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/invaliduser123`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(404)
  })
})
