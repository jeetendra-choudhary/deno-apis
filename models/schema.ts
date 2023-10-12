import { model, Schema, mongoose, mongooseIncrement, bcrypt, create } from '../deps.ts'
const increment = mongooseIncrement(mongoose)
    , login = async function (collection: String, selection: Object) {
        try {
            const user = await this.model(collection).findOne({ email: selection.email })
            if (user && !user.password) {
                return null
            }
            if (user) {
                let result = await bcrypt.compare(selection.password, user.password)
                if (result) {
                    let key = await crypto.subtle.generateKey(
                        { name: "HMAC", hash: "SHA-512" },
                        true,
                        ["sign", "verify"],
                    )
                        , payload = user.toJSON()
                        , token = await create({ alg: "HS512", typ: "JWT" }, user.toJSON(), key)
                    return token
                }
            }
        } catch (error: unknown) {
            return error
        }
    }
    , phoneValidator = async (phone: String) => {
        try {
            let valid = phone.length == 10 && /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(phone)
            return valid
        } catch (error) {
            console.log(error)
            return false
        }
    }
    , baseOption = {
        discreminatorKey: 'user'
        , collection: 'user'
        , timestamp: true
    }
    , person: Schema = new Schema({
        name: String
        , dob: Date
        , gender: {
            type: String,
            enum: ['male', 'female', 'other']
        }
        , phone: {
            type: String,
            validate: [phoneValidator, '`{VALUE}` is not a valid `{PATH}` number!']
        }
        , email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        }
    }, baseOption)
    , admin: Schema = new Schema({
        role: String,
        password: {
            type: String,
            set: v => bcrypt.hashSync(v)
        },
        dept: {
            type: String,
            enum: ['HR', 'SALES', 'DELIVERY'],
            get: v => v == 'HR' ? 'Human Resource' : v == 'SALES' ? 'Sales & Marketing' : 'Delivery & Logistics'
        }
    }, {
        toObject: { getters: true, setters: true },
        toJSON: { getters: true, setters: true }
    })

admin.statics.login = login


person.plugin(increment, {
    modelName: 'person'
    , type: Number
    , fieldName: 'id'
    , increment: 1
    , unique: true
})


let models = {
    person: model('person', person)
    , admin: mongoose.model('person', person).discriminator('admin', admin)
}


export default models