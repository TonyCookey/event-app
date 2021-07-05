import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure sign in page works', async (assert) => {
    /**
     * Make request
     */
    const { text } = await supertest(BASE_URL).get('/').expect(200)

    /**
     * Construct JSDOM instance using the response HTML
     */
    const { document } = new JSDOM(text).window

    const heading = document.querySelector('.display-4')
    assert.exists(heading)
    assert.equal(heading!.textContent!.trim(), 'Sign in')
  })
  test('ensure sign up page works', async (assert) => {
    /**
     * Make request
     */
    const { text } = await supertest(BASE_URL).get('/signup').expect(200)

    /**
     * Construct JSDOM instance using the response HTML
     */
    const { document } = new JSDOM(text).window

    const heading = document.querySelector('.display-4')
    assert.exists(heading)
    assert.equal(heading!.textContent!.trim(), 'Create your account')
  })
})
