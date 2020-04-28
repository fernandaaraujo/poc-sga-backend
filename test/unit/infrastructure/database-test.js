'use strict';

const assert = require('chai').assert;

const BASE_LIB = ('../../../lib/');
const database = require(BASE_LIB + 'infrastructure/database');

describe('Unit Database tests', () => {

    describe('find item in a list', () => {
        it('returns empty when item is not in the list ', () => {
            const itemID = "1";
            const result = database.findInList({}, itemID);
            assert.strictEqual(result, null);
        });

        it('returns the same item received when item founded in the list ', () => {
            const itemID = "1";
            const itemsList = {"1":{"name":"Teste"}};
            const result = database.findInList(itemsList, itemID);
            assert.strictEqual(result, itemsList[itemID]);
        });
    });

    describe('assets', () => {
        it('insert an asset in list ', () => {
            const id = "1";
            const asset = {"name":"Teste"};
            database.addAsset(id, asset);
            const result = database.findAssetByID(id);

            assert.strictEqual(result, asset);
        });

        it('delete an asset in list ', () => {
            const id = "1";
            database.deleteAsset(id);
            const result = database.findAssetByID(id);

            assert.strictEqual(result, null);
        });
    });

    describe('schedule', () => {
        it('insert a schedule in list ', () => {
            const id = "1";
            const schedule = {"name":"Teste"};
            database.addSchedule(id, schedule);
            const result = database.findScheduleByID(id);

            assert.strictEqual(result, schedule);
        });

        it('delete a schedule in list ', () => {
            const id = "1";
            database.deleteSchedule(id);
            const result = database.findScheduleByID(id);

            assert.strictEqual(result, null);
        });
    });

    describe('standards', () => {
        it('get standards gna predefined list', () => {
            const itemID = "4a12a604-bae8-40a6-97e3-8b07723d3268";
            const gnaList = database.getStandardsFromGNA();
            const list = {
                "4a12a604-bae8-40a6-97e3-8b07723d3268": {
                    "name":"Relatório Anual de Lavra (RAL)",
                    "status":"Atrasado"
                }
            };

            assert.deepEqual(gnaList, list);
        });

        it('get standards ca predefined list', () => {
            const acList = database.getStandardsFromCA();
            const list = {
                "4a12a604-bae8-40a6-97e3-8b07723d3269": {
                    "name":"Fornecer Relatório Anual de Lavra (RAL)",
                    "status":"Em andamento",
                    "comments":"Atividade iniciada pelo responsável técnico da mineradora no dia 20/04/2020."
                }
            };

            assert.deepEqual(acList, list);
        });
    });
});