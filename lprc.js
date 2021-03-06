module.exports = function (Folder, args) {

    if (args.file.length === 0) {
        args.file = ["project.md"];
    }


    if (!Folder.prototype.local) {
        Folder.prototype.local = {};
    }

    require('litpro-jshint')(Folder, args);
    
    Folder.prototype.local.gm = require('gm');

    var pug = require('pug');
    
    Folder.sync("pug" , function (code, args) {
        options = args.join(",").trim();
        if (options) {
            options = JSON.parse(options);
        } else {
            options = {'pretty':true};
        }
        return pug.render(code, options); 
    });
    
    var md = require('markdown-it')({
        html:true,
        linkify:true
    });
    
    
    Folder.prototype.local.md = md; 
    
    Folder.sync( "md", function (code, args) {
        return  md.render(code);
    });
    
    var cheerio = require('cheerio');
    Folder.prototype.local.cheerio = cheerio;
    
    Folder.sync( "cheerio" , function(code, args) {
        var selector = args.shift(); 
        var method = args.shift();
        var n = args.length;
        var $ = cheerio.load(code);
        var el$ = $(selector);
        el$[method].apply(el$, args);
        return $.html();
    });
    Folder.sync( "replace" , function(code, args) {
        var selector, replacement;
        var n = args.length;
        var $ = cheerio.load(code);
        for (i = 0; i < n; i += 2) {
            selector = args[i];
            replacement = args[i+1];
            $(selector).html(replacement);
        }
        return $.html();
    });
    Folder.sync("append", function (input, args) {
        var $ = cheerio.load(args[0]);
        $(args[1]).append(input);
        return $.html();
    });
    Folder.sync("title", function (input, args) {
        var $ = cheerio.load(input);
        var title = $("article h2").text();
        if (title) {
           $("title").text("A&I "+ title);
        }
        return $.html();
    });
    Folder.sync("current", function (input, args) {
        var $ = cheerio.load(input);
        var links = $("[href='" + args[0] + "']");
        links.addClass("current");
        return $.html();
    });
    
    var postcss      = require('postcss');
    
    Folder.commands.postcss = function (input, args, name) {
        var doc = this;
        var pc = doc.plugins.postcss; 
        var cmds = [];
        if ( (typeof input !== "string") || (input === '') ) {
            doc.gcd.emit("text ready:" + name, input);
            return;
        }
        args.forEach(function (el) {
            if (typeof pc[el] === "function" ) {
                cmds.push(pc[el]);
            }
        });
        postcss(cmds).process(input).then(function (result) {
            result.warnings().forEach(function (warn) {
                doc.log(warn.toString());
            });
            doc.gcd.emit("text ready:" + name, result.css);
        }).catch(function (error) {
            doc.log(error.toString());
        });
    };
    
    Folder.plugins.postcss = {
         autoprefixer : require('autoprefixer')
    };

};    
