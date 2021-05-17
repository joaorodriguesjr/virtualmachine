import Memory from './Memory.js'
import Register from './Register.js'
import Frequency from './Frequency.js'

const instructions = [
    { mnemonic: 'NOP', length: 1 },
    { mnemonic: 'HLT', length: 1 },
    { mnemonic: 'LDA', length: 2 },
    { mnemonic: 'STA', length: 2 },
]

export default class Processor {
    /**
     * @param {Memory} memory
     */
    constructor(memory) {
        this.memory = memory

        this.pc = Register.eightBits()
        this.ac = Register.eightBits()

        this.mar = Register.eightBits()
        this.mdr = Register.eightBits()

        this.halt = false
    }

    /**
     * @param {Frequency} frequency
     */
    start(frequency) {
        const interval = setInterval(() => {
            if (this.halt) {
                clearInterval(interval)
            }

            this.cycle()
        }, frequency.inMilliseconds())
    }

    cycle() {
        this.mar.write(this.pc.read())
        this.fetch().decode().execute()

        this.pc.increment(this.instruction.length)
        return this
    }

    fetch() {
        this.mdr.write(this.memory.read(this.mar.read()))
        return this
    }

    decode() {
        this.instruction = instructions[this.mdr.read()]
        return this
    }

    execute() {
        this[this.instruction.mnemonic].call(this)
        return this
    }

    NOP() {
        return
    }

    HLT() {
        this.halt = true
    }

    LDA() {
        this.mar.write(this.pc.read() + (this.instruction.length - 1))
        this.mdr.write(this.memory.read(this.mar.read()))
        this.mar.write(this.mdr.read())
        this.mdr.write(this.memory.read(this.mar.read()))

        this.ac.write(this.mdr.read())
    }

    STA() {
        this.mar.write(this.pc.read() + (this.instruction.length - 1))
        this.mdr.write(this.memory.read(this.mar.read()))
        this.mar.write(this.mdr.read())

        this.memory.write(this.mar.read(), this.ac.read())
    }
}
