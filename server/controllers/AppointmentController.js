const db = require('../models')
const { Op } = require('sequelize')
const logger = require('../logger/logger')

// TODO - Make an appointment Object, and quit destructuring manually you animal. Ideally --> 'const appointment = req.body'
// TODO - FIX UTC Conversion, for now skipping. Once fixed, reset expected type to be a DATETIME for startDate, endDate, createdAt, updatedAt 
//          -> Should be a suite of functions we can use for universal UTC management
//          -> Assume all requests come in with bad date and need to be formatted
// TODO - Provide input cleaning for Create and Edit appointments...
//          -> These should use a suite of functions we can use everywhere
// !        -> For now, trust the user....

const methods = {

    // Destrtucture ID from request and call query with that ID
    async getAppointmentById(req, res) {
        const aId = req.query.id

        if (!aId) return res.status(403).json({ status: "failed", message: "Invalid request." })

        const appointment = await db.Appointments.findOne({
            attributes: ['*'], // Force 'SELECT *' for the arbitrary indexing
            where: { appointmentId: aId },
            raw: true, // trims garbage meta from SQL
        })

        return res.status(200).json({ status: "success", appointment })
    },

    // Destructure request for startdate and enddate and call query with that range
    async getAllAppointments(req, res) {
        let startDate = req.query.startDate
        let endDate = req.query.endDate

        if (!startDate || !endDate) return res.status(403).json({ status: "failed", message: "Invalid request." })

        // Find range in [StartDate -> EndDate] (Inclusive)
        const appointments = await db.Appointments.findAll({
            attributes: ['*'],
            where: { startDate: { [Op.between]: [startDate, endDate] } },
            raw: true,
        })

        // Also snag number of appointments being returned 
        const count = await db.Appointments.count({
            where: { startDate: { [Op.between]: [startDate, endDate] } },
            raw: true,
        })

        return res.status(200).json({ status: "success", count, appointments })
    },

    // Take in the fields for an appoitment, if the appoitment exists, update it, otherwise create it
    async createAppointment(req, res) {
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const title = req.body.title
        const notes = req.body.notes
        const pickupAddress = req.body.pickupAddress
        const destinationAddress = req.body.destinationAddress
        const driverId = req.body.driverId
        const clientId = req.body.clientId
        const isAllDay = req.body.isAllDay
        const createdDate = new Date().toISOString().slice(0, 23).replace('T', ' ') // Format to sqlserver datetime object

        const appointment = await db.Appointments.create({
            startDate: startDate,
            endDate: endDate,
            title: title,
            notes: notes,
            pickupAddress: pickupAddress,
            destinationAddress: destinationAddress,
            createdAt: createdDate,
            updatedAt: createdDate,
            driverId: driverId,
            clientId: clientId,
            isCancelled: 0, // We just made it
            isArchived: 0,
            isAllDay: isAllDay,
        })

        return res.status(200).json({ message: "success", appointment })
    },

    // Take in the fields for an appoitment, if the appoitment exists, update it
    async editAppointment(req, res) {
        const appointmentId = req.body.appointmentId
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const title = req.body.title
        const notes = req.body.notes
        const pickupAddress = req.body.pickupAddress
        const destinationAddress = req.body.destinationAddress
        const driverId = req.body.driverId
        const clientId = req.body.clientId
        const isAllDay = req.body.isAllDay
        const updatedAt = req.body.updatedAt
        const isCancelled = req.body.isCancelled
        const isArchived = req.body.isArchived

        // If user sucks at giving us data, die gracefully
        if (!appointmentId)
            return res.status(403).json({ message: "error", message: "User provided no appointment id..." })

        // If we can't find the appointment to edit, die gracefully
        if (! (await db.Appointments.findOne({
                attributes: ["appointmentId"],
                where: { appointmentId: appointmentId },
                raw: true
            }))
        ) return res.status(403).json({ message: "error", message: "Appointment doesn't exist." })

        const success = await db.Appointments.update({ // returns boolean iff success
            startDate: startDate,
            endDate: endDate,
            title: title,
            notes: notes,
            pickupAddress: pickupAddress,
            destinationAddress: destinationAddress,
            updatedAt: updatedAt,
            driverId: driverId,
            clientId: clientId,
            isCancelled: isCancelled,
            isArchived: isArchived,
            isAllDay: isAllDay
        },
            { where: { appointmentId: appointmentId } }
        )

        if (success) return res.status(200).json({ message: "success", message: "Appointment Updated." })
        return res.status(403).json({ message: "error", message: "Something went wrong. Check fields and try again." })
    },

    // Full send --> kill anything you tell us to 
    async deleteAppointment(req, res) {
        const aId = req.body.appointmentId
        await db.Appointments.destroy({ where: { appointmentId: aId } })
        logger.info(`Appointment ${aId} deleted`)
        return res.status(200).json({ message: "success", data: "Appointment deleted." })
    },
}

module.exports = methods
