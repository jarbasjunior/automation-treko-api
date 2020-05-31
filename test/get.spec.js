import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task';

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('get', () => {

  context('when tasks are registered', () => {
    before((done) => {
      tasksModel.deleteMany({});
      done();
    })

    before((done) => {
      let tasks = [
        { title: 'Estudar Nodejs', owner: 'eu@test.com', done: false },
        { title: 'Fazer compras', owner: 'eu@test.com', done: false },
        { title: 'Estudar Rabbitmq', owner: 'eu@test.com', done: true }
      ]

      tasksModel.insertMany(tasks);
      done();
    })

    it('must be return a list', (done) => {
      request
        .get('/task')
        .end((err, res) => {
          expect(res).to.has.status(200);
          expect(res.body.data).to.be.an('array');
          done();
        })
    })

    it('must be return list not empty', (done) => {
      request
        .get('/task')
        .end((err, res) => {
          expect(res).to.has.status(200);
          expect(res.body.data).to.be.an('array').that.is.not.empty
          done();
        })
    })

    it('should filter by keyword', (done) => {
      request
        .get('/task')
        .query({ title: 'Estudar' })
        .end((err, res) => {
          expect(res).to.has.status(200);
          expect(res.body.data[0].title).to.equal('Estudar Nodejs');
          expect(res.body.data[1].title).to.equal('Estudar Rabbitmq');
          done();
        })
    })
  })

  context('when I find by id', () => {
    it('must return only one task', (done) => {
      let tasks = [
        { title: 'Read a book about PHP', owner: 'eu@email.com', done: false }
      ]

      tasksModel.insertMany(tasks, (err, result) => {
        let id = result[0]._id
        request
          .get('/task/' + id)
          .end((err, res) => {
            expect(res).to.has.status(200);
            expect(res.body.data.title).to.equal(tasks[0].title);
            done();
          })
      })
    })

    it('must be return 404', (done) => {
      let id = require('mongoose').Types.ObjectId();
      request
        .get('/task/' + id)
        .end((err, res) => {
          expect(res).to.has.status(404);
          expect(res.body).to.eql({});
          done();
        })
    })
  })
})