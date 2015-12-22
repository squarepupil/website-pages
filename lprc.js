module.exports = function (Folder, args) {


    if (args.file.length === 0) {
        args.file = ["project.md"];
    }
    args.build = "ghpages";
    args.src = ".";


    var jade = require('jade');
    var md = require('markdown-it')({
        html:true,
        linkify:true
    }).use(require('markdown-it-anchor'));
    
    var cheerio = require('cheerio');

    if (!Folder.prototype.local) {
        Folder.prototype.local = {};
    }
    Folder.prototype.local.md = md; 

    Folder.sync("jade" , function (code, args) {
        options = args.join(",").trim();
        if (options) {
            options = JSON.parse(options);
        } else {
            options = {'pretty':true};
        }
        return jade.render(code, options); 
    });

    Folder.sync( "md", function (code, args) {
        return  md.render(code);
    });

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
                //doc.log(warn.toString());
            });
            doc.gcd.emit("text ready:" + name, result.css);
        });
    };

     Folder.plugins.postcss = {
         autoprefixer : require('autoprefixer')
     };
 
     var fs = require('fs');
     var d = Folder.prototype.secretData = {};
     try {
         var temp = fs.readFileSync("data.txt", {encoding:'utf8'});
         temp.split("\n").forEach( function (el) {
            var bits = el.split(":");
            d[bits[0].trim()] = (bits[1]||'').trim();
         });
     } catch (e) {
         console.log(e);
     }
       

    Folder.prototype.local['tiny-csv'] = require('tiny-csv');
    Folder.prototype.local.mailhide = require('mailhide');

};

