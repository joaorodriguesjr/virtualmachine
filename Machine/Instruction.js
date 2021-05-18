import Processor from './Processor.js'

export default class Instruction {
    /**
     * @param {String} mnemonic
     * @param {String} addressing
     * @param {Number} length
     * @param {Number} cycles
     */
    constructor(mnemonic, addressing, length, cycles) {
        this.mnemonic = mnemonic
        this.addressing = addressing
        this.length = length
        this.cycles = cycles
    }

    /**
     * @param {Number} cycles
     * @returns {boolean}
     */
    isReady(cycles) {
        return cycles === this.cycles
    }

    /**
     * @returns {boolean}
     */
    isImplied() {
        return this.addressing === 'IMP'
    }

    /**
     * @param {Processor} processor
     * @returns {void}
     */
    callAddressing(processor) {
        processor[this.addressing].call(processor)
    }

    /**
     * @param {Processor} processor
     * @returns {void}
     */
    callExecution(processor) {
        processor[this.mnemonic].call(processor)
    }

    /**
     * @param {Number} cycles
     * @returns {Number}
     */
    calculateOffset(cycles) {
        return this.length - (this.cycles - cycles)
    }

    /**
     * @param {Object} data
     * @returns {Instruction}
     */
    static create(data) {
        return new Instruction(data.mnemonic, data.addressing, data.length, data.cycles)
    }
}
