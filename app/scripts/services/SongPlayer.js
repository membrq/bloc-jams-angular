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
        		stopSong();
    		}
 
    		currentBuzzObject = new buzz.sound(song.audioUrl, {
        		formats: ['mp3'],
        		preload: true
    		});
 
    		currentSong = song;
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
		
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} 
			else if (SongPlayer.currentSong === song) {
				console.log(song);
				console.log(SongPlayer.currentSong);
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		 };
		
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		}
		 
         return SongPlayer;
     }
	
	SongPlayer.previous = function() {
     	var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     	currentSongIndex--;
		
		if (currentSongIndex < 0) {
         	//currentBuzzObject.stop();
         	//SongPlayer.currentSong.playing = null;
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
         	//currentBuzzObject.stop();
         	//SongPlayer.currentSong.playing = null;
			stopSong();
     	} else {
         	var song = currentAlbum.songs[currentSongIndex];
         	setSong(song);
         	playSong(song);
     	}
 	};
	
	var stopSong = function(song) {
		currentBuzzObject.stop();
		song.playing = null;
	};
 
    angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();