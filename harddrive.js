var saveFile = function () {
    var fileName = $('#filename').val();

    if (fileName.length < 1) {
        fileName = 'CreatorDrawing';
    }

    canvas.obj.toBlob(function (blob) {
        saveAs(blob, fileName + '.png');
    });

    popup.cancel();
};

$('.button.disk').click(function () {
    popup.show('disk');
});

$('.action.save').click(function () {
    popup.show('save');
    $('#filename').focus();
});

$('.action.load').click(function () {
    popup.show('load');
});

$('.action.cancel').click(global.cancel);
$('.action.savefile').click(saveFile);

var loadImageUrl = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            global.loadedImage = new Image();
            global.loadedImage.src = e.target.result;

            $('#loadThumbnail').attr('src', global.loadedImage.src);
            $('.showImage').show();
            popup.position('load');
        };

        reader.readAsDataURL(input.files[0]);
    }
};

$('#uploadBtn').change(function () {
    $('#loadfilename').val($(this).val().split('\\').pop());
    loadImageUrl(this);
});

var loadImageToCanvas = function () {
    var image = {
        type: 'image',
        image: global.loadedImage,
        x: 0,
        y: 0
    };
    
    canvas.setSize(window.innerHeight, window.innerWidth);
    canvas.clearStack();
    canvas.drawObject(image);
    canvas.addToStack(image);
    
    popup.cancel();
};

$('.action.select').click(loadImageToCanvas);