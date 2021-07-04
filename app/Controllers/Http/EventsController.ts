import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { schema } from '@ioc:Adonis/Core/Validator'
import Event from "App/Models/Event";

export default class EventsController {
  public async index({ view }: HttpContextContract) {
    return view.render("create_event");
  }

  public async create({ auth, request }: HttpContextContract) {
   
      const user = await User.findOrFail(auth?.user?.id);

      const eventSchema = schema.create({
        event_name: schema.string({ trim: true }),
        event_description: schema.string({ trim: true }),
        event_address: schema.string({ trim: true }),
        event_category: schema.string({ trim: true }),
        event_start_date: schema.date(),
        event_end_date: schema.date(),
        is_event_free: schema.boolean()

      })
      const payload = await request.validate({ schema: eventSchema })

      await user.related("events").create({
        event_name: payload.event_name,
        event_description: payload.event_description,
        event_address: payload.event_address,
        event_category: payload.event_category,
        event_start_date: payload.event_start_date,
        event_end_date: payload.event_end_date,
        is_event_free: payload.is_event_free
      });

      // console.log("Request =>", request.all(), "Payload=>", payload);   
  }

  public async events({auth, view}: HttpContextContract) {
    const user = await User.findOrFail(auth?.user?.id);

    const events = await user.related('events').query().where('is_deleted', false)
    console.log(events);

    return view.render('events', events)




  }

  public async show({}: HttpContextContract) {
    // const event = await Event.findOrFail()
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
