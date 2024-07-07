// left menubar

$(".openNav").click(function(){
    $("#leftMenu").animate({ width:'250px'},50)
   $("#home-content").animate({marginLeft :'250px'},50)
})

$(".closebtn").click(function(){
    $("#leftMenu").animate({ width:'0px'},50)
   $("#home-content").animate({marginLeft :'0px'},50)
})
// Accordion

$('#sliderDown .toggle').click(function(){
    $(this).next().slideToggle(500);
    $('div.inner').not($(this).next()).slideUp(500); // (not) ay 7age msh gmb el next ely 3ayz aft7ha (slide up) 3ks el slide toggle
});
// textarea

$('textarea').keyup(function() {
   let mylength = $(this).val().length;
   console.log(mylength);
   $('#chars').text(
    100 - mylength <= 0 ? 'your available characters finished' : 100 - mylength
   )
});


/*counter timer */
let eventDate = new Date("Oct 25 2023 ");
        setInterval(() => {
            let nowDate = new Date();
            let differTime = eventDate.getTime() / 1000 - nowDate.getTime() / 1000; /*
            calculates the difference in seconds between the eventDate and the current time (nowDate).
            eventDate.getTime(): This gets the timestamp in milliseconds
            Both timestamps are divided by 1000 to convert the milliseconds to seconds.
             There are 1000 milliseconds in 1 second, so dividing by 1000 gives us the equivalent value in seconds.
            */
            let eventDays = Math.floor(differTime / (60 * 60 * 24)); // by multiplying (60*60*24) returns the equivalent value in seconds for whole days
                                                                     // 60*60*24 = 86400 seconds in a day
            let eventHours = Math.floor((differTime - (eventDays * (24 * 60 * 60))) / 3600); //divides the remainder time by the number of milliseconds in an hour
                                                                                            // 3600 = 60*60 seconds in an hour
            let eventMinutes = Math.floor((differTime - (eventDays * (24 * 60 * 60)) - (eventHours * 3600)) / 60); // Dividing the remaining milliseconds by 60 gives us the decimal minutes.
            let eventSeconds = Math.floor(differTime - (eventDays * (24 * 60 * 60)) - (eventHours * (60 * 60)) - (eventMinutes * (60)));/*
            Subtracting this from the remainder time gives us the remaining milliseconds after subtracting both whole days and whole hours.
            */

            $(".days").html(`${eventDays} D`);
            $(".hours").html(`${eventHours} H`);
            $(".minutes").html(`${eventMinutes} M`);
            $(".seconds").html(`${eventSeconds} S`);
        }, 1000);

