class EventHandler {
    constructor(event, action) {
        if (!action || !action.constructor === Function) {
            throw new Error("An event handler must have a function as its handler!")
        }

        this.event = event
        this.action = action
    }

    handle(...params) {
        return this.action(...params)
    }
}

export default EventHandler
