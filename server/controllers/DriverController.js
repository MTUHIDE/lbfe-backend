const db = require('../models')
const { Op } = require('sequelize')
const logger = require('../logger/logger')

// TODO - Make a Driver Object, and quit destructuring manually you animal. Ideally --> 'const driver = req.body'
// TODO - Provide input cleaning for Create and Edit Drivers...
//          -> These should use a suite of functions we can use everywhere
// !        -> For now, trust the user....

const methods = {

    // Destrtucture ID from request and call query with that ID
    async getDriverById(req, res) {
        const dId = req.query.id

        if (!dId) return res.status(403).json({ status: "failed", message: "Invalid request." })

        const driver = await db.Drivers.findOne({
            attributes: ['*'], // Force 'SELECT *' for the arbitrary indexing
            where: { driverId: dId },
            raw: true, // trims garbage meta from SQL
        })

        return res.status(200).json({ status: "success", driver })
    },

    // Simply grab all Drivers, also return total count
    async getAllDrivers(req, res) {
        const drivers = await db.Drivers.findAll({ attributes: ['*'], raw: true })
        const count = await db.Drivers.count({ raw: true })
        return res.status(200).json({ status: "success", count, drivers })
    },

    // Take in the fields for an appoitment, if the appoitment exists, update it, otherwise create it
    async createDriver(req, res) {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const fullName = firstName + ' ' + lastName // Yeet
        const insuranceId = req.body.insuranceId
        const notes = req.body.notes
        const phoneNumber = req.body.phoneNumber
        const address = req.body.address
        const createdDate = new Date().toISOString().slice(0, 23).replace('T', ' ') // Format to sqlserver datetime object

        const driver = await db.Drivers.create({
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
            insuranceId: insuranceId,
            notes: notes,
            phoneNumber: phoneNumber,
            address: address,
            createdAt: createdDate,
            updatedAt: createdDate
        })

        return res.status(200).json({ message: "success", driver })
    },

    // Take in the fields for an appoitment, if the appoitment exists, update it
    async editDriver(req, res) {
        const driverId = req.body.driverId
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const fullName = req.body.fullName
        const insuranceId = req.body.insuranceId
        const notes = req.body.notes
        const phoneNumber = req.body.phoneNumber
        const address = req.body.address
        const updatedAt = new Date().toISOString().slice(0, 23).replace('T', ' ') // Format to sqlserver datetime object

        // If user sucks at giving us data, die gracefully
        if (!driverId)
            return res.status(403).json({ message: "error", message: "User provided no driver id..." })

        // If we can't find the driver to edit, die gracefully
        if (! (await db.Drivers.findOne({
                attributes: ["driverId"],
                where: { driverId: driverId },
                raw: true
            }))
        ) return res.status(403).json({ message: "error", message: "Driver doesn't exist." })

        const success = await db.Drivers.update({ // returns boolean iff success
            driverId: driverId,
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
            insuranceId: insuranceId,
            notes: notes,
            phoneNumber: phoneNumber,
            address: address,
            updatedAt: updatedAt
        },
            { where: { driverId: driverId } }
        )

        if (success) return res.status(200).json({ message: "success", message: "Driver Updated." })
        return res.status(403).json({ message: "error", message: "Something went wrong. Check fields and try again." })
    },

    // Full send --> kill anything you tell us to 
    async deleteDriver(req, res) {
        const dId = req.body.driverId
        await db.Drivers.destroy({ where: { driverId: dId } })
        return res.status(200).json({ message: "success", data: "Driver deleted." })
    },
}

module.exports = methods
