class Shoe {
  constructor(model, color) {
    console.log(`** Shoe(${model},${color})`)
    this.model = model
    this.color = color
  }

  get getColor() {
    return this.color
  }

  set setColor(color) {
    if (color.length > 10) return

    this.color = color
  }

  show() {
    console.log('Modelo:', this.model)
    console.log('Cor   :', this.color)
  }

  static showClassName() {
    console.log('< class Shoe >')
  }
}

let shoes = [
  new Shoe('Tênis', 'preto'),
  new Shoe('Sapato', 'marrom'),
  new Shoe('Sandália', 'prata'),
]

for (let shoe of shoes) {
  shoe.show()
  Shoe.showClassName()
}
