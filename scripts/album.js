//*****************  EXAMPLE ALBUMS **********************// 

// Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        {
            title: 'Blue',
            duration: '4:26'
         },
        {
            title: 'Green',
            duration: '3:14'
         },
        {
            title: 'Red',
            duration: '5:01'
         },
        {
            title: 'Pink',
            duration: '3:21'
         },
        {
            title: 'Magenta',
            duration: '2:15'
         }
     ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        {
            title: 'Hello, Operator?',
            duration: '1:01'
         },
        {
            title: 'Ring, ring, ring',
            duration: '5:01'
         },
        {
            title: 'Fits in your pocket',
            duration: '3:21'
         },
        {
            title: 'Can you hear me now?',
            duration: '3:14'
         },
        {
            title: 'Wrong phone number',
            duration: '2:15'
         }
     ]
};

// Create a third album object in album.js. Populate the object with the same properties as the other two album objects, but provide values of your choosing.
var albumMadsen = {
    title: 'Goodbye Logik',
    artist: 'Madsen',
    label: 'solo',
    year: '2006',
    albumArtUrl: 'assets/images/album_covers/madsen.jpg',
    songs: [
        {
            title: 'Du Schreibst Geschichte',
            duration: '3:11'
        },
        {
            title: 'Ein Sturm',
            duration: '3:50'
        },
        {
            title: 'Piraten',
            duration: '3:49'
        },
        {
            title: 'Good Bye Logik',
            duration: '3:44'
        },
        {
            title: 'Ich Rette Die Welt',
            duration: '3:23'
        },
        {
            title: 'Unzerbrechlich',
            duration: '3:40'
        },
        {
            title: 'Ich Komme Nicht Mit',
            duration: '3:02'
        },
        {
            title: 'Der Moment',
            duration: '4:15'
        },
        {
            title: 'Happy End',
            duration: '3:47'
        },
        {
            title: 'Ein Produkt',
            duration: '3:49'
        },
        {
            title: 'Euphorie',
            duration: '3:28'
        }
    ]
};
// ******************************  END EXAMPLE ALBUMS *******************//



var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';

    var $row = $(template);

    var clickHandler = function () {
        // ClickHandler logic
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
    };

    var onHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    // #1
    $row.find('.song-item-number').click(clickHandler);
    // #2
    $row.hover(onHover, offHover);
    // #3
    return $row;
};

var setCurrentAlbum = function (album) {
    // #1
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    // #2
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    // #3
    $albumSongList.empty();
    // #4
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
// Create a variable to store the template for the pause button.
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs.
var currentlyPlayingSong = null;

$(document).ready(function () {
    setCurrentAlbum(albumPicasso);
});