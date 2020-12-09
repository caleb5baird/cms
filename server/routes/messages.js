
var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
  Message.find()
    .populate('sender')
    .then(messages => {
      res.status(200)
        .json({
          message: 'Messages fetched successfully!',
          messages: messages
        });
    })
    .catch(error => {
      res.status(500)
        .json({
          message: 'An error occurred',
          error: error
        });
    });
});

router.get('/:id', (req, res, next) => {
  Message.findOne({
    "id": req.params.id
  })
    .populate('sender')
    .then(message => {
      res.status(200)
        .json({
          resultMessage: 'Message fetched successfully!',
          message: message
        });
    })
    .catch(error => {
      res.status(500)
        .json({
          resultMessage: 'An error occurred',
          error: error
        });
    });
});

router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  Contact.findOne({id: req.body.sender.id})
    .then(contact => {
      const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: contact._id
      });

      message.save()
        .then(createdMessage => {
          createdMessage.sender = contact;
          res.status(201).json({
            resultMessage: 'Message added successfully',
            message: createdMessage
          });
        })
        .catch(error => {
          res.status(500).json({
            resultMessage: 'An error occurred',
            error: error
          });
        });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});

module.exports = router;
