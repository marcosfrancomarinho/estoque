class Stock {
    constructor() {
        this.arrData = []
        this.id = localStorage.length
        this.alter = true
        this.elm = null
        this.idx = null
    }
    save() {
        if (this.alter) {
            this.arrData.push(this.readDate())
            this.insertTable(this.arrData)
            this.clear()
            this.setLocalStorage()
        } else {
            const index = this.arrData.findIndex(data => data.id == this.idx)
            this.children(1, this.$("#name-product", 2).value)
            this.children(2, this.currency(this.$("#price-product", 2).value))
            this.children(3, this.$("#quantity-product", 2).value)
            this.$(".btn-save", 2).innerText = "SALVAR"
            this.arrData[index] = this.readDate()
            this.setLocalStorage()
            this.alter = true
        }
    }
    children(n, objetc) {
        return this.elm.children[n].innerText = objetc
    }
    readDate() {
        if (!this.alter) {
            return {
                nameProduct: this.$("#name-product", 0),
                priceProduct: this.$("#price-product", 1),
                quantityProduct: this.$("#quantity-product", 1),
                id: this.idx
            }
        } else {
            return {
                nameProduct: this.$("#name-product", 0),
                priceProduct: this.$("#price-product", 1),
                quantityProduct: this.$("#quantity-product", 1),
                id: this.id++
            }
        }
    }
    clear() {
        this.$("#name-product", 3)
        this.$("#price-product", 3);
        this.$("#quantity-product", 3)
        this.$("#name-product", 2).focus()
        this.$(".btn-save", 2).innerText = "SALVAR"
        this.alter = true
    }
    $(value, type) {
        if (type === 0) {
            return document.querySelector(value).value.toLowerCase().trim()
        } else if (type === 1) {
            return Number(document.querySelector(value).value.toLowerCase().trim())
        } else if (type === 2) {
            return document.querySelector(value)
        } else if (type === 3) {
            return document.querySelector(value).value = ""
        }
    }
    insertTable(arr) {
        const tbody = this.$(".products", 2)
        tbody.innerText = ""
        arr.forEach(e => {
            const tr = document.createElement("tr")
            tr.dataset.id = e.id
            tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.nameProduct}</td>
            <td>${this.currency(e.priceProduct)}</td>
            <td>${e.quantityProduct}</td>
            <td>${this.img()}</td>`
            tbody.appendChild(tr)
        })
    }
    img() {
        return `
        <span>
            <img src ='./asset/image/edit.png' onclick = "stock.edit(this)"  class='edit'>
            <img src ='./asset/image/delete.png' onclick = "stock.delete(this)" class='delete'>
        </span>`
    }
    edit(e) {
        this.elm = e.parentElement.parentElement.parentElement
        this.idx = e.parentElement.parentElement.parentElement.dataset.id
        this.$("#name-product", 2).value = this.elm.children[1].innerText
        this.$("#price-product", 2).value = this.getMoney(this.elm.children[2].innerText)
        this.$("#quantity-product", 2).value = this.elm.children[3].innerText
        this.$(".btn-save", 2).innerText = "ATUALIZAR"
        this.alter = null
    }
    getMoney(str) {
        return str
            .replace(/[^\d,]+/g, '')
            .replace(',', '.');
    }
    delete(e) {
        const elm = e.parentElement.parentElement.parentElement
        const ID = e.parentElement.parentElement.parentElement.dataset.id
        const index = this.arrData.findIndex(data => data.id == ID)
        this.arrData.splice(index, 1)
        this.setLocalStorage()
        this.getLocalStorage()
        this.$("tbody", 2).removeChild(elm)
    }
    currency(price) {
        const value = Number(price)
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }
    setLocalStorage() {
        localStorage.setItem("stocks", JSON.stringify(this.arrData))
        localStorage.setItem("ID", this.id)
    }
    getLocalStorage() {
        this.arrData = JSON.parse(localStorage.getItem("stocks"))
        this.id = localStorage.getItem("ID")
        if (this.arrData.length === 0) { this.id = 0 }
    }
    reload() {
        if (localStorage.length > 0) {
            this.getLocalStorage()
            this.arrData.sort()
            this.insertTable(this.arrData)
        }
    }
}
const stock = new Stock()
window.onload = () => stock.reload()
stock.$(".btn-save", 2).onclick = (event) => {
    event.preventDefault()
    stock.save()
}
stock.$(".btn-cancel", 2).onclick = (event) => {
    event.preventDefault()
    stock.clear()
}
