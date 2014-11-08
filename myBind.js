Function.prototype.myBind = function(context) {
  var fn = this;
  return function (){
    fn.apply(context);
  }
};

function Cat(name) {
  this.name = name;
  this.meow = function () {
    console.log(this.name + ' says "meow!"');
  };
}

var cat = new Cat("Gizmo");
var meow = cat.meow;
meow.myBind(cat)();