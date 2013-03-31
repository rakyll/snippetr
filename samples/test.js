//-begin[tag1]
a = []
a.listen();
//-end[tag1]

b = 66;

//-begin[closure-sample1]
var tags = [];
a.forEach(function(tag) {
  console.log(tag);
});
//-end[closure-sample1]