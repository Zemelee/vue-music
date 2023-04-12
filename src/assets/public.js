export function formatDate(timestamp) {
    var date = new Date(timestamp);
    //将时间戳格式转换成年月日时分秒
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

    var strDate = Y + M + D;
    return strDate;
}

export function durationFormat(value) {
    //毫秒转
    if (value > 10000) {
        var minutes = parseInt((value % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.round((value % (1000 * 60)) / 1000);
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        return minutes + ":" + seconds;
    } else if (value < 1000) {//秒
        var minutes = parseInt(value / 60);
        var seconds = Math.round((value % 60));
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        return minutes + ":" + seconds;
    }

}

