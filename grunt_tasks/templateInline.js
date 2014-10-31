module.exports = function (grunt) {
    'use strict';

    /**
     * Takes template content from external files & merges them into the head of a page as script
     * tags.
     */
    grunt.registerMultiTask('templateInline', 'Inline HTML templates as script tags.', function () {
        var
            jsdom = require('jsdom').jsdom,
            type = 'text/html';

        var idFilter = function (input) {
            return input.replace(/^.*templates/, 'templates').replace('.tmpl.html', '').replace(/^src\//, '');
        };


        this.files.forEach(function (file) {
            var
                dest = file.dest,
                srcFiles = file.src,
                doc = jsdom(grunt.file.read(dest), null, {features: {ProcessExternalResources: false}}),
                document = doc.createWindow().document,
                head = document.head;

            var getDoctypeString = function () {
                var doctype = document.doctype;
                var text = '<!DOCTYPE ' +
                    doctype.name +
                    (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '') +
                    (!doctype.publicId && doctype.systemId ? ' SYSTEM' : '') +
                    (doctype.systemId ? ' "' + doctype.systemId + '"' : '') +
                    '>';

                return text;
            };


            var createTag = function (tag) {
                var
                    existing = document.getElementById(tag.id),
                    scriptElem = document.createElement('script');

                if (existing) {
                    head.removeChild(existing);
                }
                scriptElem.appendChild(document.createTextNode(tag.content));
                scriptElem.setAttribute('id', tag.id);
                scriptElem.setAttribute('type', type);
                head.appendChild(scriptElem);
            };

            grunt.log.subhead(dest);
            srcFiles.forEach(function (filePath) {
                grunt.log.writeln(' Inlining: ' + filePath);

                var templateContent = grunt.file.read(filePath);

                var tagInfo = {
                    type: type,
                    id: idFilter(filePath),
                    content: templateContent
                };

                // Inline the template's content into the root html files.
                createTag(tagInfo);
            });

            grunt.file.write(dest, getDoctypeString() + document.innerHTML);
        });
    });
};
