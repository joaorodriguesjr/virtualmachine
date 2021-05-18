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
        return new EightBitsRegister()
    }
}

class EightBitsRegister extends Register {
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
        this.onChange(this)
    }

    /**
     * @param {Number} value
     */
    increment(value = 1) {
        this.data.setUint8(0, this.data.getUint8(0) + value)
        this.onChange(this)
    }

    /**
     * @param {Number} value
     */
    decrement(value = 1) {
        this.data.setUint8(0, this.data.getUint8(0) - value)
        this.onChange(this)
    }
}
