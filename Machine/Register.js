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
        switch (this.data.byteLength) {
            case 1:
                return this.data.getUint8(0)
            case 2:
                return this.data.getUint16(0)
        }
    }

    /**
     * @param {Number} value
     */
    write(value) {
        switch (this.data.byteLength) {
            case 1:
                this.data.setUint8(0, value)
                break
            case 2:
                this.data.setUint16(0, value)
                break
        }
    }

    /**
     * @param {Number} value
     */
    increment(value = 1) {
        switch (this.data.byteLength) {
            case 1:
                this.data.setUint8(0, this.data.getUint8(0) + value)
                break
            case 2:
                this.data.setUint16(0, this.data.getUint16(0) + value)
                break
        }
    }

    /**
     * @returns {Register}
     */
    static eightBits() {
        return new Register(1)
    }

    /**
     * @returns {Register}
     */
    static sixteenBits() {
        return new Register(2)
    }
}
