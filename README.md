# Note client for DeviceScript

This project uses [DeviceScript](https://microsoft.github.io/devicescript/)
to interact with a [blues.io Notecard](https://blues.io/products/notecard/).

This library uses the [serial-to-i2c bridge](// https://dev.blues.io/guides-and-tutorials/notecard-guides/serial-over-i2c-protocol/).

** This library has a minimal surface and most messages have not been mapped to types. See [Notecard API](https://dev.blues.io/api-reference/notecard-api/introduction/) for a full list. **

## Setup

Add the library to your DeviceScript project:

```bash
npm install --save pelikhan/devicescript-note
```

## Configuration

Add the notehub product UID into your settings.

```yaml
# .env.defaults
NOTE_PUID=your-product-uid
```

By default, DeviceScript will use the deviceid as a serial number; but you can override this setting.

```yaml
# .env.defaults
NOTE_PUID=your-product-uid
NOTE_SN=your-serial-number
```

## Usage

-   Connect the notecard to your I2C pins and power it up.
-   Start by calling `init` for the initial handshake with the notecard.

```ts
import { delay, millis } from "@devicescript/core"
import { init, request } from "devicescript-note"

// configure product UID and serial number
await init()

while (true) {
    // send node.add request
    const res = await request({ req: "note.add", body: { time: millis() } })
    console.log(res)
    // take a break
    await delay(10000)
}
```

## [Contributing](./CONTRIBUTING.md)
