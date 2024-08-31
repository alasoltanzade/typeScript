//Mixins
//mixin is a way to combine multiple classes or objects into a single class that inherits the properties 
//to reuse code across multiple classes without creating a deep inheritance hierarchy.
//A mixin is a way to share and reuse code across multiple classes in TypeScript. It’s like taking a small part of one class and adding it to another class without using inheritance.

function SoundMixin<T extends new (...args: any[]) => {}>(Base: T) {
    return class extends Base {
        makeSound() {
            console.log("Beep boop!");
        }
    };
}

class Toy {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class RobotToy extends SoundMixin(Toy) { }

class FlyingToy extends SoundMixin(Toy) {
    fly() {
        console.log(`${this.name} is flying!`);
    }
}

const robot = new RobotToy("Robo");
robot.makeSound(); // Beep boop!

const flyingToy = new FlyingToy("Buzz");
flyingToy.makeSound(); // Beep boop!
flyingToy.fly(); // Buzz is flying!







class Sprite {
    name = "";
    x = 0;
    y = 0;

    constructor(name: string) {
        this.name = name;
    }
}

// To get started, we need a type which we'll use to extend
// other classes from. The main responsibility is to declare
// that the type being passed in is a class.

type Constructor = new (...args: any[]) => {};

// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:

function Scale<TBase extends Constructor>(Base: TBase) {
    return class Scaling extends Base {
        // Mixins may not declare private/protected properties
        // however, you can use ES2020 private fields
        _scale = 1;

        setScale(scale: number) {
            this._scale = scale;
        }

        get scale(): number {
            return this._scale;
        }
    };
}

// Compose a new class from the Sprite class,
// with the Mixin Scale applier:
const EightBitSprite = Scale(Sprite);

const flappySprite = new EightBitSprite("Bird");
flappySprite.setScale(0.8);
console.log(flappySprite.scale);


//Constrained Mixins
// Now we use a generic version which can apply a constraint on
// the class which this mixin is applied to
type GConstructor<T = {}> = new (...args: any[]) => T;

type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;
type Spritable = GConstructor<Sprite>;
type Loggable = GConstructor<{ print: () => void }>;


function Jumpable<TBase extends Positionable>(Base: TBase) {
    return class Jumpable extends Base {
        jump() {
            // This mixin will only work if it is passed a base
            // class which has setPos defined because of the
            // Positionable constraint.
            this.setPos(0, 20);
        }
    };
}


//Alternative Pattern
// Each mixin is a traditional ES class

class test000 {
    tst() { }
}

class test001 {
    tst1() { }
}

class test002 {
    x = 0;
    y = 0;
}

interface test002 extends test000, test001 { }
applyMixins(test002, [test000, test001]);

let player = new test002();
player.tst();
console.log(player.x, player.y);

// This can live anywhere in your codebase:
function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
            );
        });
    });
}


//Constraints
// A decorator function which replicates the mixin pattern:
const Pausable = (target: typeof Player2) => {
    return class Pausable extends target {
        shouldFreeze = false;
    };
};

@Pausable
class Player2 {
    x = 0;
    y = 0;
}

// The Player class does not have the decorator's type merged:
const player2 = new Player2();
// The runtime aspect could be manually replicated via
// type composition or interface merging.
type FreezablePlayer = Player2 & { shouldFreeze: boolean };

const playerTwo = (new Player2() as unknown) as FreezablePlayer;
playerTwo.shouldFreeze;



//Static Property Mixins
function base<T>() {
    class Base {
        static prop: T;
    }
    return Base;
}

function derived<T>() {
    class Derived extends base<T>() {
        static anotherProp: T;
    }
    return Derived;
}

class Spec extends derived<string>() { }

Spec.prop; // string
Spec.anotherProp; // string