var Letter = function(l){
    this.character = l;
    this.show = false;
    this.letterRender = function(){
        //if appear is false then show the _
  		//else appear is true then show character
        return !(this.show) ? " _ ": this.character;
    };
};

module.exports = Letter;