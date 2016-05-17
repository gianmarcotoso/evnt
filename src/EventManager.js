import EventQueue from './EventQueue'
import EventHandler from './EventHandler'

class EventManager {
    constructor() {
        const queues = {}
        Object.defineProperty(this, 'queues', {
            enumerable: true,
            get: () => queues
        })
    }

    clearQueue(event) {
        this.queues[event] = new EventQueue(event)

        return this
    }

    getQueue(event) {
        if (!this.queues[event]) {
            this.clearQueue(event)
        }

        return this.queues[event]
    }

    off(event, action) {
        if (!action) {
            this.clearQueue(event)

            return this
        }

        this.getQueue(event).unregister(action)

        return this
    }

    on(event, action) {
        this.getQueue(event).push(new EventHandler(event, action))

        return this
    }

    fire(event, ...params) {
        return this.getQueue(event).run(...params)
    }
}

export default EventManager
