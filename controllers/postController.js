const Posts = require('../models/post.js');
const ApiError = require('../error/ApiError.js');

class PostController {

    async getPosts(req, res, next) {
        await Posts.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.status(200).json({ success: true, posts: docs });
        });
    };
    async getOnlyUserPosts(req, res, next) {
        await Posts.find({ userNick: req.params.nick }, function (err, docs) {
            // mongoose.disconnect();
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.status(200).json({ success: true, posts: docs });
        });
    };

    async addPost(req, res, next) {
        let currentDate = (new Date()).toLocaleDateString().split("/");

        const post = new Posts({
            text: req.body.text,
            data: currentDate[0],
            img: req.body.imageSrc,
            userNick: req.body.nick,
            title: req.body.title
        });
        //6. Збереження документа
        await post.save(function (err, userPost) {
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
        });

        await Posts.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.status(200).json({ success: true, posts: docs });
        });

    };

    async addCom(req, res) {
        // Знаходимо і оновлюємо
        await Posts.findByIdAndUpdate({ _id: '60253a8d79009b5084ee8693' },
            {
                $push: { comments: req.body.comment_text }
            }, function (err, doc) {
                // mongoose.disconnect();

                if (err) {
                    next(ApiError.dataBaseErrors('Bad Gateway'));
                    return;
                };
                res.json({ success: true });
            });
    };

    async deletePost(req, res, next) {
        await Posts.findOneAndDelete({ _id: req.params.id }, function (err, doc) {
            if (err) {
                next(ApiError.dataBaseErrors('Bad Gateway'));
                return;
            };
            res.json({ success: true, post: doc });
        });
    };

};

module.exports = new PostController();
