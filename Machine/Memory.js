export default class Memory {
    /**
     * @param {Number} capacity
     */
    constructor(capacity) {
        this.data = new Uint8Array(capacity)
    }

    /**
     * @param {Number} addr
     * @returns {Number}
     */
    read(addr) {
        return this.data[addr]
    }

    /**
     * @param {Number} addr
     * @param {Number} data
     * @returns {Number}
     */
    write(addr, data) {
        return this.data[addr] = data
    }
}
