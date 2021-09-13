$(document).ready(function ()
{
    InitPopupWindows();
});

function InitPopupWindows()
{
    $('.js-popup-link').magnificPopup({
        type: 'inline', removalDelay: 300, callbacks: {
            beforeOpen: function ()
            {
                this.st.mainClass = 'mfp-zoom-in';
            }
        }, midClick: true
    }, 0);
}