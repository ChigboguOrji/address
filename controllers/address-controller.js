/**
 * source too messy
 * gat to clean up soon
 */
var Address = require('../models/address-model');

exports.home = function (req, res, next) {
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

exports.getAddPage = function (req, res, next) {
  res.render('add-address', {
    title: 'Add an address',
    operation: 'add',
    action_title: 'Add to address list'
  })
}


exports.add_address = function (req, res, next) {
  var addrObj = {
    name: req.body.first_name,
    lastname: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    homephone: req.body.homephone,
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


exports.deleteAddr = function (req, res, next) {
  var id = req.params.id
  Address.findOne({
    _id: id
  }, function (err, addr) {
    if (err) return next(err);
    if (addr) {
      addr.remove();
      req.flash('info', 'Address deleted');
      res.redirect('/address/add/')
    }
  })
}



exports.editAddr = function (req, res, next) {
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

exports.editMyAddr = function (req, res, next) {
  var newAdd = req.body;
  Address.update({
    _id: newAdd.id
  }, {
    $set: newAdd
  }, {
    safe: true,
    multi: false
  }, function (err, done) {
    if (err) {
      req.flash('error', 'Couldn\'t update address');
      next(err);
    }
    if (done) {
      req.flash('info', 'Address updated successfully');
      res.redirect('/address/');
    }
  })
}