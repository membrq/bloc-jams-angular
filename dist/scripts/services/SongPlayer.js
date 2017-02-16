(function() {
    function SongPlayer(Fixtures) {
		
		/**
		* @desc SongPlayer variable created as empty hash
		* @type {Object}
		*/
		
        var SongPlayer = {};
		
		var currentAlbum = Fixtures.getAlbum();
		
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		/**
		* @desc currentSong object set to null
		* @type {Object}
		*/
		
		SongPlayer.currentSong = null;
		
		/**
 		* @desc Buzz object audio file
 		* @type {Object}
 		*/
		var currentBuzzObject = null;
		
		/**
 		* @function setSong
 		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
 		* @param {Object} song
 		*/
		
		var setSong = function(song) {
    		if (currentBuzzObject) {
        		stopSong(song);
    		}
 
    		currentBuzzObject = new buzz.sound(song.audioUrl, {
        		formats: ['mp3'],
        		preload: true
    		});
 
			SongPlayer.currentSong = song;
 		};
		
		/**
		* @function playSong
		* @desc playSong plays the currentBuzzObject, after checking that it's not already playing
		* @param {Object} song
		*/
		 
		var playSong = function(song) {
			if (song !== currentBuzzObject) {
				currentBuzzObject.play();
				song.playing = true;
			}
		}
		
//		find condition when click play and a song already playing/exists
//		stop old Song
//		set new Song
//		play new song
		
		var stopSong = function(song) {
			currentBuzzObject.stop();
			song.playing = null;
		};
		
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				//console.log(SongPlayer.currentSong);
				setSong(song);
				playSong(song);
				//console.log(SongPlayer.currentSong);
			} 
			else if (SongPlayer.currentSong === song) {
				console.log(currentBuzzObject);
				//setSong(song);
				if (currentBuzzObject.isPaused()) {
					playSong(song);
					//console.log(song);
					//console.log(currentBuzzObject);
				}
			}
		 };
		
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		}
	
		
		SongPlayer.previous = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex--;
		
			if (currentSongIndex < 0) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex < 0) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

        return SongPlayer;
	}
	
 
    angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();