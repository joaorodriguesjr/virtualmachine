export default class Frequency {
    /**
     * @param {Number} value
     */
    constructor(value) {
        this.value = value
    }

    /**
     * @returns {Number}
     */
    inMilliseconds() {
        return 1000 / this.value
    }

    /**
     * @param {Number} value
     * @returns {Frequency}
     */
    static HZ(value) {
        return new Frequency(Math.pow(1000, 0) * value)
    }

    /**
     * @param {Number} value
     * @returns {Frequency}
     */
    static KHZ(value) {
        return new Frequency(Math.pow(1000, 1) * value)
    }

    /**
     * @param {Number} value
     * @returns {Frequency}
     */
    static MHZ(value) {
        return new Frequency(Math.pow(1000, 2) * value)
    }
}
