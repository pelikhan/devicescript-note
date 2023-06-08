import { init, request } from "."
import { startSHTC3 } from "@devicescript/drivers"
import { ewma, auditTime } from "@devicescript/observables"

// configure product UID and serial number
await init()

// mount sensors
const { temperature } = await startSHTC3()

// process temperature readings
temperature.reading
    .pipe(
        // filter data
        ewma(0.9),
        // debounce every 30s
        auditTime(30000)
    )
    .subscribe(async t => { // t is the filtered temperature
        // upload reading as `node.add` request
        await request({ req: "note.add", body: { t } })
    })
