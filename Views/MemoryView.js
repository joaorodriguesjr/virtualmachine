import Memory from '../Machine/Memory.js'

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
        this.dataElements = []
        const tbody = this.document.querySelector('.memory-view tbody')

        for (let row = 0; row < 16; row++) {
            tbody.appendChild(this.createTableRow(row))
        }

        return
    }

    createTableRow(row) {
        const tr = this.document.createElement('tr')
        const th = this.document.createElement('th')
        th.textContent = hex(row * 16)
        tr.appendChild(th)

        for (let col = 0; col < 16; col++) {
            tr.appendChild(this.createTableData(row, col))
        }

        return tr
    }

    createTableData(row, col) {
        let td = this.document.createElement('td')
        td.textContent = hex(this.memory.read(row * 16 + col))
        this.dataElements.push(td)

        return td
    }

    update() {
        for (const [index, element] of this.dataElements.entries()) {
            element.textContent = hex(this.memory.read(index))
        }
    }

    onPcChange(index) {
        if (this.pcElement) {
            this.pcElement.classList.remove('pc-highlight')
        }

        this.pcElement = this.dataElements[index]
        this.pcElement.classList.add('pc-highlight')
    }

    onMarChange(index) {
        if (this.marElement) {
            this.marElement.classList.remove('mar-highlight')
        }

        this.marElement = this.dataElements[index]
        this.marElement.classList.add('mar-highlight')
    }
}