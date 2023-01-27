radio.onReceivedValue(function (name, value) {
    if (name.compare("mgy") == 0) {
        forward = value
        forward = forward * -1
    }
    if (name.compare("mgx") == 0) {
        right = value
    }
    right_motor = forward - right
    left_motor = forward + right
})
let left_motor = 0
let right_motor = 0
let right = 0
let forward = 0
radio.setGroup(1)
serial.writeLine("Start - wait for radio signal")
basic.showIcon(IconNames.Square)
MotorDriver.MotorStop(Motor.A)
MotorDriver.MotorStop(Motor.B)
basic.forever(function () {
    if (Math.abs(left_motor) < 100 && Math.abs(right_motor) < 100) {
        basic.showIcon(IconNames.SmallSquare)
        MotorDriver.MotorStop(Motor.A)
        MotorDriver.MotorStop(Motor.B)
    } else {
        if (left_motor >= 0) {
            MotorDriver.MotorRun(Motor.B, Dir.forward, left_motor / 100)
        } else {
            MotorDriver.MotorRun(Motor.B, Dir.backward, left_motor / -100)
        }
        if (right_motor >= 0) {
            MotorDriver.MotorRun(Motor.A, Dir.forward, right_motor / 100)
        } else {
            MotorDriver.MotorRun(Motor.A, Dir.backward, right_motor / -100)
        }
        basic.showIcon(IconNames.House)
    }
    basic.pause(200)
})
