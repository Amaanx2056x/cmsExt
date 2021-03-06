const express = require('express')
const router = express.Router()
const Filter = require('bad-words')
const filter = new Filter()
const Post = require('../../models/Post')
const {
  userAuth,
  adminAuth
} = require('../../helpers/auth')
const Comment = require('../../models/Comment')


router.all('/*', userAuth, (req, res, next)=> {
  next()
})

router.get('/mycomments', (req, res)=> {
  Comment.find({
    user: req.user.id
  })
  .populate('user')
  .then((comments)=> {
    if (comments.length == 0) {
      res.render('layouts/admin/comments/mycomments', {
        message: 'No comments made  yet.',
        pageTitle: "Comments By Me"
      })
    } else {
      res.render('layouts/admin/comments/mycomments', {
        comments,
        pageTitle: "Comments By Me"
      })
    }
  })
})

router.post('/create', (req, res)=> {
  Post.findOne({
    _id: req.body.id
  }).then((post)=> {
    if (filter.isProfane(req.body.body) || req.body.body.trim().length <= 0) {
      req.flash('error_msg', 'Inappropriate comments are not allowed!')
      res.redirect(`/post/${post.id}`)
    } else {
      const newComment = new Comment({
        user: req.user.id,
        body: req.body.body
      })
      post.comments.push(newComment)
      post.save().then((savedpost)=> {
        newComment.save().then((savedcomm)=> {
          res.send({
            savedcomm, user: req.user.username
          })
        })
      })
    }
  })
})


router.delete('/:id', (req, res)=> {
  Comment.findOne({
    _id: req.params.id
  }).then((comment)=> {
    Post.findOneAndUpdate({
      comments: req.params.id
    }, {
      $pull: {
        comments: req.params.id
      }}, (err,
      data)=> {
      if (err) throw err;
      comment.deleteOne()
      req.flash('success_msg', `Comment was deleted successfully!`)
      res.redirect('back')
    })
  })
})
module.exports = router