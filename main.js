import Processor from './Machine/Processor.js';
import Memory from './Machine/Memory.js';
import Frequency from './Machine/Frequency.js';

const memory = new Memory(256)
const processor = new Processor(memory)
processor.start(Frequency.HZ(1))

memory.data[0x00] = 0x02
memory.data[0x01] = 0x80
memory.data[0x02] = 0x03
memory.data[0x03] = 0x81
memory.data[0x04] = 0x01

memory.data[0x80] = 0x0A
