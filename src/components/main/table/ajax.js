    function set_start(obj,value, date, endDate,type,el,now) {
        //切换时修改结束日期的最小值和最大值
        obj.val(value);
        var min_option = {}, max_option = {};
        switch (type){
            case 'date':
                min_option = {
                    year: date.year,
                    month: (date.month - 1),
                    date: date.date
                };
                max_option = {
                    year: date.year,
                    month: (date.month - 1),
                    date: date.year == now.getFullYear() && (date.month - 1) == now.getMonth() ? now.getDate() : laydate.getEndDate(date.month, date.year)
                };
                break;
            case 'month':
                min_option = {
                    year: date.year,
                    month: (date.month - 1),
                    date: 1
                };
                max_option = {
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    date: 1
                };
                break;
            case 'year':
                min_option = {
                    year: date.year,
                    month: 0,
                    date: 1
                };
                max_option = {
                    year: now.getFullYear(),
                    month: 0,
                    date: 1
                };
                break;
        }
        el.config.min = min_option;
        el.config.max = max_option;
    }

    function set_end(obj,value, date, endDate,type,el)
    {
        var min_option = {}, max_option = {};
        // obj.val(value);
        switch (type){
            case 'date':
                min_option = {
                    year: date.year,
                    month: (date.month - 1),
                    date: 1
                };
                max_option = {
                    year: date.year,
                    month: (date.month - 1),
                    date: date.date
                };
                break;
            case 'month':
                min_option = {
                    year: 1970,
                    month: 0,
                    date: 1
                };
                max_option = {
                    year: date.year,
                    month: (date.month - 1),
                    date: 1
                };
                break;
            case 'year':
                min_option = {
                    year: 1970,
                    month: 0,
                    date: 1
                };
                max_option = {
                    year: date.year,
                    month: 0,
                    date: 1
                };
                break;
        }
        el.config.min = min_option;
        el.config.max = max_option;
    }

export  {listen,set_start,set_end};
