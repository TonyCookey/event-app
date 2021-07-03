import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
    public async dashboard({ response, view }: HttpContextContract) {
        
        try {
            return view.render('dashboard')
        } catch {
            return response.badRequest('Invalid credentials')
        }
    }
}
