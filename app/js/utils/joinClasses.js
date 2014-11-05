(function(){
    "use strict";

    function joinClasses(classMap){

        var classes = [];
        Object.keys(classMap).forEach(function(className){
            
            if (classMap[className]){
                classes.push(className);
            }
        });

        return classes.join(" ");

    }


    module.exports = joinClasses;

}());
