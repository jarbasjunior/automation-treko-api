import chai from 'chai';
import chaiHttp from 'chai-http'
import tasksModel from '../models/task'

chai.use(chaiHttp);
const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('put', () => {
  context('when I updated a task', () => {

    let task = {
      _id: require('mongoose').Types.ObjectId(),
      title: 'Title For Edit',
      owner: 'email@email.com',
      done: false
    }

    before((done) => {
      tasksModel.insertMany([task]);
      done();
    })

    it('must be return 200', (done) => {
      task.title = 'Title edited'
      task.owner = 'email_edited@email.com'
      task.done = true

      request
        .put('/task/' + task._id)
        .send(task)
        .end((err, res) => {
          expect(res).to.has.status(200);
          expect(res.body).to.eql({});
          done();
        })
    })

    it('must be return updated data', (done) => {
      request
        .get('/task/' + task._id)
        .end((err, res) => {
          expect(res).to.has.status(200);
          expect(res.body.data.title).to.eql(task.title);
          expect(res.body.data.owner).to.eql(task.owner);
          expect(res.body.data.done).to.be.true;
          done();
        })
    })
  })
})