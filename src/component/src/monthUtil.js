let monthUtil = {
    getDefaultMonthStr () {
        let now = new Date()
        return now.getFullYear() + '-' + this.repairZero(now.getMonth()+1)
    },

    getNowMonthStartStr(dateStr) {
        return dateStr + '-' + '01'
    },

    getPrevMonthStartStr(dateStr) {
        let year = Number(dateStr.split('-')[0])
        let month = Number(dateStr.split('-')[1])
        if (month === 1) {
            month = 12
            --year
        } else {
            --month
        }
        return year + '-' + this.repairZero(month) + '-' + '01'
    },

    getNextMonthStartStr(dateStr) {
        let year = Number(dateStr.split('-')[0])
        let month = Number(dateStr.split('-')[1])
        if (month === 12) {
            month = 1
            ++year
        } else {
            ++month
        }
        return year + '-' + this.repairZero(month) + '-' + '01'
    },

    date2str (date) {
        return date.getFullYear() + '-' + this.repairZero(date.getMonth()+1) + '-' + this.repairZero(date.getDate())
    },

    repairZero (num) {
        return num < 10 ? '0' + num : num;
    }

}

export default monthUtil
