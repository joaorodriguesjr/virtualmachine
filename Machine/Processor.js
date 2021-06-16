import Memory from './Memory.js'
import Register from './Register.js'
import Instruction from './Instruction.js'

const instructions = [
    { mnemonic: 'NOP', addressing: 'IMP', length: 1, cycles: 1 },
    { mnemonic: 'HLT', addressing: 'IMP', length: 1, cycles: 1 },
    { mnemonic: 'LDA', addressing: 'ABS', length: 2, cycles: 3 },
    { mnemonic: 'STA', addressing: 'ABS', length: 2, cycles: 3 },
    { mnemonic: 'CMP', addressing: 'ABS', length: 2, cycles: 3 },
]

export default class Processor {
    /**
     * @param {Memory} memory
     */
    constructor(memory) {
        this.memory = memory

        this.pc = Register.eightBits()
        this.ac = Register.eightBits()

        this.status = Register.status()

        this.mar = Register.eightBits()
        this.mdr = Register.eightBits()

        this.halt = false
        this.cycles = 0
    }

    /**
     * @returns {void}
     */
    cycle() {
        this.cycles++

        if (this.instruction) {
            return this.execute()
        }

        this.fetch().decode()

        if (this.instruction.isImplied()) {
            this.execute()
        }
    }

    fetch() {
        this.mar.write(this.pc.read())
        this.mdr.write(this.memory.read(this.mar.read()))
        return this
    }

    decode() {
        this.instruction = Instruction.create(instructions[this.mdr.read()])
        return this
    }

    execute() {
        if (! this.instruction.isReady(this.cycles)) {
            return this.instruction.callAddressing(this)
        }

        this.instruction.callExecution(this)
        this.complete()
    }

    complete() {
        if (! this.halt) {
            this.pc.increment(this.instruction.length)
        }

        delete this.instruction
        this.cycles = 0
    }

    IMP() { return }

    ABS() {
        this.mar.write(this.pc.read() + this.instruction.calculateOffset(this.cycles))
        this.mdr.write(this.memory.read(this.mar.read()))
    }

    NOP() { return }

    HLT() { this.halt = true }

    LDA() {
        this.mar.write(this.mdr.read())
        this.mdr.write(this.memory.read(this.mar.read()))

        this.ac.write(this.mdr.read())
    }

    STA() {
        this.mar.write(this.mdr.read())
        this.memory.write(this.mar.read(), this.ac.read())
    }

    CMP() {
        if (this.ac.read() === this.mdr.read()) {
            this.status.setZero()
        } else {
            this.status.clearZero()
        }

        if (this.ac.read() >= this.mdr.read()) {
            this.status.setCarry()
        } else {
            this.status.clearCarry()
        }
    }
}
