const db = require('../models')
const { Op } = require('sequelize')
const logger = require('../logger/logger')

// TODO - Make an Client Object, and quit destructuring manually you animal. Ideally --> 'const client = req.body'
// TODO - Provide input cleaning for Create and Edit Clients...
//          -> These should use a suite of functions we can use everywhere
// !        -> For now, trust the user....

const methods = {

    // Destructure ID from request and call query with that ID
    async getClientById(req, res) {
        const cId = req.query.id

        // If that id doesn't exist, that sucks, oh well
        if (!cId) return res.status(403).json({ status: "failed", message: "Invalid request." })

        const client = await db.Clients.findOne({
            attributes: ['*'], // Force 'SELECT *' for the arbitrary indexing
            where: { clientId: cId },
            raw: true, // trims garbage meta from SQL
        })

        return res.status(200).json({ status: "success", client })
    },

    // Simply grab all Clients, also return total count
    async getAllClients(req, res) {
        const clients = await db.Clients.findAll({ attributes: ['*'], raw: true })
        const count = await db.Clients.count({ raw: true })
        return res.status(200).json({ status: "success", count, clients })
    },

    // Take in the fields for an client, if the client exists, update it, otherwise create it
    async createClient(req, res) {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const fullName = firstName + ' ' + lastName // Yeet (Do we need a full name variable?)
        const notes = req.body.notes
        const phoneNumber = req.body.phoneNumber
        const address = req.body.address
        const mobility = req.body.mobility
        const numOfCancels = 0 // We just made them...
        const createdDate = new Date().toISOString().slice(0, 23).replace('T', ' ') // Format to sqlserver datetime object

        const client = await db.Clients.create({
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
            mobility: mobility,
            notes: notes,
            numOfCancels: numOfCancels,
            createdAt: createdDate,
            updatedAt: createdDate
        })

        return res.status(200).json({ message: "success", client })
    },

    // Take in the fields for a client, if the client exists, update it
    async editClient(req, res) {
        const clientId = req.body.clientId
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const fullName = req.body.fullName
        const address = req.body.address
        const phoneNumber = req.body.phoneNumber
        const mobility = req.body.mobility
        const notes = req.body.notes
        const numOfCancels = req.body.numOfCancels
        const updatedAt = new Date().toISOString().slice(0, 23).replace('T', ' ') // Format to sqlserver datetime object

        // If user sucks at giving us data, die gracefully
        if (!clientId)
            return res.status(403).json({ message: "error", message: "User provided no client id..." })

        // If we can't find the client to edit, die gracefully
        if (! (await db.Clients.findOne({
                attributes: ["clientId"],
                where: { clientId: clientId },
                raw: true
            }))
        ) return res.status(403).json({ message: "error", message: "Client doesn't exist." })

        const success = await db.Clients.update({ // returns boolean if success or fail
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
            mobility: mobility,
            notes: notes,
            numOfCancels: numOfCancels,
            updatedAt: updatedAt
        },
            { where: { clientId: clientId } }
        )

        if (success) return res.status(200).json({ message: "success", message: "Client Updated." })
        return res.status(403).json({ message: "error", message: "Something went wrong. Check fields and try again." })
    },

    // Full send --> kill anything you tell us to 
    // Should this also have a fail option and a try again option if the client isn't found?
    async deleteClient(req, res) {
        const dId = req.body.clientId
        await db.Clients.destroy({ where: { clientId: dId } })
        return res.status(200).json({ message: "success", data: "Client deleted." })
    },
}

module.exports = methods
