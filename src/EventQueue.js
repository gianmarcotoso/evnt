class EventQueue {
    constructor(event) {
        const _event = event;
        Object.defineProperty(this, 'event', {
            enumerable: true,
            get: () => _event
        })

        this.queue = []
    }

    push(handler) {
        this.queue.push(handler)
    }

    unregister(action) {
        this.queue = this.queue.filter(h => h.action !== action)
    }

    run(...params) {
        return this.queue.map(h => h.handle(...params))
    }
}

export default EventQueue
