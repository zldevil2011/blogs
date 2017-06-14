var schedule = require('node-schedule');
var async = require('async');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var blog = require('../models/blog').blogs;

function scheduleCronstyle(){
    schedule.scheduleJob('30 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());
        getLatestCnodeTopic();
    });
}
scheduleCronstyle();

function getLatestCnodeTopic(){
   var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
    .end(function (err, res) {
        if (err) {
            return console.error(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });

        // 采用async爬取,控制并发量
        var concurrencyCount = 0;
        var fetchUrl = function(url, callback){
            concurrencyCount ++;
            console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);
            superagent.get(url)
                .end(function (err, res) {
                    concurrencyCount --;
                    var $ = cheerio.load(res.text);
                    var result = {
                        title: $('.topic_full_title').text().trim(),
                        href: url,
                        content: $('.topic_content .markdown-text').html(),
                    };
                    callback(null, result);
                });
        };
        async.mapLimit(topicUrls, 5, function (url, callback) {
            fetchUrl(url, callback);
        }, function (err, result) {
            console.log('final:');
            console.log(result);
            for(var i = 0 ; i < result.length; ++i){
                var blog_info = {
                    title:result[i].title,
                    content:result[i].content,
                    author:'zhaolong',
                    author_id:'5940e6dc9c2c143abcb83187',
                };
                blog.insertBlog(blog_info);
            }
            //bendi 5941043b1b7c800d44d3eb3c
            //远程 5940e6dc9c2c143abcb83187
        });


        // 采用eventproxy爬取
        // topicUrls = topicUrls.splice(0,5);
        // var ep = new eventproxy();
        //
        // ep.after('topic_html', topicUrls.length, function (topics) {
        //     topics = topics.map(function (topicPair) {
        //     var topicUrl = topicPair[0];
        //     var topicHtml = topicPair[1];
        //     var $ = cheerio.load(topicHtml);
        //     if($('.topic_full_title').text().trim() == ""){
        //         console.log(topicHtml);
        //     }
        //     return ({
        //         title: $('.topic_full_title').text(),
        //         href: topicUrl,
        //         // comment1: $('.reply_content').eq(0).text().trim(),
        //         });
        //     });
        //
        //     console.log('final:');
        //     console.log(topics);
        // });
        //
        // topicUrls.forEach(function (topicUrl) {
        //     superagent.get(topicUrl)
        //         .end(function (err, res) {
        //             ep.emit('topic_html', [topicUrl, res.text]);
        //         });
        // });



    });
}

