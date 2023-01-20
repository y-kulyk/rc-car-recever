radio.onReceivedValue(function (name, value) {
    images.createImage(`
        . . # # .
        . # # . #
        . . # # .
        . # # . #
        . . # # .
        `).showImage(0)
    if (name.compare("mgy") == 0) {
        backward = value
    }
    if (name.compare("mgx") == 0) {
        right = value
    }
    left_motor = -1 * backward + right
    right_motor = -1 * backward - right
})
let right_motor = 0
let left_motor = 0
let right = 0
let backward = 0
radio.setGroup(1)
serial.writeLine("Start- wait for radio signal")
basic.showIcon(IconNames.Square)
basic.forever(function () {
    if (left_motor >= 0) {
        MotorDriver.MotorRun(Motor.B, Dir.forward, left_motor / 64)
    } else {
        MotorDriver.MotorRun(Motor.B, Dir.backward, left_motor / -64)
    }
    if (right_motor >= 0) {
        MotorDriver.MotorRun(Motor.A, Dir.forward, right_motor / 64)
    } else {
        MotorDriver.MotorRun(Motor.A, Dir.backward, right_motor / -64)
    }
})
loops.everyInterval(5000, function () {
    serial.writeLine("If no radio received - will stop")
    basic.showLeds(`
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
        `)
    serial.writeLine("Motors set to stop")
    left_motor = 64
    right_motor = 64
})
