import Processor from './Machine/Processor.js';
import Memory from './Machine/Memory.js';
import Frequency from './Machine/Frequency.js';

import MemoryView from './Views/MemoryView.js';

const memory = new Memory(256)
const processor = new Processor(memory)

memory.data[0x00] = 0x02
memory.data[0x01] = 0x80
memory.data[0x02] = 0x03
memory.data[0x03] = 0x81
memory.data[0x04] = 0x01

memory.data[0x80] = 0x0A

const memoryView = new MemoryView(memory, document)

processor.pc.onChange = (register) => {
    memoryView.onPcChange(register.read())
}

processor.mar.onChange = (register) => {
    memoryView.onMarChange(register.read())
}

memoryView.onPcChange(processor.pc.read())

const frequency = Frequency.HZ(1)
const interval = setInterval(() => {
    if (processor.halt) {
        clearInterval(interval)
    }

    processor.cycle()
    memoryView.update()

}, frequency.inMilliseconds())
