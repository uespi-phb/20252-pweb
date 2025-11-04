class Animal {
  constructor(species, name) {
    this.species = species
    this.name = name
  }

  show() {
    console.log(`<${this.name},${this.species}>`)
  }

  sound() {
    return 'indefinido'
  }
}

class Dog extends Animal {
  constructor(name) {
    super('Cachorro', name)
  }

  makeSound() {
    console.log(this.name, ':', this.sound())
  }

  sound() {
    return 'late'
  }
}

function show(animal) {
  animal.show()
  animal.makeSound()
}

show(new Dog('Totó'))
show(new Dog('Piaba'))
