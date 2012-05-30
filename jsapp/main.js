require(["jquery", "lib/jquery.alpha", "lib/jquery.beta","testmodule"], function($,a,b,T) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta();
        T.init();

    });
});
