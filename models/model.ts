import { mongoose } from '../deps.ts'
import models from './schema.ts'

const DBURL = Deno.env.get("DBURL")
await mongoose.connect(DBURL)

const login = async (collection, selectionCriteria) => models[collection].login(collection, selectionCriteria)
    , create = async (objectName, object) => models[objectName].create(object)
    , findOne = async (objectName, selectionCriteria) => models[objectName].findOne(selectionCriteria)
    , findAll = async (objectName) => models[objectName].find()
    , remove = async (objectName, selectionCriteria) => models[objectName].deleteOne(selectionCriteria)
    , removeAll = async (objectName) => models[objectName].deleteMany()
    , update = async (objectName, selectionCriteria, object) => models[objectName].updateOne(selectionCriteria, object)
    , updateAll = async (objectName, object) => models[objectName].updateMany({}, object, { multi: true })

export default { create, findOne, findAll, update, updateAll, remove, removeAll, login }