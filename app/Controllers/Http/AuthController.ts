import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {
  /**
   * Sign out an authenticated user
   *
   */
  public async signin({ auth, response, request }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const rememberMe = request.input("rememberMe");

    try {
      await auth.use("web").attempt(email, password, rememberMe);
      // await auth.use('web').authenticate()
      // console.log(auth.user)

      response.redirect().toPath("dashboard");
    } catch {
      return response.badRequest("Invalid credentials");
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
    try {
      console.log(request.all());

      await User.create({
        first_name: request.input("firstname"),
        last_name: request.input("lastname"),
        email: request.input("email"),
        password: request.input("password"),
      });
      await auth
        .use("web")
        .attempt(request.input("email"), request.input("password"));
      response.redirect().toPath("dashboard");

    } catch (err) {
      console.error();
      console.log(err);
    }
  }
}
