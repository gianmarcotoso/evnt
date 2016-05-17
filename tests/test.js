import EventManager from '../src/EventManager'
import test from 'tape'

test('simple event', (t) => {
    const evnt = new EventManager;
    evnt.on('stuff', () => 42)

    setTimeout(() => {
        let results = evnt.fire('stuff')

        t.ok(Array.isArray(results), "The `fire` method must return an array of results!")
        t.equals(results.length, 1, "We expect 1 result for the simple event test")
        t.equals(results.pop(), 42, "We expect the only result of the simple event test to be 42")

        t.end()
    }, 500)
})

test('multiple handlers on a single event', (t) => {
    const evnt = new EventManager
    evnt.on('stuff', () => 42)
    evnt.on('stuff', () => 'helo')

    setTimeout(() => {
        let results = evnt.fire('stuff')

        t.ok(Array.isArray(results), "The `fire` method must return an array of results!")
        t.equals(results.length, 2, "We expect 1 result for the test")
        t.equals(results[0], 42, "We expect the first result of the test to be 42")
        t.equals(results[1], 'helo', "We expect the second result of test to be 'helo'")

        t.end()
    }, 500)
})

test('multiple events', (t) => {
    const evnt = new EventManager
    evnt.on('first', () => 42)
    evnt.on('second', () => 'helo')

    setTimeout(() => {
        let firstResults = evnt.fire('first')
        let secondResults = evnt.fire('second')

        t.ok(Array.isArray(firstResults), "The `fire` method must return an array of results!")
        t.equals(firstResults.length, 1, "We expect 1 result for the test")
        t.equals(firstResults.pop(), 42, "We expect the first result of the test to be 42")

        t.ok(Array.isArray(secondResults), "The `fire` method must return an array of results!")
        t.equals(secondResults.length, 1, "We expect 1 result for the test")
        t.equals(secondResults.pop(), 'helo', "We expect the first result of the test to be 'helo'")

        t.end()
    }, 500)
})

test('unregister a single event handler for an event', (t) => {
    const evnt = new EventManager
    let someHandler = () => 42
    let otherHandler = () => 'helo'

    evnt.on('first', someHandler)
    evnt.on('first', otherHandler)
    evnt.off('first', otherHandler)

    setTimeout(() => {
        let results = evnt.fire('first')

        t.ok(Array.isArray(results), "The `fire` method must return an array of results!")
        t.equals(results.length, 1, "We expect 1 result for the test")
        t.equals(results.pop(), 42, "We expect the first result of the test to be 42")

        t.end()
    }, 500)
})

test('unregister all event handlers for an event', (t) => {
    const evnt = new EventManager
    let someHandler = () => 42
    let otherHandler = () => 'helo'

    evnt.on('first', someHandler)
    evnt.on('first', otherHandler)

    evnt.off('first')

    setTimeout(() => {
        let results = evnt.fire('first')

        t.ok(Array.isArray(results), "The `fire` method must return an array of results!")
        t.equals(results.length, 0, "We expect no results for the test")

        t.end()
    }, 500)
})

test('passing parameters to an event handler', (t) => {
    const evnt = new EventManager
    let someHandler = (a, b) => a * b

    evnt.on('first', someHandler)

    setTimeout(() => {
        let results = evnt.fire('first', 7, 6)

        t.ok(Array.isArray(results), "The `fire` method must return an array of results!")
        t.equals(results.length, 1, "We expect 1 result for the test")
        t.equals(results.pop(), 42, "We expect the first result of the test to be 42")

        t.end()
    }, 500)
})
