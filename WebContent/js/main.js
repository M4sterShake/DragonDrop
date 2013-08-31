//test

contentViewSelector = "#ContentView";

$(document).ready(function()
{
    $(contentViewSelector).on('dragover', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
    });

    $(contentViewSelector).on('dragleave', function(e)
    {
        if ($(e.target).hasClass("dropArea"))
        {
            e.preventDefault();
            e.stopPropagation();
            $(e.target).css("box-shadow", "inset 0 0 0px 0px #AAA");
            $(e.target).removeClass("draggedOver");
        }

    });

    $(contentViewSelector).on('dragenter', function(e)
    {
        if ($(e.target).hasClass("dropArea") && !$(e.target).hasClass("draggedOver"))
        {
            e.preventDefault();
            e.stopPropagation();
            
            $(e.target).addClass("draggedOver");
            
            $(e.target).css("box-shadow", "inset 0 0 0px 0px #AAA");
            $(e.target).animate(
            {
                boxShadow : "inset 0 0 3px 3px #AAA"
            }, 150);
        }

    });

    $(contentViewSelector).on('drop', function(e)
    {
        var dropArea = getTargetDropArea(e);
        var droppedFiles = e.originalEvent.dataTransfer.files;
        $(e.target).css("box-shadow", "inset 0 0 0px 0px #AAA");
        
        if (e.originalEvent.dataTransfer)
        {
            if (droppedFiles.length)
            {
                e.preventDefault();
                e.stopPropagation();
                /* UPLOAD FILES HERE */
                var currDate = new Date();
                var htmlContentString = "<h3 class='timeStamp'>You uploaded " + droppedFiles.length + " files at " + currDate.toTimeString() + "</h3><hr/><ul>";
                for ( var i = 0; i < droppedFiles.length; i++)
                {
                    var fileNameLi = "<li>" + droppedFiles[i].name + "</li>";
                    htmlContentString = htmlContentString + fileNameLi;
                }
                htmlContentString = htmlContentString + "</ul>";
                $(dropArea).prepend(htmlContentString);
            }
        }
    });

    function getTargetDropArea(e)
    {
        var target;
        if ($(e.target).hasClass("dropArea"))
        {
            target = e.target;
        } else
        {
            target = $(e.target).parents(".dropArea").first();
        }
        return target;
    }
});// End document ready
