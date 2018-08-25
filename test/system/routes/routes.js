'use strict';

/* global it, describe */
/* eslint-disable quote-props, quotes, comma-dangle */

module.exports = ((server, chai, expect) => {
  describe('PictureApi Routes', () => {
    describe('/GET base url', () => {
      it('should return base url', (done) => {
        chai.request(server)
          .get('/')
          .then((res) => {
            expect(res).to.have.status(200);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET api base url', () => {
      it('should return base url', (done) => {
        chai.request(server)
          .get('/api/v1.0')
          .then((res) => {
            expect(res).to.have.status(200);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
