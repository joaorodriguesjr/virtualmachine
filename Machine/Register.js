export default class Register {
    /**
     * @param {Number} capacity
     */
    constructor(capacity) {
        this.data = new DataView(new ArrayBuffer(capacity))
    }

    /**
     * @returns {Number}
     */
    read() {
        throw new Error('Calling read method from abstract class Register is not allowed')
    }

    /**
     * @param {Number} value
     */
    write(value) {
        throw new Error('Calling write method from abstract class Register is not allowed')
    }

    onChange() {
        return
    }

    /**
     * @returns {Register}
     */
    static eightBits() {
        return new EightBits()
    }

    /**
     * @returns {Status}
     */
    static status() {
        return new Status(new EightBits())
    }
}

class EightBits extends Register {
    constructor() {
        super(1)
    }

    /**
     * @returns {Number}
     */
    read() {
        return this.data.getUint8(0)
    }

    /**
     * @param {Number} value
     */
    write(value) {
        this.data.setUint8(0, value)
        this.onChange(this.read())
    }

    /**
     * @param {Number} value
     */
    increment(value = 1) {
        this.data.setUint8(0, this.data.getUint8(0) + value)
        this.onChange(this.read())
    }

    /**
     * @param {Number} value
     */
    decrement(value = 1) {
        this.data.setUint8(0, this.data.getUint8(0) - value)
        this.onChange(this.read())
    }
}

class Status {
    /**
     * @param {Register} register
     */
    constructor(register) {
        this.register = register
    }

    /**
     * @private
     * @param {Number} offset
     * @returns {Number}
     */
    getBit(offset) {
        return this.register.read() & Math.pow(2, offset)
    }

    /**
     * @private
     * @param {Number} offset
     */
    setBit(offset) {
        this.register.write(this.register.read() | Math.pow(2, offset))
    }

    /**
     * @private
     * @param {Number} offset
     */
    clearBit(offset) {
        this.register.write(this.register.read() &~ Math.pow(2, offset))
    }

    /**
     * @returns {Number}
     */
    get carry() {
        return this.getBit(0)
    }

    /**
     * @returns {void}
     */
    setCarry() {
        return this.setBit(0)
    }

    /**
     * @returns {void}
     */
    clearCarry() {
        return this.clearBit(0)
    }

    /**
     * @returns {Number}
     */
    get zero() {
        return this.getBit(1)
    }

    /**
     * @returns {void}
     */
    setZero() {
        return this.setBit(1)
    }

    /**
     * @returns {void}
     */
    clearZero() {
        return this.clearBit(1)
    }

    /**
     * @returns {Number}
     */
    get interrupt() {
        return this.getBit(2)
    }

    /**
     * @returns {void}
     */
    setInterrupt() {
        return this.setBit(2)
    }

    /**
     * @returns {void}
     */
    clearInterrupt() {
        return this.clearBit(2)
    }

    /**
     * @returns {Number}
     */
    get decimal() {
        return this.getBit(3)
    }

    /**
     * @returns {void}
     */
    setDecimal() {
        return this.setBit(3)
    }

    /**
     * @returns {void}
     */
    clearDecimal() {
        return this.clearBit(3)
    }

    /**
     * @returns {Number}
     */
    get break() {
        return this.getBit(4)
    }

    /**
     * @returns {void}
     */
    setBreak() {
        return this.setBit(4)
    }

    /**
     * @returns {void}
     */
    clearBreak() {
        return this.clearBit(4)
    }

    /**
     * @returns {Number}
     */
    get overflow() {
        return this.getBit(6)
    }

    /**
     * @returns {void}
     */
    setOverflow() {
        return this.setBit(6)
    }

    /**
     * @returns {void}
     */
    clearOverflow() {
        return this.clearBit(6)
    }

    /**
     * @returns {Number}
     */
    get negative() {
        return this.getBit(7)
    }

    /**
     * @returns {void}
     */
    setNegative() {
        return this.setBit(7)
    }

    /**
     * @returns {void}
     */
    clearNegative() {
        return this.clearBit(7)
    }
}
