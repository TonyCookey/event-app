import test from 'japa'
import User from 'App/Models/User'


const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.first_name = 'Anthony'
    user.last_name = 'Iroegbu'
    user.email = 'tonyiroegbu59@gmail.com'
    user.password = 'secretpassword'
    await user.save()

    assert.notEqual(user.password, 'secret')
  })
  
  test('ensure user was successfully created', async (assert) => {

    const user = await User.all()
    assert.typeOf(user, 'array');
  })

  test('ensure Database has only one user', async (assert) => {
    const user = await User.all()
    assert.lengthOf(user, 1, 'There should be only one user');
  })
})
