const express = require("express");
const router = express.Router();

const authMiddleware = require("../utils/jwt");
const eventController = require("../controllers/eventController");
const ForbiddenError = require("../utils/errors/forbidden_403_error");

router.get("/getevents", async (req, res) => {
    const eventFound = await eventController.getAllEvents(req.params.userId);

    if (eventFound) {
        res.status(200).json({
            eventFound,
        })
    }
});

router.get("/event/:eventId", async (req, res) => {
    const eventFound = await eventController.getEventById(req.params.eventId);

    if (eventFound) {
        res.status(200).json({
            eventFound,
        })
    }
});
router.post("/addevent", authMiddleware.authenticateJWT, async (req, res) => {
    console.log(req.body)
    console.log("requser",req.user)
    const { userAdmin } = req.user;
    console.log("TCL: userAdmin", userAdmin)
    // const { date, eventType, eventName, eventPlace, eventDescr } = req.body;
    console.log("userAdmin", userAdmin)
    console.log("====> 1");
    
    if (userAdmin !== true) {
        throw new ForbiddenError(
            "Mauvaise requête - erreur client",
            "Vous n'êtes pas autorisé à poster de projet"
          );
    }
    
    console.log("====> 2");
    const newEvent = await eventController.addEvent(req.body, req.user.userID);
    if (newEvent) {
        console.log('i am here dude')
    }
    console.log("====> 3")
    res.status(201).json({
        id: newEvent.id,
        date: newEvent.date,
        eventType: newEvent.eventType,
        eventName: newEvent.eventName,
        eventPlace: newEvent.eventPlace,
        eventDescr: newEvent.eventDescr,
    });
    console.log("====> soleil")

});

router.put("/editevent/:eventId", async (req, res) => {
    const data = req.body;
    const eventUpdate = await eventController.updateEventById(req.params.eventId, data);

    res.status(200).json({ event: eventUpdate });
});

router.delete("/deleteevent/:eventId", async (req, res) => {
    const event = await eventController.deleteEventById(req.params.eventId);

    if (event) {
        res.status(200).json({
            message: "Evènement supprimé",
        });
    } else {
        throw new NotFoundError(
        "Mauvaise requête - erreur client",
        "Ce projet n'a pas été supprimé"
        );
    }
})

module.exports = router;
