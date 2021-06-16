import Processor from './Machine/Processor.js';
import Memory from './Machine/Memory.js';
import Frequency from './Machine/Frequency.js';
import MemoryView from './Views/MemoryView.js';

const memory = new Memory(256)
const processor = new Processor(memory)
const memoryView = new MemoryView(memory, document)

memory.write(0x00, 0x02)
memory.write(0x01, 0x80)
memory.write(0x02, 0x03)
memory.write(0x03, 0x90)
memory.write(0x04, 0x01)
memory.write(0x80, 0x0A)

processor.pc.onChange  = (value) => memoryView.onRegisterChange('pc' , value)
processor.mar.onChange = (value) => memoryView.onRegisterChange('mar', value)

const interval = setInterval(() => {
    if (processor.halt) {
        clearInterval(interval)
    }

    processor.cycle()
    memoryView.update()

}, Frequency.HZ(5).inMilliseconds())
