import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task';

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('post', () => {

  context('when I register a task', () => {
    let task = { title: 'Estudar mongoose', owner: 'eu@email.com', done: false }

    it('must be return 200', (done) => {
      request
        .post('/task')
        .send(task)
        .end((err, res) => {
          expect(res).to.has.status(200);
          expect(res.body.data.title).to.be.an('string');
          expect(res.body.data.owner).to.be.an('string');
          expect(res.body.data.done).to.be.an('boolean');
          done();
        })
    })
  })

  context('when I fo not inform the title', () => {
    let task = { title: '', owner: 'eu@email.com', done: false }

    it('must be return 400', (done) => {
      request
        .post('/task')
        .send(task)
        .end((err, res) => {
          expect(res).to.has.status(400);
          expect(res.body.errors.title.message).to.eql('Oops! Title is required.');
          done();
        })
    })
  })

  context('when I fo not inform the owner', () => {
    let task = { title: 'New task', owner: '', done: false }

    it('must be return 400', (done) => {
      request
        .post('/task')
        .send(task)
        .end((err, res) => {
          expect(res).to.has.status(400);
          expect(res.body.errors.owner.message).to.eql('Oops! Owner is required.');
          done();
        })
    })
  })

  context('when the title is duplicated', () => {
    let task = { title: 'New task', owner: 'ele@email.com', done: false }

    before((done) => {
      request
        .post('/task')
        .send(task)
        .end((err, res) => {
          expect(res).to.has.status(200);
          done();
        })
    })

    it('must be return 409', (done) => {
      request
        .post('/task')
        .send(task)
        .end((err, res) => {
          expect(res).to.has.status(409);
          expect(res.body.errmsg).to.include('duplicate key');
          done();
        })
    })
  })
})