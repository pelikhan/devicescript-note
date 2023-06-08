import { pins, board } from "@dsboard/adafruit_qt_py_c3"
import { delay } from "@devicescript/core"
import { HubLogRequest, NoteAddRequest, init, request } from "."

await init({ mode: "continuous", sync: true })

let i = 0
while (true) {
    await delay(5000)
    await request<HubLogRequest>({ req: "hub.log", text: "counter: " + i })
    await request(<NoteAddRequest>{
        req: "note.add",
        body: {
            i,
        },
    })
    console.log(await request({ req: "hub.status" }))
}
