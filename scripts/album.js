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

 var createSongRow = function (songNumber, songName, songLength) {
     var template =
         '<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';

     return template;
 };

 // #1
 var albumTitle = document.getElementsByClassName('album-view-title')[0];
 var albumArtist = document.getElementsByClassName('album-view-artist')[0];
 var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
 var albumImage = document.getElementsByClassName('album-cover-art')[0];
 var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

 var setCurrentAlbum = function (album) {

     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);

     // #3
     albumSongList.innerHTML = '';

     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };


 var clickHandler = function (targetElement) {

     var songItem = getSongItem(targetElement);

     //Create a conditional that checks if currently playing song is null.
     if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }

 };

 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
 var songRows = document.getElementsByClassName('album-view-song-item');

 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 // Create a variable to store the template for the pause button.
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs.
 var currentlyPlayingSong = null;

 window.onload = function () {
     setCurrentAlbum(albumPicasso);

     songListContainer.addEventListener('mouseover', function (e) {
         // #1
         //console.log(e.target);
         // Add a conditional statement to the mouseover event listener that restricts the target to the table row.
         // Only target individual song rows during an event delegation.
         if (e.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML.
             e.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             var songItem = getSongItem(e.target);

             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }
         }
     });

     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function (e) {
             // Revert the content back to the number.
             // Selects first child element, which is the song-item-number element.
             //this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
             // #1
             var songItem = getSongItem(e.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });

         songRows[i].addEventListener('click', function (e) {
             // Event handler call.
             clickHandler(e.target);
         });
     }

     var albums = [albumPicasso, albumMarconi, albumMadsen];
     var i = 1;

     albumImage.addEventListener("click", function (e) {
         setCurrentAlbum(albums[i]);
         i++;
         if (i == albums.length) {
             i = 0;
         }
     });
 };

 var findParentByClassName = function (e, targetClass) {
     if (e) {
         var currentParent = e.parentElement;
         while (currentParent.className !== targetClass && currentParent.className !== null) {
             currentParent = currentParent.parentElement;
         }
         return currentParent;
     }
 };

 var getSongItem = function (e) {
     switch (e.className) {
     case 'album-song-button':
     case 'ion-play':
     case 'ion-pause':
         return findParentByClassName(e, 'song-item-number');
     case 'album-view-song-item':
         return element.querySelector('.song-item-number');
     case 'song-item-title':
     case 'song-item-duration':
         return findParentByClassName(e, 'album-view-song-item').querySelector('.song-item-numer');
     case 'song-item-number':
         return e;
     default:
         return;
     }
 };