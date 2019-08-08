const $ = require('jquery');
const path = require('path');
const fs = require('fs');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

$('#minify').on('click', () => {
    let source = $('#source').val()
    let destination = $('#destination').val()

    if (!fs.existsSync('source')){
        fs.mkdirSync('source');
    }

    if (!fs.existsSync('destination')){
        fs.mkdirSync('destination');
    }
    
    const sourceTarget = path.relative(
        path.dirname('source'),
        path.resolve(source)
    );
    fs.symlink(
        sourceTarget,
        source,
        (err) => {

        }
    );

    const destinationTarget = path.relative(
        path.dirname('destination'),
        path.resolve(destination)
    );
    fs.symlink(
        destinationTarget,
        destination,
        (err) => {

        }
    );

    //console.log(path.resolve(source)+" "+path.resolve(destination));
    minifyImages(source, destination);
});


function minifyImages(source, destination) {
    (async () => {
        //console.log(source+" "+destination);
        const files = await imagemin(['source/*.{jpg,png}'], {
            destination: 'destination',
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });

        console.log(files);
        //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
    })();
}