import model from '../models/model.ts'

const create = async (ctx) => {
    try {
        const { object } = await ctx.params
            , body = await ctx.request.body().value
            , result = await model.create(object, body)
        ctx.response.body = result
    } catch (error: unknown) {
        console.log(error)
        ctx.response.body = { error: error.message }
    }
}

    , get = async (ctx) => {
        try {
            const { object, id } = await ctx.params

                , result = await model.findOne(object, { id })
            ctx.response.body = result
        } catch (error: unknown) {
            console.log(error)
        }
    }

    , getAll = async (ctx) => {
        try {
            const { object } = await ctx.params
                , result = await model.findAll(object)
            ctx.response.body = result
        } catch (error: unknown) {
            console.log(error)
        }
    }

    , update = async (ctx) => {
        try {
            const { object, id } = await ctx.params
                , body = await ctx.request.body().value
                , result = await model.update(object, { id }, body)
            ctx.response.body = result
        } catch (error: unknown) {
            ctx.response.body = { error: error.message }
        }
    }

    , updateAll = async (ctx) => {
        try {
            const { object } = await ctx.params
                , body = await ctx.request.body().value
                , result = await model.updateAll(object, body)
            ctx.response.body = result
        } catch (error: unknown) {
            console.log(error)
            ctx.response.body = { error: error.message }
        }
    }

    , remove = async (ctx) => {
        try {
            const { object, id } = await ctx.params
                , result = await model.remove(object, { id })
            ctx.response.body = result
        } catch (error: unknown) {
            console.log(error)
        }
    }

    , removeAll = async (ctx) => {
        try {
            const { object } = await ctx.params
                , result = await model.removeAll(object, {})
            ctx.response.body = result
        } catch (error: unknown) {
            console.log(error)
        }
    }
    , login = async (ctx) => {
        try {
            const { object } = await ctx.params
                , headers = await ctx.request.headers
                , email = headers.get('email')
                , password = headers.get('password')
                , result = await model.login(object, { email, password })
            ctx.response.body = { token: result }
        } catch (error: unknown) {
            console.log(error)
            ctx.response.body = { error: error.message }
        }
    }

export default { create, get, getAll, update, updateAll, remove, removeAll, login }