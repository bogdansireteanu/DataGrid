module.exports = function(app) {
  var express = require('express');
  var dataItemRouter = express.Router();

  dataItemRouter.get('/', function(req, res) {
    var array = [];
    for (var i = 0; i < 100; i++) {
      var item = {
        id: i,
        title: "item " + i,
        description: "description " + i
      };
      array.push(item);
    }
    res.send({
      'data-item': array
    });
  });

  dataItemRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  dataItemRouter.get('/:id', function(req, res) {
    res.send({
      'data-item': {
        id: req.params.id
      }
    });
  });

  dataItemRouter.put('/:id', function(req, res) {
    res.send({
      'data-item': {
        id: req.params.id
      }
    });
  });

  dataItemRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/dataItems', dataItemRouter);
};
