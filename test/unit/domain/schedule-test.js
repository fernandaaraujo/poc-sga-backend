'use strict';

const assert = require('chai').assert;
const rewire = require('rewire');

const BASE_LIB = ('../../../lib/');
const schedule = rewire(BASE_LIB + 'domain/schedule');

describe('Unit schedules tests', () => {
    const SCHEDULE_ID = '123';
    let MOCK_ADD_SCHEDULE_CALLED;
    let MOCK_DELETE_SCHEDULE_CALLED;
    let MOCK_FIND_SCHEDULE_CALLED;
    let MOCK_GET_LIST_CALLED;

    beforeEach(() => {
        MOCK_ADD_SCHEDULE_CALLED = false;
        MOCK_DELETE_SCHEDULE_CALLED = false;
        MOCK_FIND_SCHEDULE_CALLED = false;
        MOCK_GET_LIST_CALLED = false;
        const mock = {
            addSchedule: function (itemID, schedule) {
                MOCK_ADD_SCHEDULE_CALLED = true;
                return (SCHEDULE_ID === itemID) ? SCHEDULE_ID : null;
            },
            deleteSchedule: function (itemID) {
                MOCK_DELETE_SCHEDULE_CALLED = true;
                return (SCHEDULE_ID === itemID) ? SCHEDULE_ID : null;
            },
            findScheduleByID: function (itemID) {
                MOCK_FIND_SCHEDULE_CALLED = true;
                return (SCHEDULE_ID === itemID) ? SCHEDULE_ID : null;
            },
            getSchedulesListData: function () {
                MOCK_GET_LIST_CALLED = true;
            }
        };
        schedule.__set__("database", mock);
    });

    describe('find schedule', () => {
        it('returns if schedule exists', () => {
            const result = schedule.existsSchedule("1");
            assert.isFalse(result);
        });

        it('returns schedules list', () => {
            assert.isFalse(MOCK_GET_LIST_CALLED);

            schedule.getSchedules();

            assert.isTrue(MOCK_GET_LIST_CALLED);
        });

        it('returns schedule by id', () => {
            const result = schedule.getSchedule("123");
            assert.isTrue(MOCK_FIND_SCHEDULE_CALLED);
            assert.equal(SCHEDULE_ID, result);
        });
    });

    describe('add schedule', () => {
        it('returns schedule id when schedule is not in list ', () => {
            const result = schedule.addSchedule("1", {});
            assert.isTrue(MOCK_FIND_SCHEDULE_CALLED);
            assert.isTrue(MOCK_ADD_SCHEDULE_CALLED);
        });

        it('returns error when try insert duplicate schedule', () => {
            try {
                schedule.addSchedule(SCHEDULE_ID, {});
            } catch (err) {
                assert.equal("Schedule duplicated", err.message);
                return;
            }
            assert.fail();
        });
    });

    describe('update schedule', () => {
        it('calls update schedule in database', () => {
            assert.isFalse(MOCK_ADD_SCHEDULE_CALLED);

            schedule.updateSchedule(SCHEDULE_ID, {});

            assert.isTrue(MOCK_ADD_SCHEDULE_CALLED);
        });

        it('returns error when try update unfounded schedule', () => {
            try {
                schedule.updateSchedule("1", {});
            } catch (err) {
                assert.equal("Schedule not exists", err.message);
                return;
            }
            assert.fail();
        });
    });

    describe('delete schedule', () => {
        it('calls delete schedule in database', () => {
            assert.isFalse(MOCK_DELETE_SCHEDULE_CALLED);

            schedule.deleteSchedule(SCHEDULE_ID);

            assert.isTrue(MOCK_DELETE_SCHEDULE_CALLED);
        });

        it('returns error when try remove a schedule not found', () => {
            try {
                schedule.deleteSchedule("1");
            } catch (err) {
                assert.equal("Schedule not found", err.message);
                return;
            }
            assert.fail();
        });
    });
});