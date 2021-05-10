const dayjs = require('dayjs')
require('dayjs/locale/zh-cn') // 加载语言配置
dayjs.locale('zh-cn') // 全局使用
const weekday = require('dayjs/plugin/weekday')
dayjs.extend(weekday)
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
var isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
var isLeapYear = require('dayjs/plugin/isLeapYear') // dependent on isLeapYear plugin
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)
var isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

// 毫秒转周数
function ms2kw(milliseconds) {
    if (milliseconds) {
        let week = dayjs(milliseconds).isoWeek() < 10 ? `0${dayjs(milliseconds).isoWeek()}` : dayjs(milliseconds).isoWeek()
        let day = dayjs(milliseconds).isoWeekday()
        return `KW${week}/${day}`
    } else {
        return ''
    }
}

module.exports = ms2kw