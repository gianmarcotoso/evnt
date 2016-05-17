# evnt

A small Event Manager library written in ES6. It doesn't do anything more than
what it's supposed to.

## Why?

In the immortal words of XKCD:

![Standards](http://imgs.xkcd.com/comics/standards.png)

## Usage

Install with `npm install evnt` and include it in your project. It works both
with Node and the browser. Use any one of the following styles, depending on
what you're doing:

    // ES5 Style
    var evnt = require('evnt').default

    // ES6 Style
    import evnt from 'evnt'

    // As a script
    <script src="path/to/scripts/evnt.js" />

You can then create as many instances of it as you please, each one is
independent from the others:

    let EventManager = new evnt()

### Registering and unregistering event handlers

Any time you want to register an event, you simply need to call the `.on` method
on the **evnt** instance:

    let sum = (a, b) => a + b
    EventManager.on('my-event', sum)

If you grow tired of a single event handler, you can `.off` it just as easily,
provided you have a reference to the original function:

    EventManager.off('my-event', sum)

You can also unregister _all_ event handlers from an event:

    EventManager.off('my-event')

### Firing events

Any time you want to trigger an event, just `.fire` it. You can, optionally,
pass some arguments along, they will be forwarded to your handlers. The result
of every event handler will be stored in an array, which will be returned by the
`.fire` method. Handlers will be called in the order they were registered:

    let sum = (a, b) => a + b
    let multiply = (a, b) => a * b

    EventManager.on('my-event', sum)
    EventManager.on('my-event', multiply)

    let results = EventManager.fire('my-event', 4, 5)
    // => [9, 20]

## Contributing

Clone the repository, run `npm install`, hack away and add your tests. Run
`npm test` to check that everything is good, and then build with
`npm run build-dist`. If you want a non minified bundled version with source
maps, run `npm run build-dev`, it will be placed in the `dev` directory.

Pull requests and issues are welcome!

## License

MIT
