import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";


export default class DashboardController {
    public async dashboard({ response, view, auth }: HttpContextContract) {
        
        try {
            const today = new Date()
            console.log(today);
            
            const user = await User.findOrFail(auth?.user?.id);

            const events = await user.related('events').query().where('is_deleted', false)
            const active_events = await user.related('events').query().where('is_deleted', false).andWhere('event_start_date','<=', today).andWhere('event_end_date','>=', today)
            const upcoming_events = await user.related('events').query().where('is_deleted', false).andWhere('event_start_date','>', today )
            const past_events = await user.related('events').query().where('is_deleted', false).andWhere('event_end_date','<', today )
            console.log("active events=>",active_events.length,"past events=>",past_events.length, "upcoming events=>",upcoming_events.length);
            

            return view.render('dashboard', {
                events,
                event_length: events.length,
                upcoming_events_length: upcoming_events.length,
                active_events_length: active_events.length,
                past_events_length: past_events.length,

            })
        } catch(error) {
            console.log(error);
            return response.badRequest('Invalid credentials')
            
        }
    }
}
