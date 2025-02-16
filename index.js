const testEmployee = ['Bob', 'Wilson', 'Admiral', 35];
const testEmployeeWithTimeInAndOut = {
    firstName: 'Bob',
    familyName: 'Wilson',
    title: 'Admiral',
    payPerHour: 35,
    timeInEvents: [{
        type: 'TimeIn',
        hour: 900,
        date: '2025-02-12'
    }],
    timeOutEvents: [{
        type: 'TimeOut',
        hour: 1700,
        date: '2025-02-12'
    }],
};
const testEmployees = [['Bob', 'Wilson', 'Admiral', 35], ['Jon', 'Brannom', 'Captain', 30]];

let testEmployeesArray = createEmployeeRecords(testEmployees);
createTimeInEvent.call(testEmployeesArray[0], '2025-02-16 900');
createTimeOutEvent.call(testEmployeesArray[0], '2025-02-16 1700');
createTimeInEvent.call(testEmployeesArray[0], '2025-02-17 900');
createTimeOutEvent.call(testEmployeesArray[0], '2025-02-17 1700');
createTimeInEvent.call(testEmployeesArray[1], '2025-02-16 900');
createTimeOutEvent.call(testEmployeesArray[1], '2025-02-16 1700');
createTimeInEvent.call(testEmployeesArray[1], '2025-02-17 900');
createTimeOutEvent.call(testEmployeesArray[1], '2025-02-17 1700');

// console.log(testEmployeesArray);

function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
// console.log(createEmployeeRecord(testEmployee));

function createEmployeeRecords(arrayOfEmployees) {
    return arrayOfEmployees.map(array => {
        return createEmployeeRecord(array)
    })
}
// console.log(createEmployeeRecords(testEmployees));

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1], 10),
        date: dateStamp.split(' ')[0],
    });
    return this;
}
// console.log(createTimeInEvent.call(createEmployeeRecord(testEmployee), '2025-02-12 900'));

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1], 10),
        date: dateStamp.split(' ')[0],
    });
    return this;
}

function hoursWorkedOnDate(dateStamp) {
    let inEvent = this.timeInEvents.find(e => {
        return e.date === dateStamp;
    });
    let outEvent = this.timeOutEvents.find(e => {
        return e.date === dateStamp;
    });

    return (outEvent.hour - inEvent.hour) / 100;
}
// console.log(hoursWorkedOnDate.call(testEmployeeWithTimeInAndOut, ('2025-02-12')));

function wagesEarnedOnDate(dateStamp) {
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;
}
// console.log(wagesEarnedOnDate.call(testEmployeeWithTimeInAndOut, '2025-02-12'));

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => {
        if (e.firstName === firstName) {
            return e;
        }
    })
}
// console.log(findEmployeeByFirstName(testEmployeesArray, 'Bob'));

function calculatePayroll(srcArray) {
    return srcArray.reduce((accum, curr) => {
        return accum + allWagesFor.call(curr)
    }, 0);
}

// console.log(calculatePayroll(testEmployeesArray));



