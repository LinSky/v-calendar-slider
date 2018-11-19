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
    },

    fetch (options) {
        let _this = this
        let defaultOptions = {
            method: 'GET',
            async: true,
            data: {}
        }
        let opts = Object.assign(defaultOptions, options)
        console.log(opts);
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            let params = _this.formatParams(opts.data)

            if (opts.method.toUpperCase() === 'GET') {
                xhr.open('GET', opts.url + '?' + params, opts.async)
                xhr.send(null)
            } else if (opts.method.toUpperCase() === 'POST') {
                xhr.open('POST', opts.url, opts.async)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.send(params)
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    let status = xhr.status
                    if (status >= 200 && status < 300 || status == 304) {
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        reject(status)
                    }
                }
            }
        })
    },

    formatParams (data) {
        var arr = [];
        for (var name in data) {
          arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&')
    }

}

export default monthUtil
