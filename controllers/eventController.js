const models = require("../models");

const { Event, User } = models;

module.exports = {
    addEvent: async (data, userId) => {
        const {
            date, eventType, eventName, eventPlace, eventDescr
        } = data;

        console.log("TCL: data", data)
        
        return await Event.create({
            userId, date, eventType, eventName, eventPlace, eventDescr
        });
    },
    getAllEvents: (userId) => {
        return Event.findAll({
            order: [["id", "DESC"]],
            raw: true,
            attributes: [
                "id",
                "date",
                "eventType",
                "eventName",
                "eventPlace",
                "eventDescr",
            ],
         });  
    },
    getEventById: (eventId) => {
        return Event.findByPk(eventId, {
            include: [
                {
                    model: User, 
                    attributes: ["id"],
                },
            ]
        })
    },
    updateEventById: async (id, data) => {
        const eventUpdate = await Event.update(data, { where: {id}});

        if (eventUpdate) {
            return await Event.findOne({
                where: { id },
            })
        }
    },
    deleteEventById: (id) => {
        return Event.destroy({
            where: {
                id,
            },
        });
    },

}