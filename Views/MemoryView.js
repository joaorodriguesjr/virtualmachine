import Memory from '../Machine/Memory.js'

const ROWS_NUMBER = 16
const COLS_NUMBER = 16

/**
 * @param {Number} value
 * @returns {String}
 */
 export function hex(value) {
    return value.toString(16)
        .padStart(2, 0)
        .toUpperCase()
}

export default class MemoryView {
    /**
     * @param {Memory} memory
     * @param {Document} document
     */
    constructor(memory, document) {
        this.memory = memory
        this.document = document

        this.initialize()
    }

    initialize() {
        this.registerElements = new Map()
        this.dataElements = []
        const tbody = this.document.querySelector('.memory-view tbody')

        for (let row = 0; row < ROWS_NUMBER; row++) {
            tbody.appendChild(this.createTableRow(row))
        }

        return
    }

    createTableRow(row) {
        const tr = this.document.createElement('tr')
        const th = this.document.createElement('th')
        th.textContent = hex(row * ROWS_NUMBER)
        tr.appendChild(th)

        for (let col = 0; col < COLS_NUMBER; col++) {
            tr.appendChild(this.createTableData(row, col))
        }

        return tr
    }

    createTableData(row, col) {
        let td = this.document.createElement('td')
        td.textContent = hex(this.memory.read(row * ROWS_NUMBER + col))
        this.dataElements.push(td)

        return td
    }

    update() {
        for (const [index, element] of this.dataElements.entries()) {
            element.textContent = hex(this.memory.read(index))
        }
    }

    onRegisterChange(name, index) {
        if (this.registerElements.has(name)) {
            this.registerElements.get(name).classList.remove(`${name}-highlight`)
        }

        this.registerElements.set(name, this.dataElements[index])
        this.registerElements.get(name).classList.add(`${name}-highlight`)
    }
}
