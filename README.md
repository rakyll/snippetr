# snippetr
Extract code snippets from source code -- such as unit tests. Your samples will never
get broken again. Supports JavaScript, Python, Java, C#, Go and Objective-C. 

## Installation

    $ npm install -g snippetr

## Usage

Tag to-be-extracted blocks on your source code files, with begin and end directives.
Take a look at `samples` directory to see how to tag code blocks. A sample for 
JavaScript files is illustrated below that will extract a snippet tagged with `tag1-sample`:

    //begin-[tag1-sample]
    var a = [1, 3, 4];
    a.forEach(function(item) {
      item += 3;
    });
    //end-[tag1-sample]
    assert.equal(a[0], 4);

Run `snippetr` on the directory you wish to extract the code blocks.

    $ snippetr

It will create
a directory named `.snippetr` and output the snippets on individual files for each tag and language. The target output directory (which is `.snippets`) will be organized
in the following way:

    .snippets
      |- tag1-sample
        |- js
        |- python
        |- obj-c
      |- ...
