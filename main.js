var five = require("johnny-five");
var board = new five.Board();

var END_SYSEX = 0xF7;
var START_SYSEX = 0xF0;
var STRING_DATA = 0x71;

board.on("ready", function () {
    //console.log(board);
    var sendString = function (string) {
        console.log('sending string: ' + string);
        var bytes = new Buffer(string, 'utf8');
        var data = [];
        data.push(START_SYSEX);
        data.push(STRING_DATA);
        for (var i = 0, length = bytes.length; i < length; i++) {
            data.push(bytes[i] & 0x7F);
            data.push((bytes[i] >> 7) & 0x7F);
        }
        data.push(END_SYSEX);
        //board.sp.write(data);
        board.io.sp.write(data);
    }
    var mapp = [
        "READ_EEPROM_01",
        "READ_EEPROM_02",
        "READ_EEPROM_03",
        "READ_EEPROM_04",
        "EEPROM_READ_COUNTER",
        "EEPROM_WRITE_COUNTER"
    ]
    setInterval(function () {
        sendString(mapp[0]);
    }, 1000);
});

board.on('string', function (string) {
    console.log('receiving string:' + string);
});