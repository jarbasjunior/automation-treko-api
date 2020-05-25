import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task';

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('delete', () => {
  context('when I remove a task', () => {
    let task = {
      _id: require('mongoose').Types.ObjectId(),
      title: 'Task for be excluded',
      owner: 'eu@email.com',
      done: false
    }

    before((done) => {
      tasksModel.insertMany([task]);
      done();
    })

    it('must be return 200', (done) => {
      request
        .delete('/task/' + task._id)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.eql({});
          done();
        })
    })

    after((done) => {
      request
        .get('/task/' + task._id)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        })
    })
  })

  context('when a task not exists', () => {
    it('must be return 404', (done) => {
      let id = require('mongoose').Types.ObjectId();
      request
        .delete('/task/' + id)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.eql({});
          done();
        })
    })
  })
})