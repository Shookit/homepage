var wasActive = false;
var headerLink = ".header a";
var toggler = ".toggler";

$( document ).ready(function() {
    urlSuffix = window.location.hash.substr(1);
    loadMain(urlSuffix);
});


function clickHandlers(){
    $( headerLink ).off("click");
    $( toggler ).off("click");

    //Project minimizer
    $( toggler ).click(function(){
        $(this).parent().children("p").not(".first").toggleClass("hidden");

        if ($(this).children("button").text().indexOf("more")>=0){
              $(this).children("button").html("less <span class='glyphicon glyphicon-chevron-up'></span>")
        }
        else{
              $(this).children("button").html("more <span class='glyphicon glyphicon-chevron-down'></span>")
        }

    });


    //Page loader
    $( headerLink ).click(function(){
        var anchor = this.href.substring(this.href.indexOf('#')+1);
        loadMain(anchor);
    });

}


function loadMain(urlSuffix){
    $('a').children().removeClass("active");
    $('a[href="#'+urlSuffix+'"]').children().addClass("active");

    $('.noactive').removeClass("active");

    wasActive = true;

    if(urlSuffix==""){
        urlSuffix= "home";
    }

    $(".main").empty();
    $(".main").load("./" + urlSuffix + ".html", null, clickHandlers);
};
