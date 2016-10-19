/**
 * Created by echottzhu on 2016/10/8.
 */
var formatDate = function (date, fmt, flag) {
    if(!date) return;
    var o = {
        "M+" : date.getMonth()+1,
        "d+" : date.getDate(),
        "h+" : flag ? date.getHours() : (date.getHours()%12 == 0 ? 12 : date.getHours()%12),
        "H+" : date.getHours(),
        "m+" : date.getMinutes(),
        "s+" : date.getSeconds(),
        "q+" : Math.floor((date.getMonth()+3)/3),
        "S" : date.getMilliseconds()
    };
    var week = {
        "0" : "\u65e5",
        "1" : "\u4e00",
        "2" : "\u4e8c",
        "3" : "\u4e09",
        "4" : "\u56db",
        "5" : "\u4e94",
        "6" : "\u516d"
    };

    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};
//获取农历日期
var getCDate = {
    CalendarData : new Array(100),
    madd : [0,31,59,90,120,151,181,212,243,273,304,334],
    tgString : "甲乙丙丁戊己庚辛壬癸",
    dzString : "子丑寅卯辰巳午未申酉戌亥",
    numString : "一二三四五六七八九十",
    monString : "正二三四五六七八九十冬腊",
    weekString : "日一二三四五六",
    sx : "鼠牛虎兔龙蛇马羊猴鸡狗猪",
    cYear: "",
    cMonth: "",
    cDay: "",
    TheDate: "",
    CalendarData : [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95],


    GetBit :function(m, n) {
        return (m >> n) & 1;
    },

    e2c : function() {
        var TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getYear();
        if (tmp < 1900) {
            tmp += 1900;
        }
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.madd[TheDate.getMonth()] + TheDate.getDate() - 38;

        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
            total++;
        }
        for (m = 0; ; m++) {
            k = (this.CalendarData[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + this.GetBit(this.CalendarData[m], n)) {
                    isEnd = true; break;
                }
                total = total - 29 - this.GetBit(this.CalendarData[m], n);
            }
            if (isEnd) break;
        }
        this.cYear = 1921 + m;
        this.cMonth = k - n + 1;
        this.cDay = total;
        if (k == 12) {
            if (this.cMonth == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                this.cMonth = 1 - this.cMonth;
            }
            if (this.cMonth > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                this.cMonth--;
            }
        }
    },

    GetcDateString : function() {
        var tmp = "";
        // tmp += tgString.charAt((cYear - 4) % 10);
        // tmp += dzString.charAt((cYear - 4) % 12);
        // tmp += "(";
        // tmp += sx.charAt((cYear - 4) % 12);
        // tmp += ")年 ";
        // if (cMonth < 1) {
        //     tmp += "(闰)";
        //     tmp += monString.charAt(-cMonth - 1);
        // } else {
        //     tmp += monString.charAt(cMonth - 1);
        // }
        // tmp += "月";
        if(this.cDay == 1){
            tmp+= this.monString.charAt((this.cMonth-1)) + "月";

        }else{
            tmp += (this.cDay < 11) ? "初" : ((this.cDay < 20) ? "十" : ((this.cDay < 30) ? "廿" : "三十"));
            if (this.cDay % 10 != 0 || this.cDay == 10) {
                tmp += this.numString.charAt((this.cDay - 1) % 10);
            }
        }
        return tmp;

    },

    GetLunarDay : function(solarYear, solarMonth, solarDay) {
        //solarYear = solarYear<1900?(1900+solarYear):solarYear;
        if (solarYear < 1921 || solarYear > 2020) {
            return "";
        } else {
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
            this.e2c(solarYear, solarMonth, solarDay);
            return this.GetcDateString();
        }
    }
};
var monthArr = ["Jan","Feb","Mar","Apr","May","June","July","August","September","October","November","December"];

var CalendarHeader = React.createClass({
    getInitialState:function(){
        return {
            year: this.props.year,
            month: this.props.month
        };
    },
    handlerLeftClick:function(){
        var newMonth = parseInt(this.state.month)-1;
        var year = this.state.year;
        if(newMonth < 1){
            year-- ;
            newMonth = 12;
        }
        this.state.month = newMonth;
        this.state.year = year;
        this.setState(this.state);
        this.props.updateFilter(year,newMonth);

    },
    handlerRightClick:function(){
        var newMonth = parseInt(this.state.month)+1;
        var year = this.state.year;
        if(newMonth > 12){
            year++ ;
            newMonth = 1;
        }
        this.state.month = newMonth;
        this.state.year = year;
        this.setState(this.state);
        this.props.updateFilter(year,newMonth);
    },
    render:function(){
        return(
            <div className="headerborder">
                <p>{monthArr[this.state.month-1]}&nbsp;&nbsp;&nbsp;&nbsp;{this.state.year}</p>
                <p className="triangle-left" onClick={this.handlerLeftClick}></p>
                <p className="triangle-right" onClick={this.handlerRightClick}></p>
            </div>
        )
    }
});

var CalendarBody = React.createClass({
    getMonthDays:function(){
        var year = this.props.year,
            month = this.props.month;
        var temp = new Date(year,month,0);
        return temp.getDate();
    },
    getFirstDayWeek:function(){
        var year = this.props.year,
            month = this.props.month;
        var dt = new Date(year+'/'+month+'/1');
        var weekDays = dt.getDay();
        return weekDays;
    },
    checkOneDay:function(event){
        var target = event.target;
        var currentDate = this.props.year+"年"+this.props.month+"月"+ target.parentElement.firstChild.textContent +"日";
        window.prompt(currentDate,"在此为该日期新建活动！")
    },
    render:function(){
        var that = this;
        var year = this.props.year,
            month = this.props.month;

        var arry1 = [],arry2=[];
        var getDays = this.getMonthDays(),
            firstDayWeek = this.getFirstDayWeek(),
            day = this.props.day;

        for(var i=0;i<firstDayWeek;i++){
            arry1[i] = i;
        }
        for(var i=0;i<getDays;i++){
            arry2[i]=i+1;
        }
        var node1 = arry1.map(function(item){
            return <li></li>
        });
        var node2 = arry2.map(function (item) {
            var cDate = getCDate.GetLunarDay(year,month,item);
            var isFlag = (cDate.indexOf("月") > 0)?1:0;
            if(isFlag){
                return (day==item)?<li className="currentDay" onClick={that.checkOneDay}><p className="gDate">{item}</p><p className="cDate itgMonth">{cDate}</p></li>
                    :<li onClick={that.checkOneDay}><p className="gDate">{item}</p><p className="cDate itgMonth">{cDate}</p></li>
            }else {
                return (day == item) ?<li className = "currentDay" onClick={that.checkOneDay}> <p className="gDate">{item}</p><p className="cDate">{cDate}</p></li>
                    :<li onClick={that.checkOneDay}><p className="gDate">{item}</p><p className="cDate">{cDate}</p></li>
            }
        });
        return(
            <div>
                <div className="weekday">
                    <ul>
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wen</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                </div>
                <div className="CalendarDay">
                    <ul>
                        {node1}{node2}
                    </ul>
                </div>
            </div>
        )
    }
});

var CalendarControl = React.createClass({
    getInitialState:function(){
        var newDate = new Date();
        return {
            year: formatDate(newDate, "yyyy"),
            month: parseInt(formatDate(newDate, "MM")),
            day: parseInt(formatDate(newDate,"dd"))
        };
    },
    handlerFilterUpdate:function(filterYear,filterMonth){
        this.setState({
            year:filterYear,
            month:filterMonth
        });
    },
    render:function(){
        return(
            <div className="calendarBorder">
                <CalendarHeader
                    year = {this.state.year}
                    month = {this.state.month}
                    updateFilter = {this.handlerFilterUpdate}
                />
                <CalendarBody
                    year = {this.state.year}
                    month = {this.state.month}
                    day = {this.state.day}
                />
            </div>
        )
    }
});

ReactDOM.render(
    <CalendarControl />,
    document.getElementById("myCalendar")
);