import { delay, millis } from "@devicescript/core"
import { init, request } from "."

// configure product UID and serial number
await init()

while (true) {
    // send node.add request
    const res = await request({ req: "note.add", body: { time: millis() } })
    console.log(res)
    // take a break
    await delay(10000)
}
