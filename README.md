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

## License

The MIT License (MIT)

Copyright (c) 2013 Burcu Dogan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
