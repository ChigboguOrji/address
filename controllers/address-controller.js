/**
 * source too messy
 * gat to clean up soon
 */
var Address = require('../models/address-model');

exports.allContacts = function (req, res, next) {
  Address.find().sort({
    added: -1
  }).exec(function (err, done) {
    if (err) return next(err);
    if (done) {
      res.render('address', {
        title: 'Address List',
        contact: done
      });
    }
  });
}

exports.addContactGet = function (req, res, next) {
  res.render('add-address', {
    title: 'Add an address',
    operation: 'add',
    action_title: 'Add to address list'
  })
}


exports.addContactPost = function (req, res, next) {
  var addrObj = {
    name: req.body.first_name,
    lastname: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    homephone: req.body.allContactsphone,
    kin: req.body.kin
  };

  Address.findOne({
    name: addrObj.name,
    email: addrObj.email
  }, function (err, exist) {
    if (err) return next(err);
    if (exist) {
      req.flash('error', 'Address already exist');
      return res.redirect('/address/')
    }

    var contactAddr = new Address(addrObj);
    contactAddr.save(function (err, saved) {
      if (err) return next(err);
      if (saved) {
        req.flash('info', 'Address saved successfully');
        res.status(201);
        res.redirect('/address/');
      }
    })
  })
}


exports.deleteContactPost = function (req, res, next) {
  var id = req.params.id
  Address.findOne({
    _id: id
  }, function (err, addr) {
    if (err) return next(err);
    if (addr) {
      addr.remove();
      req.flash('info', 'Address deleted');
      res.redirect('/address/')
    }
  })
}



exports.editContactGet = function (req, res, next) {
  var id = req.params.id;
  Address.findOne({
    _id: id
  }, function (err, done) {
    if (err) return next(err);
    if (done) {
      res.render('add-address', {
        id: id,
        operation: 'edit',
        addrs: done,
        action_title: 'Edit the address'
      })
    }
  })
}


exports.editContactPost = function (req, res, next) {
  var editted = {
    name: req.body.first_name,
    lastname: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    homephone: req.body.homephone,
    kin: req.body.kin,
    id: req.body.id
  };

  Address.findOne({
    _id: editted.id
  }, function (err, done) {
    if (err) next(err);
    if (done) {
      Address.update({
        _id: editted.id
      }, editted, function (err, done) {
        if (err) return next(err);
        if (done) {
          req.flash('info', 'Updated');
          res.redirect(302, '/address/');
        }
      })
    }
  })
}