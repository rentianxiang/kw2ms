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



function kw2ms(year, kwWeek, option) {
    // 尝试矫正不正确的输入值
    if (Object.prototype.toString.call(year) !== '[object String]') {
        year = year.toString()
    }
    if (!/kw/i.test(kwWeek) && /\d{2}\/\d{1}/.test(kwWeek)) {
        kwWeek = 'KW' + kwWeek
    }
    // 提取输入值
    let week = parseInt(kwWeek.slice(2).split('/')[0])
    let day = parseInt(kwWeek.slice(2).split('/')[1])
    // 计算年初是周几
    let yearStartIsoWeekDay = dayjs(year, 'YYYY').isoWeekday()
    let diff
    if (yearStartIsoWeekDay == 1) {
        // 如果是周一,说明今年的开始就是周一,完美
        diff = 0
    } else if (yearStartIsoWeekDay < 5) {
        // 如果是周2-4,说明今年的KW01/1在去年,需要减
        diff = (yearStartIsoWeekDay - 1) * -1
    } else {
        // 如果是周5-7,说明去年有KW53,今年的KW01/1在之后,需要加
        diff = 7 - yearStartIsoWeekDay + 1
    }
    // 计算今年的KW01/1: 根据今年的01/01与其对应的周几进行计算得出
    let yearStart = dayjs(year, 'YYYY').add(diff, 'day')
    // 1天的开始是+1秒,1天的结束是-1秒
    let result = yearStart.add(week - 1, 'week').add(day - 1, 'day').endOf('day').subtract(999, 'millisecond')
    // 默认输出1天的结束
    if (option == 'start') {
        result = result.startOf('day').add(1, 'second')
    }
    return result.valueOf()
}

module.exports = kw2ms