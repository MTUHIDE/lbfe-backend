const db = require('../models')
const { Op } = require('sequelize')
const logger = require('../logger/logger')

// TODO - Make an Elder Object, and quit destructuring manually you animal. Ideally --> 'const elder = req.body'
// TODO - Provide input cleaning for Create and Edit Elders...
//          -> These should use a suite of functions we can use everywhere
// !        -> For now, trust the user....

const methods = {

    // Destrtucture ID from request and call query with that ID
    async getElderById(req, res) {
        const cId = req.query.id

        if (!cId) return res.status(403).json({ status: "failed", message: "Invalid request." })

        const elder = await db.Elders.findOne({
            attributes: ['*'], // Force 'SELECT *' for the arbitrary indexing
            where: { elderId: cId },
            raw: true, // trims garbage meta from SQL
        })

        return res.status(200).json({ status: "success", elder })
    },

    // Simply grab all Elders, also return total count
    async getAllElders(req, res) {
        const elders = await db.Elders.findAll({ attributes: ['*'], raw: true })
        const count = await db.Elders.count({ raw: true })
        return res.status(200).json({ status: "success", count, elders })
    },

    // Take in the fields for an elder, if the elder exists, update it, otherwise create it
    async createElder(req, res) {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const fullName = firstName + ' ' + lastName // Yeet
        const notes = req.body.notes
        const phoneNumber = req.body.phoneNumber
        const address = req.body.address
        const mobility = req.body.mobility
        const numOfCancels = 0 // We just made them...
        const createdDate = new Date().toISOString().slice(0, 23).replace('T', ' ') // Format to sqlserver datetime object

        const elder = await db.Elders.create({
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

        return res.status(200).json({ message: "success", elder })
    },

    // Take in the fields for a elder, if the edler exists, update it
    async editElder(req, res) {
        const elderId = req.body.elderId
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
        if (!elderId)
            return res.status(403).json({ message: "error", message: "User provided no elder id..." })

        // If we can't find the elder to edit, die gracefully
        if (! (await db.Elders.findOne({
                attributes: ["elderId"],
                where: { elderId: elderId },
                raw: true
            }))
        ) return res.status(403).json({ message: "error", message: "Elder doesn't exist." })

        const success = await db.Elders.update({ // returns boolean iff success
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
            { where: { elderId: elderId } }
        )

        if (success) return res.status(200).json({ message: "success", message: "Elder Updated." })
        return res.status(403).json({ message: "error", message: "Something went wrong. Check fields and try again." })
    },

    // Full send --> kill anything you tell us to 
    async deleteElder(req, res) {
        const dId = req.body.elderId
        await db.Elders.destroy({ where: { elderId: dId } })
        return res.status(200).json({ message: "success", data: "Elder deleted." })
    },
}

module.exports = methods
