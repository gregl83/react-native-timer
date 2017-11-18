import ReactTimer from "react-timer"
import Interval from "./Interval"

export default class Timer extends ReactTimer {
    constructor (config, interval) {
        if (!interval) {
            interval = new Interval
        }

        super(config, interval)
    }
}