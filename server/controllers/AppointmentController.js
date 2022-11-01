const db = require('../models')
const { Op } = require('sequelize')

const methods = {

    // Destrtucture ID from request and call query with that ID
    async getAppointmentById(req, res) {
        const aId = req.query.id

        const appointment = await db.Appointments.findOne({
            attributes: ['*'], // Force 'SELECT *' for the arbitrary indexing
            where: { id: aId },
            raw: true, // trim garbage meta from SQL
        })

        return res.status(200).json({ status: "success", appointment })
    },

    // Destructure request for startdate and enddate and call query with that range
    async getAllAppointments(req, res) {
        const startDate = req.query.startDate
        const endDate = req.query.endDate

        // Find range in [StartDate -> EndDate] (Inclusive)
        const appointments = await db.Appointments.findAll({
            attributes: ['*'], 
            where: { appointment_date_time: { [Op.between]: [startDate, endDate] } }, 
            raw: true,
        })

        // Also snag number of appointments being returned 
        const count = await db.Appointments.count({
            where: { appointment_date_time: { [Op.between]: [startDate, endDate] } },
            raw: true,
        })

        return res.status(200).json({ status: "success", count, appointments })
    },

    // async createAppointment(req, res) {
    //     return res.status(204).json({ message: "success", data: "Route not implemented." })
    // },

    // async deleteAppointment(req, res) {
    //     return res.status(204).json({ message: "success", data: "Route not implemented." })
    // },
}

module.exports = methods
