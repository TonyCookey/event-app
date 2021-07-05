import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class AuthController {
  /**
   * Sign out an authenticated user
   *
   */
  public async signin({ auth, response, request, session }: HttpContextContract) {
    try {
      const email = request.input("email");
      const password = request.input("password");
      const rememberMe = request.input("rememberMe");

      const user = await User.findBy('email', email)
      // console.log(user);
      

      if (user == null) {
        session.flash('error', "User does not exist. Please create an account")
        return response.redirect().back()
        
      }
      await auth.use("web").attempt(email, password, rememberMe);
        response.redirect().toPath("dashboard");




    } catch (error) {
      session.flash('error', "Invalid Credentials. Password Mismatch")
      console.log(error);
      return response.redirect().back()
    }
  }
  public async signout({ auth, response }: HttpContextContract) {
    try {
      await auth.use("web").logout();
      response.redirect("/");
    } catch {
      return response.badRequest("Invalid credentials");
    }
  }

  /**
   * Create a new user
   */
  public async signup({ request, auth, response }: HttpContextContract) {
    

      const eventSchema = schema.create({
        first_name: schema.string({ trim: true }),
        last_name: schema.string({ trim: true }),
        email: schema.string({ trim: true },[
          rules.unique({ table: 'users', column: 'email' })
        ]),
        password: schema.string(),
      })
      const payload = await request.validate({ schema: eventSchema })

      await User.create({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
      });
      await auth
        .use("web")
        .attempt(request.input("email"), request.input("password"));
      response.redirect().toPath("dashboard");
  }
}
