$(document).ready(function()
{
    $('#menu').click(function()
    {
        $(this).toggleClass('fa-solid fa-square-xmark');
        $('header').toggleClass('toggle');
    });
    $(window).on('scroll load',function()
    {
        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');
        if($(window).scrollTop()>0)
        {
            $('.top').show();
        }
        else
        {
            $('.top').hide();
        }
    });
    $('a[href*="#"]').on('click',function(e)
    {
        e.prventDefault();
        $('html,body').animate({
            scrollTop :$($(this).attr('href')).offset().top,
        },
        500,'linear');
    });
});